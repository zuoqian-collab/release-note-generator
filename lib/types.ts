// TypeScript interfaces for Release Notes Generator

export interface ReleaseNoteItem {
  cn: string;  // Chinese version
  en: string;  // English version
}

// Phase 1: Extracted raw data (original Chinese text only)
export interface ExtractedReleaseNotes {
  iosVersion: string;
  macVersion: string;
  androidVersion: string;
  iosNew: string[];
  macNew: string[];
  androidNew: string[];
  iosImprovements: string[];
  macImprovements: string[];
  androidImprovements: string[];
  iosFixes: string[];
  macFixes: string[];
  androidFixes: string[];
}

// Phase 2: Polished data (with both CN and EN)
export interface ParsedReleaseNotes {
  iosVersion: string;
  macVersion: string;
  androidVersion: string;
  iosBuild?: string;  // Optional build number for iOS
  androidBuild?: string;  // Optional build number for Android
  
  // New features
  iosNew: ReleaseNoteItem[];
  macNew: ReleaseNoteItem[];
  androidNew: ReleaseNoteItem[];
  
  // Improvements
  iosImprovements: ReleaseNoteItem[];
  macImprovements: ReleaseNoteItem[];
  androidImprovements: ReleaseNoteItem[];
  
  // Bug fixes
  iosFixes: ReleaseNoteItem[];
  macFixes: ReleaseNoteItem[];
  androidFixes: ReleaseNoteItem[];
}

export interface GeneratedReleaseNotes {
  discordCN: string;
  discordEN: string;
  slack: string;
  officialDesktop: string;
  officialIOS: string;
  officialAndroid: string;
}

export type TemplateType = 
  | 'discordCN' 
  | 'discordEN' 
  | 'slack' 
  | 'officialDesktop' 
  | 'officialIOS'
  | 'officialAndroid';

export interface TemplateConfig {
  id: TemplateType;
  name: string;
  description: string;
}

export type ChannelType = 'discord' | 'slack' | 'official';

export interface ChannelConfig {
  id: ChannelType;
  name: string;
  icon: string;
  templates: TemplateConfig[];
}

export const CHANNEL_CONFIGS: ChannelConfig[] = [
  {
    id: 'discord',
    name: 'Discord',
    icon: 'discord',
    templates: [
      {
        id: 'discordCN',
        name: 'Chinese',
        description: 'iOS + Desktop'
      },
      {
        id: 'discordEN',
        name: 'English',
        description: 'iOS + Desktop'
      }
    ]
  },
  {
    id: 'slack',
    name: 'Slack',
    icon: 'slack',
    templates: [
      {
        id: 'slack',
        name: 'Slack',
        description: 'iOS + Desktop, Chinese'
      }
    ]
  },
  {
    id: 'official',
    name: 'Official',
    icon: 'official',
    templates: [
      {
        id: 'officialIOS',
        name: 'iOS',
        description: 'App Store, English'
      },
      {
        id: 'officialAndroid',
        name: 'Android',
        description: 'Google Play, English'
      },
      {
        id: 'officialDesktop',
        name: 'Desktop',
        description: 'Mac/Windows, English'
      }
    ]
  }
];

// Keep for backward compatibility
export const TEMPLATE_CONFIGS: TemplateConfig[] = [
  {
    id: 'discordCN',
    name: 'Discord Chinese',
    description: 'iOS + Android + Desktop, Chinese'
  },
  {
    id: 'discordEN',
    name: 'Discord English',
    description: 'iOS + Android + Desktop, English'
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'iOS + Android + Desktop, Chinese'
  },
  {
    id: 'officialDesktop',
    name: 'Official Desktop',
    description: 'Mac/Desktop only, English'
  },
  {
    id: 'officialIOS',
    name: 'Official iOS',
    description: 'iOS only, English'
  },
  {
    id: 'officialAndroid',
    name: 'Official Android',
    description: 'Android only, English'
  }
];
