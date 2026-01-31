"use client";

import { useState, useId } from "react";
import { useTheme } from "@/components/ThemeProvider";
import { submitHandler } from "@/lib/contactForm";

const SNS = [
  { name: "GitHub", url: "https://github.com/chi1180", icon: "GH" },
  { name: "Qiita", url: "https://qiita.com/chi1180", icon: "QT" },
  { name: "Lapras", url: "https://lapras.com/public/KYH2X5C", icon: "LP" },
];

export default function ContactSection() {
  const { theme } = useTheme();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const textareaId = useId();
  const emailId = useId();

  const showEmailField = message.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim() === "") {
      alert("Please enter a message 🙁");
      return;
    }

    setIsSending(true);

    try {
      // Include email in submission if provided
      const messageWithEmail = email.trim()
        ? `${message}\n\n---\nReply to: ${email.trim()}`
        : message;
      submitHandler(messageWithEmail);
      setIsSent(true);
      setMessage("Thank you for your message :)");
      setEmail("");
    } catch (error) {
      console.error("Failed to send message:", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      id="contacts"
      className="section min-h-screen py-24"
      style={{
        background: "var(--background-secondary)",
      }}
    >
      <div className="container mx-auto px-4 sm:px-8 max-w-5xl">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 ${
              theme === "terminal" ? "font-mono" : ""
            }`}
            style={{ color: "var(--foreground)" }}
          >
            {theme === "terminal"
              ? "$ contact --connect"
              : theme === "cyber"
                ? "< Contact />"
                : "Get in Touch"}
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--foreground-secondary)" }}
          >
            {theme === "terminal"
              ? "// Establish connection"
              : "Let's connect and create something amazing together"}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Social Links */}
          <div>
            <h3
              className={`text-xl font-semibold mb-6 ${
                theme === "terminal" ? "font-mono" : ""
              }`}
              style={{ color: "var(--foreground)" }}
            >
              {theme === "terminal" ? "> social_links" : "Find me online"}
            </h3>

            <div className="flex flex-col gap-4">
              {SNS.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    group flex items-center gap-4 p-5 rounded-xl transition-all duration-300
                    hover:-translate-y-1
                    ${theme === "terminal" ? "rounded-none" : ""}
                  `}
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--border)",
                    boxShadow: "0 2px 12px var(--shadow)",
                  }}
                >
                  {/* Icon */}
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center text-sm font-bold ${
                      theme === "terminal" ? "rounded-none font-mono" : ""
                    }`}
                    style={{
                      background: "var(--accent-secondary)",
                      color: "var(--accent)",
                    }}
                  >
                    {social.icon}
                  </div>

                  <div className="flex-1">
                    <span
                      className={`text-lg font-medium block ${
                        theme === "terminal" ? "font-mono" : ""
                      }`}
                      style={{ color: "var(--foreground)" }}
                    >
                      {theme === "terminal" ? `> ${social.name}` : social.name}
                    </span>
                    <span
                      className="text-sm"
                      style={{ color: "var(--foreground-secondary)" }}
                    >
                      {social.url.replace("https://", "")}
                    </span>
                  </div>

                  <span
                    className="text-xl opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1"
                    style={{ color: "var(--accent)" }}
                  >
                    →
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div
            className={`p-6 sm:p-8 rounded-xl ${
              theme === "terminal" ? "rounded-none" : ""
            }`}
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              boxShadow: "0 4px 24px var(--shadow)",
            }}
          >
            <h3
              className={`text-xl font-semibold mb-6 ${
                theme === "terminal" ? "font-mono" : ""
              }`}
              style={{ color: "var(--foreground)" }}
            >
              {theme === "terminal" ? "> send_message" : "Send a message"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor={textareaId}
                  className={`block text-sm font-medium mb-2 ${
                    theme === "terminal" ? "font-mono" : ""
                  }`}
                  style={{ color: "var(--foreground-secondary)" }}
                >
                  {theme === "terminal" ? "message_content:" : "Your Message"}
                </label>
                <textarea
                  id={textareaId}
                  value={message}
                  onChange={(e) => !isSent && setMessage(e.target.value)}
                  placeholder={
                    theme === "terminal"
                      ? "// Enter your message here..."
                      : "Tell me about your project or just say hi! 👋"
                  }
                  rows={5}
                  disabled={isSent}
                  className={`w-full p-4 rounded-lg resize-none transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
                    theme === "terminal" ? "rounded-none font-mono" : ""
                  }`}
                  style={{
                    background: "var(--background)",
                    color: "var(--foreground)",
                    border: "1px solid var(--border)",
                    opacity: isSent ? 0.7 : 1,
                  }}
                />
              </div>

              {/* Email Field - Shows when user types a message */}
              {showEmailField && (
                <div
                  className="transition-all duration-300 ease-in-out"
                  style={{
                    opacity: showEmailField ? 1 : 0,
                    transform: showEmailField
                      ? "translateY(0)"
                      : "translateY(-10px)",
                  }}
                >
                  <label
                    htmlFor={emailId}
                    className={`block text-sm font-medium mb-2 ${
                      theme === "terminal" ? "font-mono" : ""
                    }`}
                    style={{ color: "var(--foreground-secondary)" }}
                  >
                    {theme === "terminal" ? "reply_address:" : "Your Email"}
                    <span
                      className="ml-2 text-xs"
                      style={{
                        color: "var(--foreground-secondary)",
                        opacity: 0.7,
                      }}
                    >
                      {theme === "terminal"
                        ? "// optional: if response needed"
                        : "(optional - if you'd like a reply)"}
                    </span>
                  </label>
                  <input
                    id={emailId}
                    type="email"
                    value={email}
                    onChange={(e) => !isSent && setEmail(e.target.value)}
                    placeholder={
                      theme === "terminal"
                        ? "// your@email.address"
                        : "your@email.com"
                    }
                    disabled={isSent}
                    className={`w-full p-4 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] ${
                      theme === "terminal" ? "rounded-none font-mono" : ""
                    }`}
                    style={{
                      background: "var(--background)",
                      color: "var(--foreground)",
                      border: "1px solid var(--border)",
                      opacity: isSent ? 0.7 : 1,
                    }}
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={isSent || isSending}
                className={`
                  w-full py-4 rounded-lg font-semibold text-base transition-all duration-300
                  ${theme === "terminal" ? "font-mono uppercase rounded-none" : ""}
                  ${isSent ? "opacity-50 cursor-not-allowed" : "hover:-translate-y-1"}
                `}
                style={{
                  background: isSent
                    ? "var(--foreground-secondary)"
                    : "var(--accent)",
                  color: "#ffffff",
                  boxShadow: !isSent ? "0 4px 16px var(--shadow)" : "none",
                }}
              >
                {isSending
                  ? theme === "terminal"
                    ? "> Sending..."
                    : "Sending..."
                  : isSent
                    ? theme === "terminal"
                      ? "> Message_sent ✓"
                      : "Message Sent ✓"
                    : theme === "terminal"
                      ? "> Execute send"
                      : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
