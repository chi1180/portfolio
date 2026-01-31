"use client";

import { useState, useRef, useEffect } from "react";
import { useTheme, type ThemeType } from "../ThemeProvider";

interface ThemeOption {
  id: ThemeType;
  name: string;
  icon: string;
}

const themeOptions: ThemeOption[] = [
  { id: "minimal", name: "Modern Minimal", icon: "◯" },
  { id: "cyber", name: "Cyberpunk", icon: "◈" },
  { id: "terminal", name: "Terminal", icon: "▣" },
];

export default function MinimalSwitcher() {
  const { theme, setTheme, colorMode, toggleColorMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentTheme =
    themeOptions.find((t) => t.id === theme) || themeOptions[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleThemeSelect = (themeId: ThemeType) => {
    setTheme(themeId);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center gap-3">
      {/* Theme Selector Dropdown */}
      <div className="relative" ref={dropdownRef}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground)] text-sm font-medium transition-all duration-300 hover:border-[var(--accent)] hover:shadow-sm"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <span className="text-lg">{currentTheme.icon}</span>
          <span className="hidden sm:inline">{currentTheme.name}</span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <title>Toggle dropdown</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div
            className="absolute right-0 mt-2 w-48 py-2 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-lg z-50 animate-fade-in"
            role="listbox"
          >
            {themeOptions.map((option) => (
              <button
                type="button"
                key={option.id}
                onClick={() => handleThemeSelect(option.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-sm transition-colors duration-150 ${
                  theme === option.id
                    ? "bg-[var(--accent-secondary)] text-[var(--accent)]"
                    : "text-[var(--foreground)] hover:bg-[var(--background-secondary)]"
                }`}
                role="option"
                aria-selected={theme === option.id}
              >
                <span className="text-lg">{option.icon}</span>
                <span>{option.name}</span>
                {theme === option.id && (
                  <svg
                    className="w-4 h-4 ml-auto text-[var(--accent)]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                  >
                    <title>Selected</title>
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dark/Light Mode Toggle */}
      <button
        type="button"
        onClick={toggleColorMode}
        className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--background-secondary)] border border-[var(--border)] text-[var(--foreground)] transition-all duration-300 hover:border-[var(--accent)] hover:shadow-sm"
        aria-label={`Switch to ${colorMode === "light" ? "dark" : "light"} mode`}
      >
        {colorMode === "light" ? (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <title>Switch to dark mode</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <title>Switch to light mode</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        )}
      </button>
    </div>
  );
}
