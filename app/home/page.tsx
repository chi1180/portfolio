import Header from "@/components/header";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      <Header />

      <main className="w-full h-[calc(100vh-6rem)] p-8 flex">
        {/* Left contents */}
        <div className="w-2/3 h-full">
          <h1 className="text-5xl">I am little coder</h1>
          <h3 className="text-3xl">Write code for Web, Mobile, Desktop...</h3>

          <div className="flex h-12">
            <Link href="/skills">See skill set</Link>
            <Link href="/projects">See projects</Link>
          </div>
        </div>

        {/* Right contents */}
        <div className="w-1/3 aspect-square bg-cover bg-[url(/top-image.png)]" />
      </main>
    </div>
  );
}
