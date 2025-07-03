"use client";

import Footer from "@/components/footer";
import Header from "@/components/header";
import SwiperComponent from "@/components/swiper";
import { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [developing_text, setDevelopingText] = useState("In developing");
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

  const projectTitle = (title: string, sub: string) => {
    return (
      <div className="px-8 border-l-8 border-(--accent)">
        <h1 className="text-6xl pb-4">{title}</h1>
        <p className="text-xl">{sub}</p>
      </div>
    );
  };

  const tagList = (tags: Array<string>) => {
    return (
      <div className="flex gap-4 flex-wrap my-8 mb-4">
        {tags.map((tag, index) => (
          <span
            className="py-4 px-6 rounded-full bg-(--accent) text-white font-medium"
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
      <em className="px-2 text-xl inline-block mt-2 bg-linear-0 from-(--accent) from-10% to-(--accent-secondary) to-10%">
        {date.length === 1
          ? "Since ".concat(date.at(0) || "")
          : date.join(" ~ ")}
      </em>
    );
  };

  const description = (text: string) => {
    return <p className="max-w-[800] text-3xl leading-12 mt-12">{text}</p>;
  };

  return (
    <div className="w-full">
      <Header />
      <main>
        {/* In developing  */}
        <fieldset>
          <legend className="w-full py-22 pl-32 text-9xl">
            {developing_text}
          </legend>

          <div className="mx-24">
            {projectTitle(
              "LINEnglish",
              "A web application for learning English more easily to continue :)",
            )}

            {tagList(["web", "next.js", "mongo_db", "line"])}

            {timeData(["2025 May 04"])}

            {description(`LINEnglish is a web application that helps users learn English
            more easily. It provides a variety of features such as vocabulary
            quizzes, grammar exercises, and conversation practice. The
            application is designed to be user-friendly and accessible to all
            levels of English learners.`)}

            <div className="w-[calc(100vw-64rem)] py-24 mx-auto">
              <SwiperComponent
                pictures={[
                  "/projects/linenglish/lp.png",
                  "/projects/linenglish/dashboard.png",
                  "/projects/linenglish/vocab.png",
                ]}
              />
            </div>
          </div>
        </fieldset>
      </main>

      <Footer />
    </div>
  );
}
