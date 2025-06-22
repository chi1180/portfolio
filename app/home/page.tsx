import Footer from "@/components/footer";
import Header from "@/components/header";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      <Header />

      <main className="w-full lg:max-w-[1400px] lg:mx-auto lg:h-[calc(100vh-6rem)] h-auto lg:p-8 p-4 flex flex-col lg:flex-row lg:items-center lg-gap-0">
        {/* Left contents */}
        <div className="w-full py-24 lg:py-0">
          <h3 className="text-6xl pb-6">Hi, I'm Chi1180</h3>
          <h1 className="text-8xl">A little coder_</h1>
          <h3 className="text-4xl pt-8 pb-22">
            Write code for Web, Desktop and Mobile...
          </h3>

          <div className="flex gap-8 *:text-3xl *:font-medium *:px-7 *:py-5 *:pb-6 *:rounded-md  *:hover:shadow-md">
            <Link href="/skills" className="text-white bg-(--accent)">
              See skill set
            </Link>
            <Link
              href="/projects"
              className="text-(--accent) bg-(--accent-secondary)"
            >
              See projects
            </Link>
          </div>
        </div>

        {/* Right contents */}
        <div className="h-4/5 aspect-square bg-cover bg-center bg-[url(/top-image.png)]" />
      </main>

      <Footer />
    </div>
  );
}
