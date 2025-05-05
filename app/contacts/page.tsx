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

      <main className="w-full lg:h-[calc(100vh-6rem)] h-auto lg:p-8 p-4 flex flex-col lg:flex-row lg:items-center gap-24 lg:gap-0">
        {/* Left content */}
        <div className="w-full h-full">
          <ol className="w-full h-full p-8 flex flex-col gap-10 lg:gap-24 items-center justify-center">
            {Object.entries(SNS).map(([name, url]) => {
              return (
                <li key={`${name}'s link`}>
                  <Link
                    href={url}
                    target="_blank"
                    className="block w-64 py-6 pb-7 rounded-full bg-(--accent-secondary) text-2xl md:text-4xl text-center text-(--accent) hover:shadow-md"
                  >
                    {name}
                  </Link>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Right content */}
        <div className="w-full h-full *:h-full *:flex *:flex-col *:gap-18">
          <form
            action=""
            onSubmit={(event) => {
              event.preventDefault();

              const textArea = document.getElementById(
                "text-input",
              ) as HTMLTextAreaElement;
              if (textArea) {
                submitHandler(textArea.value);
                textArea.value = "Thank you for your message :)";

                // Disable resend action.
                textArea.readOnly = true;
                const submitBtn = document.getElementById(
                  "submit-btn",
                ) as HTMLButtonElement;
                submitBtn.disabled = true;
                submitBtn.classList.add("opacity-50");
              }
            }}
          >
            <textarea
              className="h-full w-full p-4 resize-none rounded-lg border-2 border-(--primary) shadow-md text-xl lg:text-2xl focus:outline-0 min-h-96"
              id="text-input"
            />

            <div className="w-full flex">
              <span className="w-full" />
              <button
                type="submit"
                className="text-2xl md:text-3xl font-medium px-7 py-5 pb-6 rounded-md  hover:shadow-md text-(--accent) bg-(--accent-secondary)"
                id="submit-btn"
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
