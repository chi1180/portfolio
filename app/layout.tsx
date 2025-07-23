import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio web site of Chi1180",
  description:
    "Here is a portfolio website of Chi1180. He is a little coder and working on coding for web, desktop, and mobile applications. In this website, you can see his projects and skills of Chi1180.",
  keywords: [
    "portfolio",
    "website",
    "Chi1180",
    "web development",
    "design project",
    "Next.js portfolio",
  ],
  verification: {
    google: "dVRTS_9lJ9SL6_YPh2Il8afiUi0v_3EbbHesLSBdDeo",
  },
  openGraph: {
    type: "website",
    url: "https://portfolio-chi1180.vercel.app/",
    title: "Portfolio web site of Chi1180",
    description:
      "Here is a portfolio website of Chi1180. He is a little coder and working on coding for web, desktop, and mobile applications. In this website, you can see his projects and skills of Chi1180.",
    images: [
      {
        url: "https://portfolio-chi1180.vercel.app/_next/image?url=%2Ficon.png&w=1920&q=75",
        width: 512,
        height: 512,
        alt: "Chi1180 portfolio site",
      },
    ],
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
