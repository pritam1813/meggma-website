import type { Metadata } from "next";
import { Syne, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono-jb",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Meggma | Digital Growth & AI Innovation",
  description:
    "Grow your business with Meggma — AI integration, custom software, automation, and next-gen digital solutions.",
  keywords: [
    "AI integration",
    "digital growth",
    "automation",
    "custom ERP",
    "AI avatar",
    "IT services",
  ],
  openGraph: {
    title: "Meggma | Digital Growth & AI Innovation",
    description: "Grow your business with Meggma",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} ${jetbrainsMono.variable}`}
    >
      <body className="noise">{children}</body>
    </html>
  );
}
