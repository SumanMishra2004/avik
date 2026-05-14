import type { Metadata } from "next";
import "./globals.css";
import { sanityFetch } from "@/lib/sanity/client";
import { SEO_QUERY } from "@/lib/sanity/queries";

// Fetch SEO from CMS — fallback to hardcoded values during migration
async function getSeoMeta() {
  try {
    return await sanityFetch<{
      seoTitle?: string;
      seoDescription?: string;
      seoKeywords?: string[];
      seoImage?: { asset?: { url: string } };
      name?: string;
      twitter?: string;
    }>(SEO_QUERY);
  } catch {
    return null;
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMeta();

  const title = seo?.seoTitle ?? "Avik Kumar Das — Associate Professor & AI-ML Researcher";
  const description = seo?.seoDescription ??
    "Portfolio of Dr. Avik Kumar Das — Associate Professor at UEM Kolkata, PhD researcher at IIEST Shibpur. Expert in Wireless Communication, Underwater Acoustics, LLMs, and IoT. 60+ publications, 14 patents.";
  const keywords = seo?.seoKeywords ?? [
    "Avik Kumar Das", "Associate Professor", "AI-ML Researcher",
    "Signal Processing", "Underwater Acoustic Communication", "OTFS",
    "MIMO", "IoT", "UEM Kolkata", "IIEST Shibpur", "Patents", "Research",
  ];

  return {
    title,
    description,
    keywords,
    authors: [{ name: seo?.name ?? "Avik Kumar Das" }],
    creator: seo?.name ?? "Avik Kumar Das",
    openGraph: {
      title,
      description,
      type: "website",
      locale: "en_IN",
      ...(seo?.seoImage?.asset?.url && { images: [{ url: seo.seoImage.asset.url }] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: seo?.twitter ?? "@005avik_das",
      ...(seo?.seoImage?.asset?.url && { images: [seo.seoImage.asset.url] }),
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full bg-[#0C0E13] text-white hf-body">
        {children}
      </body>
    </html>
  );
}
