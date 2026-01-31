"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTheme, type ThemeType } from "@/components/ThemeProvider";

interface HistoryEntry {
  id: string;
  command: string;
  output: string;
  isError?: boolean;
}

const COMMANDS = {
  help: `Available commands:
  theme list          - Show all available themes
  theme <name>        - Switch to a theme (minimal, cyber, terminal)
  dark                - Toggle dark mode
  clear               - Clear terminal history
  about               - About this portfolio
  help                - Show this help message`,

  about: `┌─────────────────────────────────────┐
│           Chi1180's Portfolio       │
├─────────────────────────────────────┤
│  A little coder_                    │
│                                     │
│  Writing code for:                  │
│    • Web                            │
│    • Desktop                        │
│    • Mobile                         │
│                                     │
│  Favorite: TypeScript ❤️            │
└─────────────────────────────────────┘`,

  themeList: `Available themes:
  ├── minimal   : Modern Minimal - Clean and elegant
  ├── cyber     : Cyberpunk - Neon lights and glow
  └── terminal  : Terminal - Hacker-style CLI`,
};

let entryCounter = 0;

function generateEntryId(): string {
  entryCounter += 1;
  return `entry-${Date.now()}-${entryCounter}`;
}

export default function TerminalSwitcher() {
  const { theme, setTheme, colorMode, toggleColorMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      id: generateEntryId(),
      command: "",
      output: 'Type "help" for available commands.',
    },
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Focus input when terminal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Scroll to bottom on new output
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  });

  const processCommand = useCallback(
    (cmd: string) => {
      const trimmedCmd = cmd.trim().toLowerCase();
      const parts = trimmedCmd.split(" ");
      const mainCmd = parts[0];
      const args = parts.slice(1);

      let output = "";
      let isError = false;

      switch (mainCmd) {
        case "help":
          output = COMMANDS.help;
          break;

        case "about":
          output = COMMANDS.about;
          break;

        case "clear":
          setHistory([]);
          return;

        case "dark":
        case "toggle":
          toggleColorMode();
          output = `Color mode switched to: ${colorMode === "light" ? "dark" : "light"}`;
          break;

        case "theme":
          if (args.length === 0 || args[0] === "list") {
            output = COMMANDS.themeList;
          } else {
            const themeName = args[0] as ThemeType;
            if (["minimal", "cyber", "terminal"].includes(themeName)) {
              setTheme(themeName);
              output = `✓ Theme switched to: ${themeName}`;
            } else {
              output = `Error: Unknown theme "${args[0]}"\nUse "theme list" to see available themes.`;
              isError = true;
            }
          }
          break;

        case "":
          return;

        default:
          output = `Command not found: ${mainCmd}\nType "help" for available commands.`;
          isError = true;
      }

      setHistory((prev) => [
        ...prev,
        { id: generateEntryId(), command: cmd, output, isError },
      ]);
      setCommandHistory((prev) => [...prev, cmd]);
      setHistoryIndex(-1);
    },
    [colorMode, setTheme, toggleColorMode],
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    processCommand(input);
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex < commandHistory.length - 1
            ? historyIndex + 1
            : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 px-4 py-2.5 font-mono text-sm rounded-lg transition-all duration-300"
        style={{
          border: "1px solid var(--border)",
          color: "var(--foreground)",
          background: "var(--card-bg)",
          boxShadow: isOpen
            ? "0 0 16px rgba(57, 255, 20, 0.2)"
            : "0 4px 12px var(--shadow)",
        }}
      >
        <span className="flex items-center gap-2">
          <span aria-hidden="true" style={{ color: "var(--accent)" }}>
            &gt;_
          </span>
          <span className="hidden sm:inline">terminal</span>
        </span>
      </button>

      {/* Terminal window */}
      {isOpen && (
        <div
          className="fixed bottom-16 right-4 z-50 w-[calc(100vw-2rem)] sm:w-[480px] max-h-[55vh] rounded-lg overflow-hidden animate-slide-in-up"
          style={{
            border: "1px solid var(--border)",
            boxShadow: "0 8px 32px var(--shadow)",
          }}
        >
          {/* Terminal header */}
          <div
            className="flex items-center justify-between px-4 py-2.5 border-b"
            style={{
              background: "var(--card-bg)",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600"
                  aria-label="Close terminal"
                />
                <div
                  className="w-3 h-3 rounded-full bg-yellow-500"
                  aria-hidden="true"
                />
                <div
                  className="w-3 h-3 rounded-full bg-green-500"
                  aria-hidden="true"
                />
              </div>
              <span
                className="ml-2 text-xs font-mono opacity-60"
                style={{ color: "var(--foreground)" }}
              >
                theme-switcher
              </span>
            </div>
            <span
              className="text-xs font-mono opacity-40"
              style={{ color: "var(--foreground)" }}
            >
              {theme} | {colorMode}
            </span>
          </div>

          {/* Terminal body */}
          <div
            ref={terminalRef}
            className="p-4 h-[280px] overflow-y-auto font-mono text-sm"
            style={{
              background: "var(--background)",
              color: "var(--foreground)",
            }}
          >
            {history.map((entry) => (
              <div key={entry.id} className="mb-2">
                {entry.command && (
                  <div className="flex items-center gap-2">
                    <span style={{ color: "var(--accent)" }} aria-hidden="true">
                      $
                    </span>
                    <span>{entry.command}</span>
                  </div>
                )}
                <pre
                  className="whitespace-pre-wrap mt-1 text-xs sm:text-sm"
                  style={{
                    color: entry.isError
                      ? "#f87171"
                      : "var(--foreground-secondary)",
                  }}
                >
                  {entry.output}
                </pre>
              </div>
            ))}

            {/* Input line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span style={{ color: "var(--accent)" }} aria-hidden="true">
                $
              </span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent outline-none font-mono"
                style={{
                  color: "var(--foreground)",
                  caretColor: "var(--accent)",
                }}
                autoComplete="off"
                spellCheck={false}
                aria-label="Terminal input"
              />
              <span
                className="animate-pulse"
                style={{ color: "var(--accent)" }}
                aria-hidden="true"
              >
                ▌
              </span>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
