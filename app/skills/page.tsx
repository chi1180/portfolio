import Footer from "@/components/footer";
import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";

export default function SkillPage() {
  return (
    <div className="w-full">
      <Header />

      <main className="p-12 flex flex-col gap-44">
        {/* Certifications */}
        <fieldset>
          <legend className="ml-24 px-12 py-22 text-9xl">Certifications</legend>
          <div className="h-screen sm:max-h-[600] py-12 flex gap-24 justify-center">
            {[
              {
                name: ["Responsive", "web", "Design"],
                url: "https://www.freecodecamp.org/japanese/certification/fccc270c309-fe95-47fe-aeed-839c2c79fce1/responsive-web-design",
                img: "/Data report-amico.svg",
              },
              {
                name: ["JavaScript Algorithms", "and", "Data Structures"],
                url: "https://www.freecodecamp.org/japanese/certification/fccc270c309-fe95-47fe-aeed-839c2c79fce1/javascript-algorithms-and-data-structures",
                img: "/Website Creator-bro.svg",
              },
            ].map((certification) => (
              <Link
                href={certification.url}
                target="_blank"
                key={certification.name.at(0)}
                className="h-full aspect-square rounded-lg shadow-md p-6 flex flex-col items-center justify-center border-l-8 border-l-(--accent) border border-(--primary) hover:shadow-lg hover:-translate-4 duration-300 ease-in transition-all"
              >
                <h3 className="flex flex-col items-center gap-12">
                  {certification.name.map((name) => (
                    <span className="block text-6xl" key={name}>
                      {name}
                    </span>
                  ))}
                </h3>
                <div className="w-2/3 aspect-square relative opacity-60 -m-32 -z-0">
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
          <legend className="w-full text-center py-22 text-9xl">
            &lt; Languages /&gt;
          </legend>
          <div className="px-24 py-12 flex flex-wrap gap-24 justify-center">
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
              <div key={name} className="flex flex-col gap-6">
                <h3 className="text-4xl text-center w-full min-w-[400]">
                  {name}
                </h3>
                <div className="bg-(--accent) h-0.5" />
                <div className="flex flex-wrap gap-4 p-4">
                  {tags.map((tag, index) => (
                    <div
                      key={index.toString().concat(tag)}
                      className="bg-(--accent) px-4 py-2 text-2xl rounded-full text-white"
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
