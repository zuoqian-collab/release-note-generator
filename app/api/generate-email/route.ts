import { NextRequest, NextResponse } from 'next/server';
import { createOpenAIClient, EMAIL_HIGHLIGHT_PROMPT } from '@/lib/openai';
import { generateFullEmailHtml } from '@/lib/templates';
import { ParsedReleaseNotes, EmailHighlights, EmailHighlightItem } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const { parsedData } = await request.json();

    if (!parsedData) {
      return NextResponse.json(
        { error: 'Please generate release notes first' },
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

    // Extract email highlights from parsed release notes
    console.log('Extracting email highlights...');

    const highlightResponse = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: EMAIL_HIGHLIGHT_PROMPT,
        },
        {
          role: 'user',
          content: `Select 3-5 most notable features from these release notes for a weekly email newsletter:\n\n${JSON.stringify(parsedData, null, 2)}`,
        },
      ],
      response_format: { type: 'json_object' },
      temperature: 0.3,
    });

    const highlightContent = highlightResponse.choices[0]?.message?.content;
    
    if (!highlightContent) {
      return NextResponse.json(
        { error: 'AI returned empty response' },
        { status: 500 }
      );
    }

    let emailHighlights: EmailHighlightItem[] = [];
    
    try {
      const highlightData = JSON.parse(highlightContent) as EmailHighlights;
      if (highlightData.highlights && Array.isArray(highlightData.highlights)) {
        emailHighlights = highlightData.highlights;
      }
    } catch {
      return NextResponse.json(
        { error: 'Failed to parse AI response' },
        { status: 500 }
      );
    }

    if (emailHighlights.length === 0) {
      return NextResponse.json(
        { error: 'No highlights extracted' },
        { status: 500 }
      );
    }

    // Sort highlights to ensure order: all → mobile → desktop
    const platformOrder: Record<string, number> = { 'all': 0, 'mobile': 1, 'desktop': 2 };
    emailHighlights.sort((a, b) => {
      const orderA = platformOrder[a.platform] ?? 99;
      const orderB = platformOrder[b.platform] ?? 99;
      return orderA - orderB;
    });

    console.log(`Extracted ${emailHighlights.length} highlights.`);

    // Generate full email HTML
    const emailHtml = generateFullEmailHtml(emailHighlights);

    return NextResponse.json({
      success: true,
      emailHtml,
      highlights: emailHighlights,
    });
  } catch (error) {
    console.error('API Error:', error);
    
    if (error instanceof Error) {
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

