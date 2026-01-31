"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";
import MinimalSwitcher from "./themes/MinimalSwitcher";

const NAV_LINKS = [
  { name: "Home", href: "#hero" },
  { name: "Skills", href: "#skills" },
  { name: "Certifications", href: "#certifications" },
  { name: "Contact", href: "#contacts" },
];

export default function Header() {
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [navExpanded, setNavExpanded] = useState(false);

  useEffect(() => {
    const scrollHandler = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  // Close mobile nav when clicking a link
  const handleNavClick = () => {
    setNavExpanded(false);
  };

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled ? "py-3" : "py-4 sm:py-5"}
        ${theme === "terminal" ? "font-mono" : ""}
      `}
      style={{
        background: scrolled ? "var(--background)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        boxShadow: scrolled ? "0 2px 16px var(--shadow)" : "none",
      }}
    >
      <div className="container mx-auto px-4 sm:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#hero"
          className={`
            text-xl sm:text-2xl font-bold transition-all duration-300 hover:opacity-80
          `}
          style={{
            color: "var(--foreground)",
          }}
        >
          {theme === "terminal" ? "> Chi1180" : "Chi1180"}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <ul className="flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`
                    text-sm font-medium transition-all duration-200
                    hover:opacity-70
                    ${theme === "terminal" ? "font-mono" : ""}
                  `}
                  style={{
                    color: "var(--foreground)",
                  }}
                >
                  {theme === "terminal"
                    ? `/${link.name.toLowerCase()}`
                    : link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Theme Switcher - Only show Minimal switcher in header */}
          {theme === "minimal" && <MinimalSwitcher />}
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          {/* Mobile Theme Switcher (minimal only) */}
          {theme === "minimal" && <MinimalSwitcher />}

          <button
            className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
            onClick={() => setNavExpanded(!navExpanded)}
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={navExpanded}
          >
            <span
              className={`
                w-6 h-0.5 transition-all duration-300 origin-center
                ${navExpanded ? "rotate-45 translate-y-2" : ""}
              `}
              style={{ background: "var(--foreground)" }}
            />
            <span
              className={`
                w-6 h-0.5 transition-all duration-300
                ${navExpanded ? "opacity-0 scale-0" : "opacity-100"}
              `}
              style={{ background: "var(--foreground)" }}
            />
            <span
              className={`
                w-6 h-0.5 transition-all duration-300 origin-center
                ${navExpanded ? "-rotate-45 -translate-y-2" : ""}
              `}
              style={{ background: "var(--foreground)" }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300
          ${navExpanded ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
        `}
        style={{
          background: "var(--background)",
          borderBottom: navExpanded ? "1px solid var(--border)" : "none",
        }}
      >
        <ul className="container mx-auto px-4 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                onClick={handleNavClick}
                className={`
                  block py-2 text-base font-medium transition-opacity duration-200
                  hover:opacity-70
                  ${theme === "terminal" ? "font-mono" : ""}
                `}
                style={{ color: "var(--foreground)" }}
              >
                {theme === "terminal"
                  ? `> ${link.name.toLowerCase()}`
                  : link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
