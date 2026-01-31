"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/components/ThemeProvider";

interface Certification {
  name: string[];
  url: string;
  img: string;
}

const certifications: Certification[] = [
  {
    name: ["Responsive", "Web", "Design"],
    url: "https://www.freecodecamp.org/japanese/certification/fccc270c309-fe95-47fe-aeed-839c2c79fce1/responsive-web-design",
    img: "/Website Creator-bro.svg",
  },
  {
    name: ["JavaScript Algorithms", "and", "Data Structures"],
    url: "https://www.freecodecamp.org/japanese/certification/fccc270c309-fe95-47fe-aeed-839c2c79fce1/javascript-algorithms-and-data-structures",
    img: "/Data report-amico.svg",
  },
];

export default function CertificationsSection() {
  const { theme } = useTheme();

  return (
    <section id="certifications" className="section min-h-screen py-24">
      <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${
              theme === "terminal" ? "font-mono" : ""
            }`}
            style={{ color: "var(--foreground)" }}
          >
            {theme === "terminal"
              ? "$ cat certifications.txt"
              : theme === "cyber"
                ? "< Certifications />"
                : "Certifications"}
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--foreground-secondary)" }}
          >
            {theme === "terminal"
              ? "// Verified credentials from freeCodeCamp"
              : "Professional certifications and achievements"}
          </p>
        </div>

        {/* Certification Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {certifications.map((certification, index) => (
            <Link
              href={certification.url}
              target="_blank"
              rel="noopener noreferrer"
              key={certification.name[0]}
              className={`
                group relative overflow-hidden p-8 rounded-2xl
                transition-all duration-300 hover:-translate-y-2
                ${theme === "terminal" ? "rounded-none" : ""}
              `}
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border)",
                boxShadow: "0 4px 24px var(--shadow)",
              }}
            >
              {/* Terminal header decoration */}
              {theme === "terminal" && (
                <div
                  className="absolute top-0 left-0 right-0 px-4 py-2 text-xs font-mono border-b"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--foreground-secondary)",
                    background: "var(--background-secondary)",
                  }}
                >
                  cert_{index}.md
                </div>
              )}

              {/* Content */}
              <div
                className={`relative z-10 flex flex-col items-center text-center ${
                  theme === "terminal" ? "pt-8" : ""
                }`}
              >
                {/* Certification Image */}
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 mb-6 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  <Image
                    src={certification.img}
                    alt={`${certification.name.join(" ")} certification`}
                    fill
                    className="object-contain"
                    style={{
                      filter:
                        theme === "cyber"
                          ? "hue-rotate(280deg) saturate(1.3) brightness(1.1)"
                          : theme === "terminal"
                            ? "hue-rotate(90deg) saturate(1.5) brightness(1.2)"
                            : "none",
                    }}
                  />
                </div>

                {/* Certification Name */}
                <div className="mb-4">
                  {certification.name.map((namePart, i) => (
                    <span
                      key={namePart}
                      className={`
                        block text-xl sm:text-2xl font-semibold leading-tight
                        ${theme === "terminal" ? "font-mono" : ""}
                      `}
                      style={{ color: "var(--foreground)" }}
                    >
                      {theme === "terminal" && i === 0 ? "# " : ""}
                      {namePart}
                    </span>
                  ))}
                </div>

                {/* View Certificate Link */}
                <div
                  className="flex items-center gap-2 text-sm font-medium transition-all duration-300 group-hover:gap-3"
                  style={{ color: "var(--accent)" }}
                >
                  {theme === "terminal" ? (
                    <span className="font-mono">
                      {">"} view --cert
                      <span className="animate-pulse">_</span>
                    </span>
                  ) : (
                    <>
                      <span>View Certificate</span>
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <title>Arrow right</title>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </>
                  )}
                </div>
              </div>

              {/* Hover glow effect */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-2xl"
                style={{
                  boxShadow:
                    theme === "cyber"
                      ? "inset 0 0 30px rgba(232, 121, 249, 0.1)"
                      : theme === "terminal"
                        ? "inset 0 0 20px rgba(57, 255, 20, 0.05)"
                        : "none",
                }}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
