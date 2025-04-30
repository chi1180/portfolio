"use client";
import Header from "@/components/header";
import { useEffect } from "react";

function setColor() {
  const COLORS = {
    background: "#ffffff",
    accent: "#2563EB",
    "accent-secondary": "#EBF5FE",
    "primary-text": "#1a1a1a",
  };

  for (const [key, value] of Object.entries(COLORS)) {
    document.documentElement.style.setProperty(`--${key}`, value);
  }
}

export default function Home() {
  useEffect(setColor, []);
  return <></>;
}
