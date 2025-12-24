import OpenAI from 'openai';

export function createOpenAIClient(apiKey: string) {
  return new OpenAI({
    apiKey: apiKey,
    baseURL: 'https://api.gptsapi.net/v1',
  });
}

// Phase 1: Extract and categorize content (keep original text)
export const EXTRACTION_PROMPT = `You are a release notes parser. Your job is to extract and categorize content from raw release notes.

PLATFORM RULES - CRITICAL:
- "【多端】" means the feature applies to ALL platforms (iOS, Mac, AND Android)
  * These items MUST be added to iOS, Mac, AND Android arrays
  * Example: If【多端】has 3 items under "New" and【iOS】has 1 item, then iosNew should have 4 items total (3+1)
- "【iOS】" means iOS only (mobile app) - only add to iOS arrays
- "【Mac】/ 【PC】" means Mac/Desktop only (also applies to Windows desktop app) - only add to Mac arrays
- "【Android】" means Android only - only add to Android arrays
- "New" section = new features
- "Improvements" section = improvements/optimizations/enhancements  
- "Fixes" section = bug fixes

PARSING LOGIC EXAMPLE:
Input:
  New
  【多端】
  - Feature A
  - Feature B
  【iOS】
  - Feature C
  【Mac】
  - Feature D
  【Android】
  - Feature E

Output should be:
  iosNew: ["Feature A", "Feature B", "Feature C"]  // 多端(2) + iOS(1) = 3 items
  macNew: ["Feature A", "Feature B", "Feature D"]  // 多端(2) + Mac(1) = 3 items
  androidNew: ["Feature A", "Feature B", "Feature E"]  // 多端(2) + Android(1) = 3 items

IMPORTANT: Keep the original Chinese text as-is. Do NOT rewrite or translate yet. Just extract and categorize accurately.

You must return a valid JSON object with this exact structure:
{
  "iosVersion": "x.x.x",
  "macVersion": "x.x.x",
  "androidVersion": "x.x.x",
  "iosNew": ["原始文本1", "原始文本2", ...],
  "macNew": ["原始文本1", "原始文本2", ...],
  "androidNew": ["原始文本1", "原始文本2", ...],
  "iosImprovements": ["原始文本1", "原始文本2", ...],
  "macImprovements": ["原始文本1", "原始文本2", ...],
  "androidImprovements": ["原始文本1", "原始文本2", ...],
  "iosFixes": ["原始文本1", "原始文本2", ...],
  "macFixes": ["原始文本1", "原始文本2", ...],
  "androidFixes": ["原始文本1", "原始文本2", ...]
}`;

