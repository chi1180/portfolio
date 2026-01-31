"use client";

import { useTheme } from "@/components/ThemeProvider";

interface Skill {
  name: string;
  tags: string[];
  favorite?: boolean;
}

const skills: Skill[] = [
  {
    name: "JavaScript",
    tags: ["web", "electron", "react", "node.js"],
  },
  {
    name: "TypeScript",
    tags: ["web", "next.js"],
    favorite: true,
  },
  {
    name: "Python",
    tags: ["web", "machine learning", "web scraping"],
  },
  {
    name: "HTML",
    tags: ["web", "HTML5"],
  },
  {
    name: "CSS",
    tags: ["web", "SCSS", "Tailwind", "Material UI"],
  },
];

export default function SkillsSection() {
  const { theme } = useTheme();

  return (
    <section
      id="skills"
      className="section min-h-screen py-24 px-4 sm:px-8 lg:px-16"
      style={{
        background: "var(--background-secondary)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${
              theme === "terminal" ? "font-mono" : ""
            }`}
            style={{
              color: "var(--foreground)",
            }}
          >
            {theme === "terminal"
              ? "$ cat languages.txt"
              : theme === "cyber"
                ? "< Languages />"
                : "Languages & Skills"}
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--foreground-secondary)" }}
          >
            {theme === "terminal"
              ? "// Technologies I work with"
              : "Technologies and frameworks I use to build amazing things"}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.name}
              className={`p-6 rounded-xl transition-all duration-300 hover:-translate-y-1 ${
                theme === "terminal" ? "rounded-none" : ""
              }`}
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border)",
                boxShadow: "0 4px 16px var(--shadow)",
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Skill Name */}
              <div className="flex items-center gap-3 mb-4">
                <h3
                  className={`text-xl sm:text-2xl font-semibold ${
                    theme === "terminal" ? "font-mono" : ""
                  }`}
                  style={{ color: "var(--foreground)" }}
                >
                  {theme === "terminal" ? `> ${skill.name}` : skill.name}
                </h3>
                {skill.favorite && (
                  <span className="text-xl" title="Favorite">
                    ❤️
                  </span>
                )}
              </div>

              {/* Divider */}
              <div
                className="h-0.5 mb-5 rounded-full"
                style={{
                  background:
                    theme === "cyber"
                      ? "linear-gradient(90deg, var(--neon-pink), var(--neon-cyan))"
                      : "var(--accent)",
                  opacity: theme === "cyber" ? 0.6 : 0.3,
                }}
              />

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {skill.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`px-3 py-1.5 text-sm rounded-full transition-all duration-200 ${
                      theme === "terminal" ? "font-mono rounded-none" : ""
                    }`}
                    style={{
                      background:
                        theme === "terminal"
                          ? "var(--accent-secondary)"
                          : theme === "cyber"
                            ? "var(--accent-secondary)"
                            : "var(--accent-secondary)",
                      color: "var(--accent)",
                      border:
                        theme === "terminal"
                          ? "1px solid var(--border)"
                          : "none",
                    }}
                  >
                    {theme === "terminal" ? `[${tag}]` : tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
