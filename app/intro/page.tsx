"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";

interface Line {
  text: string;
  isEnglish: boolean;
  delay: number;
}

const introLines: Line[] = [
  { text: "> Initializing...", isEnglish: true, delay: 0 },
  { text: "> System ready.", isEnglish: true, delay: 800 },
  { text: "", isEnglish: true, delay: 1200 },
  { text: "> Welcome to Chi1180's Portfolio.", isEnglish: true, delay: 1400 },
  { text: "", isEnglish: true, delay: 2200 },
  { text: "> I'm a little coder_", isEnglish: true, delay: 2400 },
  {
    text: "> Writing code for Web, Desktop, and Mobile.",
    isEnglish: true,
    delay: 3200,
  },
  { text: "", isEnglish: true, delay: 4200 },
  {
    text: "> ようこそ、Chi1180のポートフォリオへ。",
    isEnglish: false,
    delay: 4400,
  },
  { text: "", isEnglish: false, delay: 5400 },
  {
    text: "> このサイトは複数のユニークなテーマを持っています。",
    isEnglish: false,
    delay: 5600,
  },
  {
    text: "> あなただけの体験を見つけてください。",
    isEnglish: false,
    delay: 6800,
  },
  { text: "", isEnglish: false, delay: 7800 },
  { text: "> Ready to explore?", isEnglish: true, delay: 8000 },
];

export default function IntroPage() {
  const router = useRouter();
  const { setFirstVisitComplete } = useTheme();
  const [displayedLines, setDisplayedLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [showButton, setShowButton] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [buttonHovered, setButtonHovered] = useState(false);

  // Typing effect
  useEffect(() => {
    if (currentLineIndex >= introLines.length) {
      setTimeout(() => setShowButton(true), 500);
      return;
    }

    const currentLine = introLines[currentLineIndex];

    // Wait for the line's delay before starting
    if (!isTyping && currentCharIndex === 0) {
      const startDelay =
        currentLineIndex === 0
          ? currentLine.delay
          : currentLine.delay - (introLines[currentLineIndex - 1]?.delay || 0);

      const timer = setTimeout(() => {
        setIsTyping(true);
      }, startDelay);

      return () => clearTimeout(timer);
    }

    if (!isTyping) return;

    // Type each character
    if (currentCharIndex < currentLine.text.length) {
      const typingSpeed = currentLine.isEnglish ? 40 : 60; // Slower for Japanese
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          if (newLines.length <= currentLineIndex) {
            newLines.push(currentLine.text.charAt(0));
          } else {
            newLines[currentLineIndex] = currentLine.text.substring(
              0,
              currentCharIndex + 1,
            );
          }
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      }, typingSpeed);

      return () => clearTimeout(timer);
    } else {
      // Move to next line
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentCharIndex(0);
      setIsTyping(false);
    }
  }, [currentLineIndex, currentCharIndex, isTyping]);

  const handleEnter = useCallback(() => {
    setFirstVisitComplete();
    router.push("/");
  }, [router, setFirstVisitComplete]);

  // Skip intro on Escape or Enter key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Enter") {
        handleEnter();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleEnter]);

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden">
      {/* Scanline effect */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-10">
        <div
          className="w-full h-full"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 0, 0.03) 2px, rgba(0, 255, 0, 0.03) 4px)",
          }}
        />
      </div>

      {/* CRT vignette effect */}
      <div
        className="fixed inset-0 pointer-events-none z-40"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.4) 100%)",
        }}
      />

      {/* Terminal window */}
      <div className="w-full max-w-3xl relative z-10">
        {/* Terminal header */}
        <div className="bg-[#161b22] rounded-t-lg px-4 py-2 flex items-center gap-2 border-b border-[#30363d]">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="ml-4 text-[#8b949e] text-sm font-mono">
            chi1180@portfolio ~ /intro
          </span>
        </div>

        {/* Terminal body */}
        <div className="bg-[#0d1117] rounded-b-lg p-4 sm:p-6 min-h-[400px] sm:min-h-[500px] border border-t-0 border-[#30363d] font-mono">
          {/* Typed lines */}
          <div className="space-y-1 text-sm sm:text-base md:text-lg">
            {displayedLines.map((line, lineIndex) => (
              <div
                key={`line-${lineIndex}-${line.slice(0, 10)}`}
                className="text-[#00ff00]"
                style={{
                  textShadow: "0 0 10px rgba(0, 255, 0, 0.5)",
                }}
              >
                {line || "\u00A0"}
                {lineIndex === displayedLines.length - 1 &&
                  currentLineIndex < introLines.length && (
                    <span className="animate-pulse">▌</span>
                  )}
              </div>
            ))}

            {/* Blinking cursor for current typing line */}
            {currentLineIndex < introLines.length &&
              displayedLines.length === currentLineIndex && (
                <div className="text-[#00ff00]">
                  <span className="animate-pulse">▌</span>
                </div>
              )}
          </div>

          {/* Enter button */}
          {showButton && (
            <div className="mt-12 flex flex-col items-center gap-4 animate-fade-in">
              <button
                type="button"
                onClick={handleEnter}
                onMouseEnter={() => setButtonHovered(true)}
                onMouseLeave={() => setButtonHovered(false)}
                className="group relative px-8 py-4 text-lg sm:text-xl font-mono font-bold text-[#00ff00] border-2 border-[#00ff00] rounded-lg transition-all duration-300 hover:bg-[#00ff00] hover:text-[#0d1117] hover:shadow-[0_0_30px_rgba(0,255,0,0.5)]"
                style={{
                  textShadow: buttonHovered
                    ? "none"
                    : "0 0 10px rgba(0, 255, 0, 0.8)",
                  boxShadow: "0 0 20px rgba(0, 255, 0, 0.3)",
                }}
              >
                <span className="flex items-center gap-2">
                  <span>&gt;</span>
                  <span>飛び込む</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-2">
                    →
                  </span>
                </span>
              </button>

              <p className="text-[#8b949e] text-sm font-mono animate-pulse">
                Press Enter or click to continue
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Skip hint */}
      <div className="fixed bottom-4 right-4 text-[#8b949e] text-xs font-mono opacity-50">
        Press ESC to skip
      </div>

      {/* Decorative elements */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ff00] to-transparent opacity-50" />
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00ff00] to-transparent opacity-50" />
    </div>
  );
}
