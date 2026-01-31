"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type ThemeType = "minimal" | "cyber" | "terminal";
export type ColorMode = "light" | "dark";

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  colorMode: ColorMode;
  setColorMode: (mode: ColorMode) => void;
  toggleColorMode: () => void;
  isFirstVisit: boolean;
  setFirstVisitComplete: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_KEY = "chi1180-portfolio-theme";
const COLOR_MODE_KEY = "chi1180-portfolio-color-mode";
const FIRST_VISIT_KEY = "chi1180-portfolio-visited";

// Theme color configurations with improved contrast
const themeColors = {
  minimal: {
    light: {
      background: "#ffffff",
      backgroundSecondary: "#f8fafc",
      accent: "#3b82f6",
      accentSecondary: "#eff6ff",
      text: "#0f172a",
      textSecondary: "#475569",
      border: "#e2e8f0",
    },
    dark: {
      background: "#0f172a",
      backgroundSecondary: "#1e293b",
      accent: "#60a5fa",
      accentSecondary: "#1e3a5f",
      text: "#f1f5f9",
      textSecondary: "#94a3b8",
      border: "#334155",
    },
  },
  cyber: {
    light: {
      background: "#1a1535",
      backgroundSecondary: "#231d45",
      accent: "#e879f9",
      accentSecondary: "#2d1f3d",
      text: "#ffffff",
      textSecondary: "#c4c1e0",
      border: "#3b2d5a",
    },
    dark: {
      background: "#0c0a1d",
      backgroundSecondary: "#13102a",
      accent: "#e879f9",
      accentSecondary: "#2d1f3d",
      text: "#f0eeff",
      textSecondary: "#b8b5d0",
      border: "#3b2d5a",
    },
  },
  terminal: {
    light: {
      background: "#f0f5f0",
      backgroundSecondary: "#e0ebe0",
      accent: "#16a34a",
      accentSecondary: "#dcfce7",
      text: "#0a2e0a",
      textSecondary: "#1a5a1a",
      border: "#a7d4a7",
    },
    dark: {
      background: "#0a0e14",
      backgroundSecondary: "#0f1419",
      accent: "#39ff14",
      accentSecondary: "#0f2910",
      text: "#b3f5bc",
      textSecondary: "#73d982",
      border: "#1a3d1a",
    },
  },
};

function applyThemeColors(theme: ThemeType, colorMode: ColorMode) {
  const colors = themeColors[theme][colorMode];
  const root = document.documentElement;

  root.style.setProperty("--background", colors.background);
  root.style.setProperty("--background-secondary", colors.backgroundSecondary);
  root.style.setProperty("--accent", colors.accent);
  root.style.setProperty("--accent-secondary", colors.accentSecondary);
  root.style.setProperty("--text", colors.text);
  root.style.setProperty("--text-secondary", colors.textSecondary);
  root.style.setProperty("--border", colors.border);

  // Set data attributes for CSS selectors
  root.setAttribute("data-theme", theme);
  root.setAttribute("data-color-mode", colorMode);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeType>("terminal");
  const [colorMode, setColorModeState] = useState<ColorMode>("dark");
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem(THEME_KEY) as ThemeType | null;
      const savedColorMode = localStorage.getItem(
        COLOR_MODE_KEY,
      ) as ColorMode | null;
      const hasVisited = localStorage.getItem(FIRST_VISIT_KEY);

      if (savedTheme && ["minimal", "cyber", "terminal"].includes(savedTheme)) {
        setThemeState(savedTheme);
      }

      if (savedColorMode && ["light", "dark"].includes(savedColorMode)) {
        setColorModeState(savedColorMode);
      } else {
        // Check system preference
        const prefersDark = window.matchMedia(
          "(prefers-color-scheme: dark)",
        ).matches;
        setColorModeState(prefersDark ? "dark" : "light");
      }

      setIsFirstVisit(!hasVisited);
      setMounted(true);
    }
  }, []);

  // Apply colors when theme or colorMode changes
  useEffect(() => {
    if (mounted) {
      applyThemeColors(theme, colorMode);
    }
  }, [theme, colorMode, mounted]);

  const setTheme = (newTheme: ThemeType) => {
    setThemeState(newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
  };

  const setColorMode = (mode: ColorMode) => {
    setColorModeState(mode);
    localStorage.setItem(COLOR_MODE_KEY, mode);
  };

  const toggleColorMode = () => {
    const newMode = colorMode === "light" ? "dark" : "light";
    setColorMode(newMode);
  };

  const setFirstVisitComplete = () => {
    setIsFirstVisit(false);
    localStorage.setItem(FIRST_VISIT_KEY, "true");
  };

  // Prevent flash of unstyled content
  if (!mounted) {
    return (
      <div
        style={{
          visibility: "hidden",
          minHeight: "100vh",
          background: "#0f172a",
        }}
      />
    );
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        colorMode,
        setColorMode,
        toggleColorMode,
        isFirstVisit,
        setFirstVisitComplete,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export { themeColors };