// Phase 2: Polish and translate content
export const POLISH_PROMPT = `You are a professional release notes writer. Your job is to rewrite raw release notes to follow industry best practices.

You will receive JSON data with raw Chinese text items. Rewrite each item to be professional, specific, and user-benefit focused.

WRITING STYLE - ENGLISH:
- Start with action verbs: "Added", "Use", "Updated", "Fixed", "Let", "Polished", "Improved"
- Be specific and descriptive, not just listing features
- Emphasize user benefits: "help you", "makes it easier", "for easier follow-up", "so you can"
- Professional but friendly tone
- Complete sentences with proper grammar
- For "New" features: Emphasize what users can now do
- For "Improvements": Focus on how it's better/easier/faster
- For "Fixes": Always use "Fixed an issue where..." pattern

REFERENCE EXAMPLES (English):
- Input: "Filo AI 能够完成和删除待办"
  Output: "Use Filo AI to complete or delete to-dos directly from your AI chat window."

- Input: "收件箱列表，新增"发给我、抄送我、带附件、日期"筛选功能"
  Output: "Added new inbox filters for 'To me', 'Cc to me', 'With attachments', and 'Date' to help you find important emails faster."

- Input: "Filo AI能够快速创建Todo"
  Output: "Let Filo AI quickly create new to-dos from your emails for easier follow-up."

- Input: "在 Customize AI 设置后，写邮件时可以自动填入身份证、地址等信息"
  Output: "After you finish setting up Customize AI, your verified identity and address information are automatically filled in when you compose emails."

- Input: "支持仅有 Cc（抄送）、仅有 Bcc（密送）的发件"
  Output: "You can now send emails that contain only Cc recipients or only Bcc recipients."

- Input: "邮件详情页，引用部分格式错误的问题修复"
  Output: "Fixed an issue where quoted content could appear misaligned in the message detail view."

- Input: "AI发送按钮更换样式，与发送邮件按钮区分开"
  Output: "Updated the AI send button style, so it is easier to distinguish from the regular Send button."

- Input: "AI结果版本切换，支持回退用户自己撰写的内容"
  Output: "Added AI result version switching so you can revert back to the content you wrote yourself at any time."

WRITING STYLE - CHINESE:
- Use natural, modern Chinese expression
- Add context words: "现在支持", "新增", "优化", "修复了...的问题"
- Make it more engaging: "帮助你", "让...更轻松", "更快", "更易", "方便"
- Professional and user-friendly tone
- Complete sentences with proper punctuation
- Use Chinese corner quotes「」instead of ""
- For "New" features: Use "现在支持", "新增...入口"
- For "Improvements": Use "优化了", "调整", "完成...后"
- For "Fixes": Always use "修复了...的问题" pattern

REFERENCE EXAMPLES (Chinese):
- Input: "Filo AI 能够完成和删除待办"
  Output: "Filo AI 现在支持直接完成或删除待办事项。"

- Input: "收件箱列表，新增"发给我、抄送我、带附件、日期"筛选功能"
  Output: "收件箱列表新增「发给我」「抄送我」「带附件」「日期」筛选条件，帮助你更快找到重要邮件。"

- Input: "Filo AI能够快速创建Todo"
  Output: "Filo AI 支持一键快速创建待办，让跟进事项更轻松。"

- Input: "在 Customize AI 设置后，写邮件时可以自动填入身份证、地址等信息"
  Output: "完成 Customize AI 配置后，写邮件时会自动填入身份认证与地址等信息。"

- Input: "邮件详情页，引用部分格式错误的问题修复"
  Output: "修复了邮件详情页中引用内容格式显示异常的问题。"

- Input: "AI发送按钮更换样式，与发送邮件按钮区分开"
  Output: "调整 AI 发送按钮样式，与普通发送按钮更易区分。"

TECHNICAL TERMS TO KEEP:
- Keep in both languages: "AI", "Cc", "Bcc", "Customize AI", "Dones", "hover", "Filo AI", "Filo", "Todo"
- Keep English quotes in English: 'To me', 'Cc to me', etc.
- Use Chinese corner quotes「」in Chinese for UI labels

INPUT FORMAT:
{
  "iosVersion": "x.x.x",
  "macVersion": "x.x.x",
  "androidVersion": "x.x.x",
  "iosNew": ["原始文本", ...],
  "macNew": ["原始文本", ...],
  "androidNew": ["原始文本", ...],
  "iosImprovements": ["原始文本", ...],
  "macImprovements": ["原始文本", ...],
  "androidImprovements": ["原始文本", ...],
  "iosFixes": ["原始文本", ...],
  "macFixes": ["原始文本", ...],
  "androidFixes": ["原始文本", ...]
}

OUTPUT FORMAT (same structure but with polished content):
{
  "iosVersion": "x.x.x",
  "macVersion": "x.x.x",
  "androidVersion": "x.x.x",
  "iosNew": [{"cn": "专业中文", "en": "Professional English"}, ...],
  "macNew": [{"cn": "专业中文", "en": "Professional English"}, ...],
  "androidNew": [{"cn": "专业中文", "en": "Professional English"}, ...],
  "iosImprovements": [{"cn": "专业中文", "en": "Professional English"}, ...],
  "macImprovements": [{"cn": "专业中文", "en": "Professional English"}, ...],
  "androidImprovements": [{"cn": "专业中文", "en": "Professional English"}, ...],
  "iosFixes": [{"cn": "专业中文", "en": "Professional English"}, ...],
  "macFixes": [{"cn": "专业中文", "en": "Professional English"}, ...],
  "androidFixes": [{"cn": "专业中文", "en": "Professional English"}, ...]
}

IMPORTANT: 
- The number of items in each array must remain exactly the same
- Every item must be rewritten to be professional and user-focused
- Do NOT just translate literally - rewrite to sound natural and professional`;

