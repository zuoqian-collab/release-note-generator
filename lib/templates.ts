import { ParsedReleaseNotes, GeneratedReleaseNotes, ReleaseNoteItem } from './types';

function formatItems(items: ReleaseNoteItem[], lang: 'cn' | 'en', prefix: string = '> '): string {
  if (items.length === 0) return '';
  return items.map((item, i) => `${prefix}${i + 1}. ${item[lang]}`).join('\n');
}

function formatItemsSimple(items: ReleaseNoteItem[], lang: 'cn' | 'en'): string {
  if (items.length === 0) return '';
  return items.map((item, i) => `> ${i + 1}. ${item[lang]}`).join('\n');
}

function formatItemsPlain(items: ReleaseNoteItem[], lang: 'cn' | 'en'): string {
  if (items.length === 0) return '';
  return items.map((item, i) => `${i + 1}. ${item[lang]}`).join('\n');
}

export function generateDiscordCN(data: ParsedReleaseNotes): string {
  const iosNewSection = data.iosNew.length > 0 
    ? `:AImagic: **\`新增功能\`**\n${formatItemsSimple(data.iosNew, 'cn')}\n\n` : '';
  const iosImprovementsSection = data.iosImprovements.length > 0 
    ? `:bigthumbup: **\`体验优化\`**\n${formatItemsSimple(data.iosImprovements, 'cn')}\n\n` : '';
  const iosFixesSection = data.iosFixes.length > 0 
    ? `:check: **\`Bug 修复\`**\n${formatItemsSimple(data.iosFixes, 'cn')}` : '';

  const macNewSection = data.macNew.length > 0 
    ? `:AImagic: **\`新增功能\`**\n${formatItemsSimple(data.macNew, 'cn')}\n\n` : '';
  const macImprovementsSection = data.macImprovements.length > 0 
    ? `:bigthumbup: **\`体验优化\`**\n${formatItemsSimple(data.macImprovements, 'cn')}\n\n` : '';
  const macFixesSection = data.macFixes.length > 0 
    ? `:check: **\`Bug 修复\`**\n${formatItemsSimple(data.macFixes, 'cn')}` : '';

  const androidNewSection = data.androidNew.length > 0 
    ? `:AImagic: **\`新增功能\`**\n${formatItemsSimple(data.androidNew, 'cn')}\n\n` : '';
  const androidImprovementsSection = data.androidImprovements.length > 0 
    ? `:bigthumbup: **\`体验优化\`**\n${formatItemsSimple(data.androidImprovements, 'cn')}\n\n` : '';
  const androidFixesSection = data.androidFixes.length > 0 
    ? `:check: **\`Bug 修复\`**\n${formatItemsSimple(data.androidFixes, 'cn')}` : '';

  return `📱 **[iOS 客户端 — v${data.iosVersion}]**

${iosNewSection}${iosImprovementsSection}${iosFixesSection}

⸻

💻 **[桌面端(Mac+Windows) — v${data.macVersion}]**

${macNewSection}${macImprovementsSection}${macFixesSection}

⸻

🤖 **[Android 客户端 — v${data.androidVersion}]**

${androidNewSection}${androidImprovementsSection}${androidFixesSection}`.trim();
}

export function generateDiscordEN(data: ParsedReleaseNotes): string {
  const iosNewSection = data.iosNew.length > 0 
    ? `:AImagic: **\`NEW\`**\n${formatItemsSimple(data.iosNew, 'en')}\n\n` : '';
  const iosImprovementsSection = data.iosImprovements.length > 0 
    ? `:bigthumbup: **\`IMPROVEMENTS\`**\n${formatItemsSimple(data.iosImprovements, 'en')}\n\n` : '';
  const iosFixesSection = data.iosFixes.length > 0 
    ? `:check: **\`FIXES\`**\n${formatItemsSimple(data.iosFixes, 'en')}` : '';

  const macNewSection = data.macNew.length > 0 
    ? `:AImagic: **\`NEW\`**\n${formatItemsSimple(data.macNew, 'en')}\n\n` : '';
  const macImprovementsSection = data.macImprovements.length > 0 
    ? `:bigthumbup: **\`IMPROVEMENTS\`**\n${formatItemsSimple(data.macImprovements, 'en')}\n\n` : '';
  const macFixesSection = data.macFixes.length > 0 
    ? `:check: **\`FIXES\`**\n${formatItemsSimple(data.macFixes, 'en')}` : '';

  const androidNewSection = data.androidNew.length > 0 
    ? `:AImagic: **\`NEW\`**\n${formatItemsSimple(data.androidNew, 'en')}\n\n` : '';
  const androidImprovementsSection = data.androidImprovements.length > 0 
    ? `:bigthumbup: **\`IMPROVEMENTS\`**\n${formatItemsSimple(data.androidImprovements, 'en')}\n\n` : '';
  const androidFixesSection = data.androidFixes.length > 0 
    ? `:check: **\`FIXES\`**\n${formatItemsSimple(data.androidFixes, 'en')}` : '';

  return `📱 **[Mobile (iOS) — v${data.iosVersion}]**

${iosNewSection}${iosImprovementsSection}${iosFixesSection}

⸻

💻 **[Desktop (Mac+Windows) — v${data.macVersion}]**

${macNewSection}${macImprovementsSection}${macFixesSection}

⸻

🤖 **[Mobile (Android) — v${data.androidVersion}]**

${androidNewSection}${androidImprovementsSection}${androidFixesSection}`.trim();
}

