"use client";

import { useEffect, useState } from "react";

/** IMPORTANT: It's need for every page, it's used to set the color of the page */
function setColor() {
  const COLORS = {
    background: "#ffffff",
    accent: "#2563EB",
    "accent-secondary": "#EBF5FE",
    "primary-text": "#1a1a1a",
  };

  for (const [key, value] of Object.entries(COLORS)) {
    document.documentElement.style.setProperty(`--${key}`, value);
  }
}

export default function Header() {
  const LINKS = ["home", "skills", "projects", "contacts"];

  const [pageLocation, setPageLocation] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setPageLocation(window.location.pathname);
      console.log("Page location:", pageLocation);
    }
  }, [pageLocation]);

  useEffect(setColor, []);

  return (
    <header className="w-full h-24 bg-(--background) flex items-center justify-between p-8">
      <h1 className="text-4xl font-medium">Chi1180</h1>
      <nav>
        <ol className="flex gap-10 pr-2">
          {LINKS.map((link) => (
            <li key={link}>
              <a
                href={`/${link}`}
                className={`text-2xl font-medium ${`/${link}` === pageLocation ? "text-(--accent)" : ""}`}
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
