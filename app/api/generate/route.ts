import { NextRequest, NextResponse } from 'next/server';
import { createOpenAIClient, EXTRACTION_PROMPT, POLISH_PROMPT } from '@/lib/openai';
import { generateAllTemplates } from '@/lib/templates';
import { ExtractedReleaseNotes, ParsedReleaseNotes } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { rawText } = await request.json();

    if (!rawText || typeof rawText !== 'string') {
      return NextResponse.json(
        { error: 'Please enter raw text' },
        { status: 400 }
      );
    }

    // Get API key from environment variable
    const apiKey = process.env.OPENAI_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json(
        { error: 'OpenAI API Key not configured on server' },
        { status: 500 }
      );
    }

    const openai = createOpenAIClient(apiKey);

    // ============================================
    // Phase 1: Extract and categorize content
    // ============================================
    console.log('Phase 1: Extracting and categorizing content...');
    
    const extractionResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: EXTRACTION_PROMPT,
        },
        {
          role: 'user',
          content: `Extract and categorize the following release notes. Keep the original Chinese text as-is:\n\n${rawText}`,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.1, // Lower temperature for more accurate extraction
    });

    const extractedContent = extractionResponse.choices[0]?.message?.content;

    if (!extractedContent) {
      return NextResponse.json(
        { error: 'Phase 1: AI returned empty response' },
        { status: 500 }
      );
    }

    let extractedData: ExtractedReleaseNotes;
    try {
      extractedData = JSON.parse(extractedContent) as ExtractedReleaseNotes;
    } catch {
      return NextResponse.json(
        { error: 'Phase 1: AI returned invalid JSON format' },
        { status: 500 }
      );
    }

    // Validate extraction results
    if (!extractedData.iosVersion || !extractedData.macVersion || !extractedData.androidVersion) {
      return NextResponse.json(
        { error: 'Failed to parse version numbers' },
        { status: 500 }
      );
    }

    console.log('Phase 1 completed. Extracted data:', {
      iosVersion: extractedData.iosVersion,
      macVersion: extractedData.macVersion,
      androidVersion: extractedData.androidVersion,
      iosNewCount: extractedData.iosNew?.length || 0,
      macNewCount: extractedData.macNew?.length || 0,
      androidNewCount: extractedData.androidNew?.length || 0,
      iosImprovementsCount: extractedData.iosImprovements?.length || 0,
      macImprovementsCount: extractedData.macImprovements?.length || 0,
      androidImprovementsCount: extractedData.androidImprovements?.length || 0,
      iosFixesCount: extractedData.iosFixes?.length || 0,
      macFixesCount: extractedData.macFixes?.length || 0,
      androidFixesCount: extractedData.androidFixes?.length || 0,
    });

    // ============================================
    // Phase 2: Polish and translate content
    // ============================================
    console.log('Phase 2: Polishing and translating content...');
    
    const polishResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: POLISH_PROMPT,
        },
        {
          role: 'user',
          content: `Rewrite the following release notes to be professional and user-focused. Provide both Chinese and English versions:\n\n${JSON.stringify(extractedData, null, 2)}`,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.5, // Slightly higher for more creative writing
    });

    const polishedContent = polishResponse.choices[0]?.message?.content;

    if (!polishedContent) {
      return NextResponse.json(
        { error: 'Phase 2: AI returned empty response' },
        { status: 500 }
      );
    }

    let parsedData: ParsedReleaseNotes;
    try {
      parsedData = JSON.parse(polishedContent) as ParsedReleaseNotes;
    } catch {
      return NextResponse.json(
        { error: 'Phase 2: AI returned invalid JSON format' },
        { status: 500 }
      );
    }

    // Ensure version numbers are preserved
    parsedData.iosVersion = extractedData.iosVersion;
    parsedData.macVersion = extractedData.macVersion;
    parsedData.androidVersion = extractedData.androidVersion;

    // Validate polished data structure
    const validateArray = (arr: unknown): boolean => {
      if (!Array.isArray(arr)) return false;
      return arr.every(item => 
        item && typeof item === 'object' && 
        'cn' in item && 'en' in item &&
        typeof item.cn === 'string' && typeof item.en === 'string'
      );
    };

    // Ensure all arrays exist and have correct structure
    const categories = ['iosNew', 'macNew', 'androidNew', 'iosImprovements', 'macImprovements', 'androidImprovements', 'iosFixes', 'macFixes', 'androidFixes'] as const;
    
    for (const category of categories) {
      if (!validateArray(parsedData[category])) {
        // If validation fails, create a fallback
        const originalArray = extractedData[category] || [];
        parsedData[category] = originalArray.map((text: string) => ({
          cn: text,
          en: text, // Fallback: use original text
        }));
        console.warn(`Warning: ${category} validation failed, using fallback`);
      }
    }

    console.log('Phase 2 completed. Final data structure validated.');

    // ============================================
    // Phase 3: Generate all templates
    // ============================================
    const generatedNotes = generateAllTemplates(parsedData);

    return NextResponse.json({
      success: true,
      parsed: parsedData,
      generated: generatedNotes,
    });
  } catch (error) {
    console.error('API Error:', error);
    
    if (error instanceof Error) {
      // Handle OpenAI specific errors
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { error: 'Invalid OpenAI API Key' },
          { status: 401 }
        );
      }
      if (error.message.includes('rate limit')) {
        return NextResponse.json(
          { error: 'API rate limit exceeded, please try again later' },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
