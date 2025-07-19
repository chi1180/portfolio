"use client";

import { useState } from "react";
import type { indexbarProps } from "./type";
import Link from "next/link";

export default function IndexBar({ contents }: indexbarProps) {
  const [expand, setExpand] = useState(false);

  return (
    <div className="w-full h-6 sm:h-12 sticky top-28 flex justify-end pr-4 sm:pr-8 z-10">
      <div className="w-fit min-w-[180]">
        <h2
          className={`text-xl sm:text-3xl py-1 sm:py-2 sm:pb-3 text-center bg-(--accent) rounded-t-md text-white cursor-pointer transition-all duration-300 ease-in ${expand ? "" : "rounded-md"} select-none`}
          onKeyUp={() => {}}
          onClick={() => setExpand((pre) => !pre)}
        >
          = INDEX {expand ? "_" : "/"}
        </h2>
        <nav
          className={`px-1.5 sm:px-3 py-3 sm:py-6 rounded-md shadow-md max-h-screen overflow-scroll bg-white ${expand ? "block h-fit" : "hidden h-0"}`}
        >
          {["In developing", "Developed", "Mini project"].map(
            (project, index) => (
              <div key={project}>
                <h3
                  className={`text-2xl font-bold sm:font-normal sm:text-3xl pb-1 sm:pb-2 ${index ? "pt-3 sm:pt-6" : ""}`}
                >
                  {project}
                </h3>
                <ol className="lp-1 sm:pl-2 flex flex-col gap-0.5 sm:gap-1">
                  {contents
                    .filter(
                      (p) =>
                        p.type === project.toLowerCase().replaceAll(" ", "-"),
                    )
                    .reverse()
                    .map((p) => (
                      <Link
                        key={p.title_contents.title}
                        href={"#".concat(
                          p.title_contents.title
                            .toLowerCase()
                            .replaceAll(" ", "-"),
                        )}
                        onClick={() => setTimeout(() => setExpand(false), 1000)}
                        className="w-fit"
                      >
                        <li className="text-xl hover:text-(--accent)">
                          {p.title_contents.title}
                        </li>
                      </Link>
                    ))}
                </ol>
              </div>
            ),
          )}
        </nav>
      </div>
    </div>
  );
}
