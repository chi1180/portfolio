"use client";

import Image from "next/image";
import { useTheme } from "./ThemeProvider";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className={`
        py-12 sm:py-16 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10
        ${theme === "terminal" ? "font-mono" : ""}
      `}
      style={{
        background: "var(--background)",
        borderTop: "1px solid var(--border)",
      }}
    >
      {/* Logo */}
      <div
        className={`
          relative w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden
          ${theme === "terminal" ? "rounded-none" : ""}
        `}
        style={{
          boxShadow: "0 2px 12px var(--shadow)",
          border: "1px solid var(--border)",
        }}
      >
        <Image
          src="/icon.png"
          alt="Chi1180 Logo"
          fill
          className="object-cover"
        />
      </div>

      {/* Text content */}
      <div className="flex flex-col gap-1 items-center sm:items-end text-center sm:text-right">
        <h2
          className={`text-lg sm:text-xl font-semibold`}
          style={{ color: "var(--foreground)" }}
        >
          {theme === "terminal" ? "> Chi1180 portfolio_" : "Chi1180 portfolio_"}
        </h2>

        <p className="text-sm" style={{ color: "var(--foreground-secondary)" }}>
          {theme === "terminal" ? "// 2025" : "© 2025 Chi1180"}
        </p>
      </div>
    </footer>
  );
}
