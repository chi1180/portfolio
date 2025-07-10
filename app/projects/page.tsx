"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import SwiperComponent from "@/components/swiper";
import Link from "next/link";
import { useEffect, useState } from "react";
import { projectData, type ProjectInfo } from "./data";

export default function ProjectsPage() {
  const [developing_text, setDevelopingText] = useState("🧑‍💻 In developing");
  useEffect(() => {
    const intervalFunc = setInterval(() => {
      setDevelopingText((prev) => {
        if (prev.at(-1) === "_") {
          return prev.slice(0, prev.length - 1);
        }
        return prev.concat("_");
      });
    }, 500);

    return () => clearInterval(intervalFunc);
  }, []);

  const projectTitle = (title: string, sub: string, link?: string) => {
    return (
      <div className="px-8 border-l-8 border-(--accent)">
        {link?.trim() !== "" ? (
          <Link
            href={link || ""}
            className="w-fit inline-block"
            target="_blank"
          >
            <h1 className="text-6xl pb-4 hover:text-(--accent) transition-all duration-300 ease-in w-fit">
              {title}
            </h1>
          </Link>
        ) : (
          <h1 className="text-6xl pb-4">{title}</h1>
        )}
        <p className="text-xl">{sub}</p>
      </div>
    );
  };

  const tagList = (tags: Array<string>) => {
    return (
      <div className="flex gap-4 flex-wrap my-4 mb-2">
        {tags.map((tag, index) => (
          <span
            className="py-2 px-5 rounded-full bg-(--accent) text-white font-medium"
            key={index.toString().concat(tag)}
          >
            {tag}
          </span>
        ))}
      </div>
    );
  };

  const timeData = (date: Array<string>) => {
    return (
      <em className="px-2 text-xl inline-block mt-2 bg-linear-0 from-(--accent) from-10% to-(--accent-secondary) to-10% mb-12">
        {date.length === 1
          ? "Since ".concat(date.at(0) || "")
          : date.join(" ~ ")}
      </em>
    );
  };

  const description = (text: string) => {
    return <p className="max-w-[800] text-3xl leading-12">{text}</p>;
  };

  function projectViewFormator(project_info: ProjectInfo) {
    return (
      <div className="mx-24">
        {projectTitle(
          project_info.title_contents.title,
          project_info.title_contents.sub,
          project_info.title_contents.link,
        )}
        {tagList(project_info.tag_list)}
        {timeData(project_info.time)}
        {project_info.type !== "mini-project" && (
          <>
            {description(project_info.description || "")}

            <div className="w-[calc(100vw-64rem)] py-24 mx-auto">
              <SwiperComponent pictures={project_info.pictures || [""]} />
            </div>
          </>
        )}
      </div>
    );
  }

  const project_data = projectData;

  return (
    <div className="w-full">
      <Header />
      <main>
        {/* In developing  */}
        <fieldset>
          <legend className="w-full py-22 pl-32 text-9xl">
            {developing_text}
          </legend>

          {project_data
            .filter((d) => d.type === "developing")
            .map((info) => (
              <div key={info.title_contents.title}>
                {projectViewFormator(info)}
              </div>
            ))}
        </fieldset>

        {/* Developed  */}
        <fieldset>
          <legend className="w-full py-22 pl-32 text-9xl">🚀 Developed</legend>

          {project_data
            .filter((d) => d.type === "developed")
            .reverse()
            .map((info) => (
              <div key={info.title_contents.title}>
                {projectViewFormator(info)}
              </div>
            ))}
        </fieldset>

        {/* List of mini-projects */}
        <fieldset>
          <legend className="w-full py-22 pl-32 text-9xl">
            🧩 Mini-projects
          </legend>

          {project_data
            .filter((d) => d.type === "mini-project")
            .reverse()
            .map((info) => (
              <div key={info.title_contents.title}>
                {projectViewFormator(info)}
              </div>
            ))}
        </fieldset>
      </main>

      <Footer />
    </div>
  );
}
