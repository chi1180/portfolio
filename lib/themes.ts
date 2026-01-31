// Theme definitions for the portfolio site

export type ThemeId = 'minimal' | 'cyber' | 'terminal';

export interface ThemeColors {
  // Base colors
  background: string;
  backgroundSecondary: string;
  text: string;
  textSecondary: string;

  // Accent colors
  accent: string;
  accentSecondary: string;
  accentGlow?: string;

  // UI colors
  border: string;
  shadow: string;

  // Special colors (theme-specific)
  special?: string;
  specialSecondary?: string;
}

export interface Theme {
  id: ThemeId;
  name: string;
  description: string;
  light: ThemeColors;
  dark: ThemeColors;
  animationLevel: 'subtle' | 'moderate' | 'intense';
}

export const themes: Record<ThemeId, Theme> = {
  minimal: {
    id: 'minimal',
    name: 'Modern Minimal',
    description: 'Clean and elegant design with subtle animations',
    animationLevel: 'subtle',
    light: {
      background: '#ffffff',
      backgroundSecondary: '#f8f9fa',
      text: '#1a1a1a',
      textSecondary: '#6b7280',
      accent: '#2563eb',
      accentSecondary: '#ebf5fe',
      border: '#e5e7eb',
      shadow: 'rgba(0, 0, 0, 0.1)',
    },
    dark: {
      background: '#0f0f0f',
      backgroundSecondary: '#1a1a1a',
      text: '#f5f5f5',
      textSecondary: '#a1a1a1',
      accent: '#60a5fa',
      accentSecondary: '#1e3a5f',
      border: '#2a2a2a',
      shadow: 'rgba(0, 0, 0, 0.5)',
    },
  },

  cyber: {
    id: 'cyber',
    name: 'Cyberpunk',
    description: 'Neon lights and futuristic vibes',
    animationLevel: 'intense',
    light: {
      background: '#1a1a2e',
      backgroundSecondary: '#16213e',
      text: '#eee',
      textSecondary: '#a1a1c1',
      accent: '#00f5ff',
      accentSecondary: '#ff00ff',
      accentGlow: '0 0 20px #00f5ff',
      border: '#00f5ff40',
      shadow: 'rgba(0, 245, 255, 0.3)',
      special: '#ff00ff',
      specialSecondary: '#ffff00',
    },
    dark: {
      background: '#0a0a0f',
      backgroundSecondary: '#0f0f1a',
      text: '#fff',
      textSecondary: '#8888aa',
      accent: '#00f5ff',
      accentSecondary: '#ff00ff',
      accentGlow: '0 0 30px #00f5ff',
      border: '#00f5ff30',
      shadow: 'rgba(0, 245, 255, 0.4)',
      special: '#ff00ff',
      specialSecondary: '#ffff00',
    },
  },

  terminal: {
    id: 'terminal',
    name: 'Terminal',
    description: 'Hacker-style command line interface',
    animationLevel: 'moderate',
    light: {
      background: '#1e1e1e',
      backgroundSecondary: '#252525',
      text: '#00ff00',
      textSecondary: '#00aa00',
      accent: '#00ff00',
      accentSecondary: '#003300',
      accentGlow: '0 0 10px #00ff00',
      border: '#00ff0040',
      shadow: 'rgba(0, 255, 0, 0.2)',
      special: '#ffff00',
      specialSecondary: '#ff6600',
    },
    dark: {
      background: '#0a0a0a',
      backgroundSecondary: '#111111',
      text: '#00ff00',
      textSecondary: '#008800',
      accent: '#00ff00',
      accentSecondary: '#002200',
      accentGlow: '0 0 15px #00ff00',
      border: '#00ff0030',
      shadow: 'rgba(0, 255, 0, 0.3)',
      special: '#ffff00',
      specialSecondary: '#ff6600',
    },
  },
};

export const themeList = Object.values(themes);

export function getTheme(id: ThemeId): Theme {
  return themes[id] || themes.minimal;
}

export function getThemeColors(id: ThemeId, isDark: boolean): ThemeColors {
  const theme = getTheme(id);
  return isDark ? theme.dark : theme.light;
}

// Terminal commands for theme switching
export const terminalCommands = {
  help: `Available commands:
  theme list     - Show all available themes
  theme <name>   - Switch to a theme (minimal, cyber, terminal)
  clear          - Clear the terminal
  about          - About this portfolio
  skills         - Show skills
  contact        - Show contact info
  dark           - Toggle dark mode
  help           - Show this help message`,

  about: `> Chi1180
> A little coder_
>
> I write code for Web, Desktop and Mobile.
> TypeScript is my favorite ❤️`,

  themeList: `Available themes:
  - minimal   : Modern Minimal - Clean and elegant
  - cyber     : Cyberpunk - Neon lights and glow
  - terminal  : Terminal - Hacker-style CLI`,
};
