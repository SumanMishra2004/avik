import Navbar from "@/components/Navbar";
import PublicationsSection from "@/components/PublicationsSection";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/lib/sanity/client";
import { SITE_SETTINGS_QUERY, NAV_LINKS_QUERY, PUBLICATIONS_QUERY } from "@/lib/sanity/queries";
import type { SanitySiteSettings, SanityNavLink, SanityPublication } from "@/types/sanity";

export const revalidate = 3600;

export const metadata = {
  title: "Publications & Patents — Avik Kumar Das",
  description: "60+ research publications across journals, conferences, patents, and book chapters by Dr. Avik Kumar Das.",
};

export default async function PublicationsPage() {
  const [settings, navLinks, publications] = await Promise.all([
    sanityFetch<SanitySiteSettings>(SITE_SETTINGS_QUERY).catch(() => null),
    sanityFetch<SanityNavLink[]>(NAV_LINKS_QUERY).catch(() => []),
    sanityFetch<SanityPublication[]>(PUBLICATIONS_QUERY).catch(() => []),
  ]);

  const footerInfo = settings ? {
    name: settings.name, twitter: settings.twitter, twitterUrl: settings.twitterUrl,
    linkedin: settings.linkedin, linkedinUrl: settings.linkedinUrl, orcid: settings.orcid,
    email: settings.email, footerTagline: settings.footerTagline, copyrightYear: settings.copyrightYear,
  } : undefined;

  return (
    <main className="min-h-screen bg-[#0C0E13] text-white overflow-x-hidden grain relative">
      <div className="hairline-grid absolute inset-0 z-0 pointer-events-none" />
      <div className="relative z-10">
        <Navbar navLinks={navLinks} />
        <div className="pt-24">
          <PublicationsSection
            publications={publications}
            stats={settings?.publicationsStats}
          />
        </div>
        <Footer personalInfo={footerInfo} navLinks={navLinks} />
      </div>
    </main>
  );
}