// Phase 3: Extract email highlights for newsletter
export const EMAIL_HIGHLIGHT_PROMPT = `You are a marketing expert for a productivity email app called Filo. Your job is to extract notable features from release notes for a weekly update email.

EXTRACTION RULES - CRITICAL:
1. Extract features from NEW and IMPROVEMENTS sections ONLY (ignore Fixes)
2. PRIORITIZE valuable, user-facing features worth promoting:
   - NEW features are more important than minor improvements
   - Focus on features that provide clear user value
   - Skip technical or minor UI tweaks unless they're significant
3. IGNORE Android completely - only consider iOS and Mac/PC features
3. CAREFULLY compare iOS and Mac/PC feature lists - look for the SAME features:
   - Read through ALL iOS features
   - Read through ALL Mac/PC features
   - Identify which features appear in BOTH (even with slightly different wording)

4. Use SEMANTIC matching (not exact text matching!):
   - "垃圾邮件的风险提示样式优化" in iOS = "垃圾邮件的风险提示样式优化" in PC → SAME feature
   - "系统自动处理Todo状态的逻辑优化" in iOS = "系统自动处理Todo状态的逻辑优化" in PC → SAME feature
   - "Filo Plus 订阅上线" in iOS = "Filo Plus 订阅上线" in PC → SAME feature

5. Categorize by platform - STEP BY STEP:
   STEP 1: Find ALL features that exist in BOTH iOS AND Mac/PC
           → Put these in "all" platform
   
   STEP 2: Find features that ONLY exist in iOS (not in Mac/PC at all)
           → Put these in "mobile" platform
   
   STEP 3: Find features that ONLY exist in Mac/PC (not in iOS at all)
           → Put these in "desktop" platform

6. CRITICAL - NO DUPLICATES:
   - Each unique feature appears in ONLY ONE category
   - If a feature exists in both iOS and Mac/PC → MUST go to "all", NOT in mobile or desktop
   - Never repeat the same feature across different categories

7. Do NOT include any Android-only features

CONTENT FORMAT RULES - CRITICAL:
- Maximum 3 items per platform
- Each item must be ONE short line (no more than 15 words)
- Return content as an ARRAY of strings (formatting will be handled by code)
- Do NOT add bullet points, line breaks, or any formatting - just plain text strings

EMOJI RULES (FIXED per platform):
- "all" platform: Always use 📍
- "mobile" platform: Always use 📱
- "desktop" platform: Always use 💻

WRITING STYLE:
- Write in English
- Be extremely concise - one short sentence per item
- Focus on user benefits
- Start with action verbs: "Added", "Use", "Improved", "Now supports"

OUTPUT FORMAT:
Return a JSON object with this structure. MUST follow this exact order: all → mobile → desktop

EXAMPLE:
Given:
{
  "iosNew": ["智能邮件摘要上线"],
  "iosImprovements": ["搜索结果排序优化"],
  "macNew": ["智能邮件摘要上线", "批量邮件操作"],
  "macImprovements": ["搜索结果排序优化", "快捷键支持"]
}

Correct categorization:
{
  "highlights": [
    {
      "platform": "all",
      "emoji": "📍",
      "content": [
        "AI-powered smart email summaries are now available.",
        "Improved search result ranking for faster access."
      ]
    },
    {
      "platform": "desktop",
      "emoji": "💻",
      "content": [
        "New bulk email actions for efficient message management.",
        "Added keyboard shortcut support for faster operations."
      ]
    }
  ]
}

Note: The "mobile" section is omitted because iOS has no unique features (all iOS features also exist in Mac).

IMPORTANT:
- MUST maintain order: "all" first, then "mobile", then "desktop"
- ONLY include platforms that have actual features
- If a platform has NO features, DO NOT include it in the output at all
- NEVER output placeholder text like "No notable features" - just omit the platform entirely
- Maximum 3 items per platform (as array elements)
- Each item must be short (one line, under 15 words)
- Do NOT include bug fixes
- Return content as array of strings, NOT as formatted text`;
