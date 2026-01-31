"use client";

import { useState } from "react";
import { useTheme, type ThemeType } from "@/components/ThemeProvider";

const themes: { id: ThemeType; name: string; icon: string }[] = [
  { id: "minimal", name: "MINIMAL", icon: "◇" },
  { id: "cyber", name: "CYBER", icon: "◈" },
  { id: "terminal", name: "TERMINAL", icon: "▣" },
];

export default function CyberSwitcher() {
  const { theme, setTheme, colorMode, toggleColorMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [glitching, setGlitching] = useState(false);

  const handleThemeChange = (newTheme: ThemeType) => {
    setGlitching(true);
    setTimeout(() => {
      setTheme(newTheme);
      setGlitching(false);
      setIsOpen(false);
    }, 300);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Main toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`
          relative w-12 h-12 rounded-lg
          flex items-center justify-center
          transition-all duration-300
          ${glitching ? "animate-[glitch_0.3s_ease_infinite]" : ""}
        `}
        style={{
          background: "var(--card-bg)",
          border: "1px solid var(--border)",
          boxShadow: isOpen
            ? "0 0 20px rgba(232, 121, 249, 0.3)"
            : "0 0 12px rgba(232, 121, 249, 0.15)",
        }}
        aria-label="Open theme switcher"
      >
        {/* Icon */}
        <span
          className="text-xl"
          style={{
            color: "var(--accent)",
          }}
          aria-hidden="true"
        >
          ◈
        </span>
      </button>

      {/* Theme menu */}
      {isOpen && (
        <div
          className="absolute bottom-14 right-0 mb-2 p-2 rounded-lg overflow-hidden"
          style={{
            background: "var(--card-bg)",
            backdropFilter: "blur(12px)",
            border: "1px solid var(--border)",
            boxShadow: "0 8px 32px var(--shadow)",
          }}
        >
          {/* Theme options */}
          <div className="flex flex-col gap-1 p-2">
            {themes.map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => handleThemeChange(t.id)}
                className={`
                  relative px-4 py-2.5 rounded-lg text-left font-mono text-sm
                  transition-all duration-200
                  flex items-center gap-3 min-w-[140px]
                `}
                style={{
                  background:
                    theme === t.id ? "var(--accent-secondary)" : "transparent",
                  color:
                    theme === t.id
                      ? "var(--accent)"
                      : "var(--foreground-secondary)",
                }}
              >
                <span
                  className="text-base"
                  style={{
                    color: "var(--accent)",
                  }}
                  aria-hidden="true"
                >
                  {t.icon}
                </span>
                <span>{t.name}</span>
                {theme === t.id && (
                  <span
                    className="ml-auto"
                    style={{ color: "var(--accent)" }}
                    aria-hidden="true"
                  >
                    ●
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div
            className="mx-3 my-1 h-px"
            style={{
              background: "var(--border)",
            }}
            aria-hidden="true"
          />

          {/* Dark mode toggle */}
          <div className="p-2">
            <button
              type="button"
              onClick={toggleColorMode}
              className="w-full px-4 py-2.5 rounded-lg font-mono text-sm text-left
                flex items-center gap-3 transition-all duration-200"
              style={{
                color: "var(--foreground-secondary)",
              }}
            >
              <span
                className="text-base"
                style={{ color: "var(--accent)" }}
                aria-hidden="true"
              >
                {colorMode === "dark" ? "◐" : "◑"}
              </span>
              <span>{colorMode === "dark" ? "LIGHT" : "DARK"}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