export function generateSlack(data: ParsedReleaseNotes): string {
  const iosBuild = data.iosBuild ? `（${data.iosBuild}）` : '';
  const androidBuild = data.androidBuild ? `（${data.androidBuild}）` : '';
  
  const iosNewSection = data.iosNew.length > 0 
    ? `🚀 新增功能\n${formatItemsPlain(data.iosNew, 'cn')}\n\n` : '';
  const iosImprovementsSection = data.iosImprovements.length > 0 
    ? `✨ 体验优化\n${formatItemsPlain(data.iosImprovements, 'cn')}\n\n` : '';
  const iosFixesSection = data.iosFixes.length > 0 
    ? `🧰 Bug 修复\n${formatItemsPlain(data.iosFixes, 'cn')}` : '';

  const macNewSection = data.macNew.length > 0 
    ? `🚀 新增功能\n${formatItemsPlain(data.macNew, 'cn')}\n\n` : '';
  const macImprovementsSection = data.macImprovements.length > 0 
    ? `✨ 体验优化\n${formatItemsPlain(data.macImprovements, 'cn')}\n\n` : '';
  const macFixesSection = data.macFixes.length > 0 
    ? `🧰 Bug 修复\n${formatItemsPlain(data.macFixes, 'cn')}` : '';

  const androidNewSection = data.androidNew.length > 0 
    ? `🚀 新增功能\n${formatItemsPlain(data.androidNew, 'cn')}\n\n` : '';
  const androidImprovementsSection = data.androidImprovements.length > 0 
    ? `✨ 体验优化\n${formatItemsPlain(data.androidImprovements, 'cn')}\n\n` : '';
  const androidFixesSection = data.androidFixes.length > 0 
    ? `🧰 Bug 修复\n${formatItemsPlain(data.androidFixes, 'cn')}` : '';

  return `:filo-mail-icon: [What's New]


:iphone: [iOS 客户端 — v${data.iosVersion}${iosBuild}]

${iosNewSection}${iosImprovementsSection}${iosFixesSection}

⸻

:computer: [桌面端 (Mac+Windows) — v${data.macVersion}]

${macNewSection}${macImprovementsSection}${macFixesSection}

⸻

:robot_face: [Android 客户端 — v${data.androidVersion}${androidBuild}]

${androidNewSection}${androidImprovementsSection}${androidFixesSection}`.trim();
}

export function generateOfficialDesktop(data: ParsedReleaseNotes): string {
  const newSection = data.macNew.length > 0 
    ? `🚀 **\`NEW\`**\n${formatItemsSimple(data.macNew, 'en')}\n\n` : '';
  const improvementsSection = data.macImprovements.length > 0 
    ? `✨ **\`IMPROVEMENTS\`**\n${formatItemsSimple(data.macImprovements, 'en')}\n\n` : '';
  const fixesSection = data.macFixes.length > 0 
    ? `🧰 **\`FIXES\`**\n${formatItemsSimple(data.macFixes, 'en')}` : '';

  return `**v${data.macVersion}**

${newSection}${improvementsSection}${fixesSection}`.trim();
}

export function generateOfficialIOS(data: ParsedReleaseNotes): string {
  const newSection = data.iosNew.length > 0 
    ? `🚀 **\`NEW\`**\n${formatItemsSimple(data.iosNew, 'en')}\n\n` : '';
  const improvementsSection = data.iosImprovements.length > 0 
    ? `✨ **\`IMPROVEMENTS\`**\n${formatItemsSimple(data.iosImprovements, 'en')}\n\n` : '';
  const fixesSection = data.iosFixes.length > 0 
    ? `🧰 **\`FIXES\`**\n${formatItemsSimple(data.iosFixes, 'en')}` : '';

  return `**v${data.iosVersion}**

${newSection}${improvementsSection}${fixesSection}`.trim();
}

export function generateOfficialAndroid(data: ParsedReleaseNotes): string {
  const newSection = data.androidNew.length > 0 
    ? `🚀 **\`NEW\`**\n${formatItemsSimple(data.androidNew, 'en')}\n\n` : '';
  const improvementsSection = data.androidImprovements.length > 0 
    ? `✨ **\`IMPROVEMENTS\`**\n${formatItemsSimple(data.androidImprovements, 'en')}\n\n` : '';
  const fixesSection = data.androidFixes.length > 0 
    ? `🧰 **\`FIXES\`**\n${formatItemsSimple(data.androidFixes, 'en')}` : '';

  return `**v${data.androidVersion}**

${newSection}${improvementsSection}${fixesSection}`.trim();
}

export function generateAllTemplates(data: ParsedReleaseNotes): GeneratedReleaseNotes {
  return {
    discordCN: generateDiscordCN(data),
    discordEN: generateDiscordEN(data),
    slack: generateSlack(data),
    officialDesktop: generateOfficialDesktop(data),
    officialIOS: generateOfficialIOS(data),
    officialAndroid: generateOfficialAndroid(data),
  };
}

