import { ParsedReleaseNotes, GeneratedReleaseNotes, ReleaseNoteItem, EmailHighlightItem } from './types';

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

// Generate Email HTML card content from highlights
export function generateEmailCardHtml(highlights: EmailHighlightItem[]): string {
  const platformLabels: Record<string, string> = {
    'all': 'All Platforms',
    'mobile': 'Mobile',
    'desktop': 'Desktop'
  };

  const rows = highlights.map(item => `																		<tr>
																			<td style="padding: 10px 0; vertical-align: top; width: 36px;">
																				<span style="font-size: 20px;">${item.emoji}</span>
																			</td>
																			<td style="padding: 10px 0; vertical-align: top;">
																				<strong style="color: #0D93F3;">${platformLabels[item.platform] || item.platform}</strong><br>
																				<span style="color: #002346;">${item.content}</span>
																			</td>
																		</tr>`).join('\n');

  return `<div style="background-color: #EEF9FF; border-radius: 12px; padding: 20px 24px; margin: 20px 0; border-left: 4px solid #22A0FB;">
																	<table width="100%" border="0" cellpadding="0" cellspacing="0" style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; color: #002346; line-height: 1.6;">
${rows}
																	</table>
																</div>`;
}

// Full email HTML template
const EMAIL_TEMPLATE = `<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">

<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0"><!--[if mso]>
<xml><w:WordDocument xmlns:w="urn:schemas-microsoft-com:office:word"><w:DontUseAdvancedTypographyReadingMail/></w:WordDocument>
<o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch><o:AllowPNG/></o:OfficeDocumentSettings></xml>
<![endif]--><!--[if !mso]><!--><!--<![endif]-->
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			padding: 0;
		}

		a[x-apple-data-detectors] {
			color: inherit !important;
			text-decoration: inherit !important;
		}

		#MessageViewBody a {
			color: inherit;
			text-decoration: none;
		}

		p {
			line-height: inherit
		}

		.desktop_hide,
		.desktop_hide table {
			mso-hide: all;
			display: none;
			max-height: 0px;
			overflow: hidden;
		}

		.image_block img+div {
			display: none;
		}

		sup,
		sub {
			font-size: 75%;
			line-height: 0;
		}

		@media (max-width:620px) {

			.row-1 .column-1 .block-5.social_block .alignment table,
			.social_block.desktop_hide .social-table {
				display: inline-block !important;
			}

			.mobile_hide {
				display: none;
			}

			.row-content {
				width: 100% !important;
			}

			.stack .column {
				width: 100%;
				display: block;
			}

			.mobile_hide {
				min-height: 0;
				max-height: 0;
				max-width: 0;
				overflow: hidden;
				font-size: 0px;
			}

			.desktop_hide,
			.desktop_hide table {
				display: table !important;
				max-height: none !important;
			}

			.row-1 .column-1 .block-3.paragraph_block td.pad>div {
				text-align: left !important;
				font-size: 16px !important;
			}

			.row-1 .column-1 .block-3.paragraph_block td.pad {
				padding: 10px !important;
			}

			.row-1 .column-1 .block-5.social_block td.pad {
				padding: 10px 0 10px 10px !important;
			}

			.row-1 .column-1 .block-5.social_block .alignment {
				text-align: left !important;
			}
		}
	</style><!--[if mso ]><style>sup, sub { font-size: 100% !important; } sup { mso-text-raise:10% } sub { mso-text-raise:-10% }</style> <![endif]-->
</head>

<body class="body" style="background-color: #ffffff; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
	<table class="nl-container" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff;">
		<tbody>
			<tr>
				<td>
					<table class="row row-1" align="center" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
						<tbody>
							<tr>
								<td>
									<table class="row-content stack" align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; color: #000000; width: 600px; margin: 0 auto;" width="600">
										<tbody>
											<tr>
												<td class="column column-1" width="100%" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; padding-bottom: 5px; padding-top: 5px; vertical-align: top;">
													<!-- Banner 图片 -->
													<table class="image_block" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad">
																<div class="alignment" align="left">
																	<img src="https://download.filomail.com/public/assets/20251215-180812.png" style="display: block; height: auto; border: 0; max-width: 100%; border-radius: 12px;" width="580" alt title height="auto">
																</div>
															</td>
														</tr>
													</table>
													<div class="spacer_block" style="height:20px;line-height:20px;font-size:1px;">&#8202;</div>
													<table class="paragraph_block block-3" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#101112;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.8;text-align:left;mso-line-height-alt:29px;">
																	<p style="margin: 0; margin-bottom: 20px;">Hi {{first_name}},</p>
																	<p style="margin: 0; margin-bottom: 16px;">Here is a quick look at what changed in Filo this week - all focused on helping you stay on top of what matters.</p>
																</div>
																<!-- 更新内容卡片 -->
																{{RELEASE_NOTES_CARD}}
																<div style="color:#101112;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;letter-spacing:0px;line-height:1.8;text-align:left;mso-line-height-alt:29px;">
																	<p style="margin: 0; margin-bottom: 16px; font-weight: 600; color: #002346;">📋 Full release notes</p>
																	<p style="margin: 0; margin-bottom: 16px;">Want every detail, including bug fixes and smaller tweaks? <a href="https://www.filomail.com/releases" target="_blank" style="text-decoration: underline; color: #0D93F3;" rel="noopener">Read the full release notes</a> on our website or check the <a href="https://discord.gg/4mZyUn2JjJ" target="_blank" style="text-decoration: underline; color: #0D93F3;" rel="noopener">#📲｜release-notes</a> channel on Discord.</p>
																	<p style="margin: 0; margin-bottom: 16px;">If anything feels confusing or off, just write to <a href="mailto:support@filomail.com" target="_blank" style="text-decoration: underline; color: #0D93F3;" rel="noopener">support@filomail.com</a> or drop a note in Discord. Your feedback guides what we ship next.</p>
																	<p style="margin: 0; margin-bottom: 16px;">&nbsp;</p>
																	<p style="margin: 0;">Thanks for using Filo 💙<br><strong>The Filo Team</strong></p>
																</div>
															</td>
														</tr>
													</table>
													<div class="spacer_block block-4" style="height:60px;line-height:60px;font-size:1px;">&#8202;</div>
													<table class="social_block block-5" width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
														<tr>
															<td class="pad" style="padding: 10px 0 10px 10px; text-align: left;">
																<div class="alignment" align="left" style="text-align: left;">
																	<table class="social-table" width="208px" border="0" cellpadding="0" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; display: inline-block;">
																		<tr>
																			<td style="padding:0 20px 0 0;"><a href="https://x.com/Filo_Mail" target="_blank"><img src="https://download.filomail.com/public/assets/X.png" width="24" height="22" alt="X" title="X" style="display: block; width: 24px; height: 22px; border: 0;"></a></td>
																			<td style="padding:0 20px 0 0;"><a href="https://discord.gg/filo-mail" target="_blank"><img src="https://download.filomail.com/public/assets/Discord.png" width="26" height="20" alt="Discord" title="Discord" style="display: block; width: 26px; height: 20px; border: 0;"></a></td>
																			<td style="padding:0 20px 0 0;"><a href="https://www.instagram.com/filo_mail/" target="_blank"><img src="https://download.filomail.com/public/assets/Instagram.png" width="24" height="24" alt="Instagram" title="Instagram" style="display: block; width: 24px; height: 24px; border: 0;"></a></td>
																			<td style="padding:0 20px 0 0;"><a href="https://www.youtube.com/@Filo-Mail" target="_blank"><img src="https://download.filomail.com/public/assets/YouTube.png" width="26" height="18" alt="YouTube" title="YouTube" style="display: block; width: 26px; height: 18px; border: 0;"></a></td>
																		</tr>
																	</table>
																</div>
															</td>
														</tr>
													</table>
													<table class="paragraph_block block-6" width="100%" border="0" cellpadding="10" cellspacing="0" role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;">
														<tr>
															<td class="pad">
																<div style="color:#a6a6a6;direction:ltr;font-family:'Helvetica Neue', Helvetica, Arial, sans-serif;font-size:12px;font-weight:400;letter-spacing:0px;line-height:1.5;text-align:left;mso-line-height-alt:18px;">
																	<p style="margin: 0;">You're receiving this because you signed up for Filo Mail and opted in to our onboarding emails.<br>FILO AI PTE. LTD., 144 Robinson Rd #12-01, Singapore 068908<br><a href="{{amazonSESUnsubscribeUrl}}" target="_blank" rel="noopener" style="text-decoration: underline; color: #a6a6a6;">Unsubscribe</a></p>
																</div>
															</td>
														</tr>
													</table>
												</td>
											</tr>
										</tbody>
									</table>
								</td>
							</tr>
						</tbody>
					</table>
				</td>
			</tr>
		</tbody>
	</table><!-- End -->
</body>

</html>`;

// Generate full email HTML with highlights inserted
export function generateFullEmailHtml(highlights: EmailHighlightItem[]): string {
  const cardHtml = generateEmailCardHtml(highlights);
  return EMAIL_TEMPLATE.replace('{{RELEASE_NOTES_CARD}}', cardHtml);
}

export function generateAllTemplates(data: ParsedReleaseNotes): GeneratedReleaseNotes {
  return {
    discordCN: generateDiscordCN(data),
    discordEN: generateDiscordEN(data),
    slack: generateSlack(data),
    officialDesktop: generateOfficialDesktop(data),
    officialIOS: generateOfficialIOS(data),
    officialAndroid: generateOfficialAndroid(data),
    emailHtml: '', // Email HTML is generated separately
  };
}

