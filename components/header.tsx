"use client";

import { useEffect, useState } from "react";

/** IMPORTANT: It's need for every page, it's used to set the color of the page */
function setColor() {
  const COLORS = {
    background: "#ffffff",
    accent: "#2563EB",
    "accent-secondary": "#EBF5FE",
    "primary-text": "#1a1a1a",
    primary: "#eaeaea",
  };

  for (const [key, value] of Object.entries(COLORS)) {
    document.documentElement.style.setProperty(`--${key}`, value);
  }
}

export default function Header() {
  const LINKS = ["home", "skills", "projects", "contacts"];
  const [pageLocation, setPageLocation] = useState("");

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // For SSR
    if (typeof window !== "undefined") {
      setColor();
      setPageLocation(window.location.pathname);

      const scrollHandler = () => {
        const scrolledY = window.scrollY;
        setScrolled(scrolledY > 0);
      };
      window.addEventListener("scroll", scrollHandler);
      return () => window.removeEventListener("scroll", scrollHandler);
    }
  }, []);

  const [navExpanded, setNavExpanded] = useState(false);

  return (
    <header
      className={`w-full h-24 bg-(--background) flex items-center justify-between p-8 sticky top-0 z-50 ${scrolled ? "shadow-md" : ""}`}
    >
      <h1 className="text-4xl font-medium">Chi1180</h1>
      <nav className="h-full">
        <button
          className="h-full aspect-square relative cursor-pointer hover:shadow-md md:hidden *:w-full *:h-0.5 *:bg-(--primary-text) *:transition-all *:duration-300 *:absolute"
          onClick={() => setNavExpanded(!navExpanded)}
          type="button"
        >
          <span
            className={navExpanded ? "top-1/3 rotate-45" : "top-0 rotate-0"}
          />
          <span className={navExpanded ? "top-1/3 -rotate-45" : "top-1/2"} />
        </button>
        <ol
          className={`${navExpanded ? "px-2 py-4 rounded-md shadow-md bg-(--background) w-32" : "hidden"} flex h-auto translate-y-24 flex-col gap-10 md:inline-flex md:flex-row md:pr-2 md:translate-y-0`}
        >
          {LINKS.map((link) => (
            <li key={link}>
              <a
                href={`/${link}`}
                className={`mb-4 text-2xl font-medium ${`/${link}` === pageLocation ? "text-(--accent)" : ""}`}
              >
                {link.at(0)?.toUpperCase() + link.slice(1)}
              </a>
            </li>
          ))}
        </ol>
      </nav>
    </header>
  );
}
