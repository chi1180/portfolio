import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";

export default function SkillPage() {
  return (
    <div className="w-full">
      <Header />

      <main className="p-6 sm:p-12 flex flex-col gap-20 sm:gap-44">
        {/* Certifications */}
        <fieldset>
          <legend className="ml-3 sm:ml-24 sm:px-12 py-11 sm:py-22 text-6xl sm:text-9xl">
            Certifications
          </legend>
          <div className="h-screen sm:max-h-[600] py-6 sm:py-12 flex flex-col sm:flex-row gap-12 sm:gap-24 items-center sm:justify-center">
            {[
              {
                name: ["Responsive", "web", "Design"],
                url: "https://www.freecodecamp.org/japanese/certification/fccc270c309-fe95-47fe-aeed-839c2c79fce1/responsive-web-design",
                img: "/Website Creator-bro.svg",
              },
              {
                name: ["JavaScript Algorithms", "and", "Data Structures"],
                url: "https://www.freecodecamp.org/japanese/certification/fccc270c309-fe95-47fe-aeed-839c2c79fce1/javascript-algorithms-and-data-structures",
                img: "/Data report-amico.svg",
              },
            ].map((certification) => (
              <Link
                href={certification.url}
                target="_blank"
                key={certification.name.at(0)}
                className="w-full sm:h-full sm:w-auto aspect-square rounded-lg shadow-md p-3 sm:p-6 flex flex-col items-center justify-center border-l-8 border-l-(--accent) border border-(--primary) hover:shadow-lg hover:-translate-4 duration-300 ease-in transition-all"
              >
                <h3 className="flex flex-col items-center gap-3 sm:gap-6 -mb-16 sm:-mb-32">
                  {certification.name.map((name) => (
                    <span
                      className="block text-3xl sm:text-6xl text-center"
                      key={name}
                    >
                      {name}
                    </span>
                  ))}
                </h3>
                <div className="w-2/3 aspect-square relative opacity-60 -z-0">
                  <Image
                    src={certification.img}
                    alt="Certification Icon"
                    fill
                  />
                </div>
              </Link>
            ))}
          </div>
        </fieldset>

        {/* Languages  */}
        <fieldset>
          <legend className="ml-3 sm:ml-24 sm:px-12 py-11 sm:py-22 text-6xl sm:text-9xl">
            &lt; Languages /&gt;
          </legend>
          <div className="px-4 sm:px-24 py-6 sm:py-12 flex flex-wrap gap-12 sm:gap-24 justify-center">
            {[
              {
                name: "JavaScript❤️",
                tags: ["web", "electron", "react", "node.js"],
              },
              {
                name: "TypeScript",
                tags: ["web", "next.js"],
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
            ].map(({ name, tags }) => (
              <div key={name} className="flex flex-col gap-3 sm:gap-6">
                <h3 className="text-4xl text-center w-full min-w-[400]">
                  {name}
                </h3>
                <div className="bg-(--accent) h-0.5" />
                <div className="flex flex-wrap gap-2 sm:gap-4 p-2 sm:p-4">
                  {tags.map((tag, index) => (
                    <div
                      key={index.toString().concat(tag)}
                      className="bg-(--accent) px-4 py-1 sm:py-2 text-xl sm:text-2xl rounded-full text-white"
                    >
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </fieldset>
      </main>

      <Footer />
    </div>
  );
}
