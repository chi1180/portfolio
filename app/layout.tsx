import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chi1180",
  description: "A portfolio website of Chi1180",
  keywords: ["portfolio", "website", "Chi1180"],
  verification: {
    google: "dVRTS_9lJ9SL6_YPh2Il8afiUi0v_3EbbHesLSBdDeo",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${notoSansJP.variable} antialiased`}>{children}</body>
    </html>
  );
}
