import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avik Kumar Das — Associate Professor & AI-ML Researcher",
  description:
    "Portfolio of Dr. Avik Kumar Das — Associate Professor at UEM Kolkata, PhD researcher at IIEST Shibpur. Expert in Wireless Communication, Underwater Acoustics, LLMs, and IoT. 60+ publications, 14 patents, PRISM and MeitY funded researcher.",
  keywords: [
    "Avik Kumar Das",
    "Associate Professor",
    "AI-ML Researcher",
    "Signal Processing",
    "Underwater Acoustic Communication",
    "OTFS",
    "MIMO",
    "IoT",
    "UEM Kolkata",
    "IIEST Shibpur",
    "Patents",
    "Research",
  ],
  authors: [{ name: "Avik Kumar Das" }],
  creator: "Avik Kumar Das",
  openGraph: {
    title: "Avik Kumar Das — Associate Professor & AI-ML Researcher",
    description:
      "Portfolio of Dr. Avik Kumar Das — 60+ publications, 14 patents, PRISM and MeitY funded researcher.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avik Kumar Das — Associate Professor & AI-ML Researcher",
    description:
      "Portfolio of Dr. Avik Kumar Das — 60+ publications, 14 patents, PRISM and MeitY funded researcher.",
    creator: "@005avik_das",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-full bg-[#0C0E13] text-white hf-body">
        {children}
      </body>
    </html>
  );
}
