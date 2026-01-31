"use client";

import { useTheme } from "@/components/ThemeProvider";
import Link from "next/link";

export default function HeroSection() {
  const { theme } = useTheme();

  return (
    <section
      id="hero"
      className="section min-h-screen flex items-center justify-center relative overflow-hidden pt-24"
    >
      {/* Background effects based on theme */}
      {theme === "cyber" && (
        <>
          {/* Subtle grid background */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(rgba(232, 121, 249, 0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(232, 121, 249, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />
          {/* Gradient orbs */}
          <div className="absolute top-1/4 -left-48 w-96 h-96 bg-[#e879f9] rounded-full opacity-10 blur-[120px]" />
          <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-[#22d3ee] rounded-full opacity-10 blur-[120px]" />
        </>
      )}

      {theme === "terminal" && (
        <>
          {/* Subtle pattern background */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='0' y='30' font-family='monospace' font-size='20' fill='%2339ff14'%3E0%3C/text%3E%3C/svg%3E")`,
              backgroundSize: "40px 40px",
            }}
          />
        </>
      )}

      <div className="container mx-auto px-6 sm:px-8 flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
        {/* Left content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Greeting */}
          <h3
            className={`text-xl sm:text-2xl md:text-3xl mb-4 sm:mb-6 opacity-0 animate-fade-in-up stagger-1 ${
              theme === "terminal" ? "font-mono" : ""
            }`}
            style={{
              color: "var(--foreground-secondary)",
            }}
          >
            {theme === "terminal" ? "> " : ""}
            Hi, I&apos;m Chi1180
          </h3>

          {/* Main title */}
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 opacity-0 animate-fade-in-up stagger-2 leading-tight ${
              theme === "terminal" ? "font-mono" : ""
            }`}
            style={{
              color: "var(--foreground)",
            }}
          >
            A little coder
            <span
              className={`${theme === "terminal" ? "animate-pulse" : ""}`}
              style={{
                color: "var(--accent)",
              }}
            >
              _
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`text-lg sm:text-xl md:text-2xl mb-10 sm:mb-12 opacity-0 animate-fade-in-up stagger-3 ${
              theme === "terminal" ? "font-mono" : ""
            }`}
            style={{
              color: "var(--foreground-secondary)",
            }}
          >
            {theme === "terminal" ? "// " : ""}
            Write code for Web, Desktop and Mobile...
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start opacity-0 animate-fade-in-up stagger-4">
            <Link
              href="#skills"
              className={`btn btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 ${
                theme === "terminal" ? "font-mono" : ""
              }`}
            >
              {theme === "terminal" ? "$ " : ""}
              See skill set
            </Link>
            <Link
              href="https://github.com/chi1180"
              target="_blank"
              rel="noopener noreferrer"
              className={`btn btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 ${
                theme === "terminal" ? "font-mono" : ""
              }`}
            >
              {theme === "terminal" ? "$ " : ""}
              See GitHub
            </Link>
          </div>
        </div>

        {/* Right content - Profile image */}
        <div className="flex-1 flex justify-center lg:justify-end opacity-0 animate-fade-in-right stagger-3">
          <div
            className={`relative w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden ${
              theme === "terminal" ? "rounded-none" : ""
            }`}
            style={{
              boxShadow:
                theme === "cyber"
                  ? "0 0 32px rgba(232, 121, 249, 0.2), 0 8px 32px rgba(0, 0, 0, 0.3)"
                  : theme === "terminal"
                    ? "0 0 24px rgba(57, 255, 20, 0.15)"
                    : "0 16px 48px rgba(0, 0, 0, 0.12)",
              border:
                theme === "terminal"
                  ? "2px solid var(--border)"
                  : theme === "cyber"
                    ? "1px solid var(--border)"
                    : "none",
            }}
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: "url(/top-image.png)",
              }}
            />

            {/* Decorative elements for cyber theme */}
            {theme === "cyber" && (
              <>
                <div className="absolute -top-1 -left-1 w-6 h-6 border-t-2 border-l-2 border-[#22d3ee] opacity-60" />
                <div className="absolute -top-1 -right-1 w-6 h-6 border-t-2 border-r-2 border-[#e879f9] opacity-60" />
                <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-2 border-l-2 border-[#e879f9] opacity-60" />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-2 border-r-2 border-[#22d3ee] opacity-60" />
              </>
            )}

            {/* Terminal decorations */}
            {theme === "terminal" && (
              <div
                className="absolute -top-8 left-0 font-mono text-xs opacity-60"
                style={{ color: "var(--foreground-secondary)" }}
              >
                ┌── profile.png
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 animate-fade-in stagger-5">
        <Link
          href="#skills"
          className="flex flex-col items-center gap-2 transition-colors hover:opacity-80"
          style={{ color: "var(--foreground-secondary)" }}
        >
          <span
            className={`text-sm ${theme === "terminal" ? "font-mono" : ""}`}
          >
            {theme === "terminal" ? "scroll_down()" : "Scroll"}
          </span>
          <svg
            className="w-5 h-5 animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <title>Scroll down</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </Link>
      </div>
    </section>
  );
}
