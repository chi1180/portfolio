"use client";

import Header from "@/components/header";
import Link from "next/link";
import { submitHandler } from "@/lib/contactForm";

export default function ContactsPage() {
  const SNS = {
    GitHub: "https://github.com/chi1180",
    Qiita: "https://qiita.com/chi1180",
    Lapras: "https://lapras.com/public/KYH2X5C",
  };
  return (
    <div className="w-full">
      <Header />

      <main className="w-full lg:max-w-[1400px] lg:mx-auto lg:h-[calc(100vh-6rem)] h-auto lg:p-8 p-4 flex flex-col lg:flex-row lg:items-center lg-gap-0">
        {/* Right content */}
        <div>
          <ol>
            {Object.entries(SNS).map(([name, url]) => {
              return (
                <li key={`${name}'s link`}>
                  <Link href={url} target="_blank">
                    {name}
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Left content */}
        <div className="flex flex-col gap-24">
          <form
            action=""
            onSubmit={(data) => {
              data.preventDefault();
              submitHandler(data.target);
            }}
          >
            <textarea className="resize-none rounded-lg shadow-md" />

            <div className="w-full flex">
              <span />
              <button
                type="submit"
                className="text-3xl font-medium px-7 py-5 pb-6 rounded-md  hover:shadow-md text-(--accent) bg-(--accent-secondary)"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
