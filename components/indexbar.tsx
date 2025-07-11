"use client";

import { useState } from "react";
import type { indexbarProps } from "./type";
import Link from "next/link";

export default function IndexBar({ contents }: indexbarProps) {
  const [expand, setExpand] = useState(false);

  return (
    <div className="w-full h-12 sticky top-28 flex justify-end pr-8">
      <div className="w-fit min-w-[180]">
        <h2
          className={`text-3xl py-2 pb-3 text-center bg-(--accent) rounded-t-md text-white cursor-pointer transition-all duration-300 ease-in ${expand ? "" : "rounded-md"} select-none`}
          onKeyUp={() => {}}
          onClick={() => setExpand((pre) => !pre)}
        >
          = INDEX {expand ? "_" : "/"}
        </h2>
        <nav
          className={`px-3 py-6 rounded-md shadow-md max-h-screen overflow-scroll bg-white ${expand ? "block h-fit" : "hidden h-0"}`}
        >
          {["In developing", "Developed", "Mini project"].map(
            (project, index) => (
              <div key={project}>
                <h3 className={`text-3xl pb-2 ${index ? "pt-6" : ""}`}>
                  {project}
                </h3>
                <ol className="pl-2 flex flex-col gap-1">
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
