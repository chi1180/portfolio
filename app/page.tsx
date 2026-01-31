"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/components/ThemeProvider";
import Header from "@/components/header";
import Footer from "@/components/footer";
import HeroSection from "@/components/sections/HeroSection";
import SkillsSection from "@/components/sections/SkillsSection";
import CertificationsSection from "@/components/sections/CertificationsSection";
import ContactSection from "@/components/sections/ContactSection";
import CyberSwitcher from "@/components/themes/CyberSwitcher";
import TerminalSwitcher from "@/components/themes/TerminalSwitcher";

export default function Home() {
  const router = useRouter();
  const { theme, isFirstVisit } = useTheme();

  // Redirect to intro page on first visit
  useEffect(() => {
    if (isFirstVisit) {
      router.push("/intro");
    }
  }, [isFirstVisit, router]);

  // Don't render content during first visit redirect
  if (isFirstVisit) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--background)" }}
      >
        <div
          className="text-2xl animate-pulse"
          style={{ color: "var(--foreground)" }}
        >
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        min-h-screen
        ${theme === "cyber" ? "scanlines" : ""}
        ${theme === "terminal" ? "crt" : ""}
      `}
      style={{
        background: "var(--background)",
        color: "var(--foreground)",
      }}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <HeroSection />

        {/* Skills Section */}
        <SkillsSection />

        {/* Certifications Section */}
        <CertificationsSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Theme Switchers - Position based on current theme */}
      {theme === "cyber" && <CyberSwitcher />}
      {theme === "terminal" && <TerminalSwitcher />}

      {/* Minimal theme uses header-integrated switcher, no floating button needed */}
    </div>
  );
}
