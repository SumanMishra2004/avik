import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/lib/sanity/client";
import { SITE_SETTINGS_QUERY, NAV_LINKS_QUERY, TEAM_MEMBERS_QUERY } from "@/lib/sanity/queries";
import type { SanitySiteSettings, SanityNavLink, SanityTeamMember } from "@/types/sanity";
import TeamGrid from "@/components/TeamGrid";


export const revalidate = 3600;

export const metadata = {
  title: "Research Team — Avik Kumar Das",
  description: "Meet the research scholars, PhD students, and collaborators working with Dr. Avik Kumar Das at UEM Kolkata and IIEST Shibpur.",
};

export default async function TeamPage() {
  const [settings, navLinks, members] = await Promise.all([
    sanityFetch<SanitySiteSettings>(SITE_SETTINGS_QUERY).catch(() => null),
    sanityFetch<SanityNavLink[]>(NAV_LINKS_QUERY).catch(() => []),
    sanityFetch<SanityTeamMember[]>(TEAM_MEMBERS_QUERY).catch(() => []),
  ]);

  const footerInfo = settings
    ? {
        name: settings.name,
        twitter: settings.twitter,
        twitterUrl: settings.twitterUrl,
        linkedin: settings.linkedin,
        linkedinUrl: settings.linkedinUrl,
        orcid: settings.orcid,
        email: settings.email,
        footerTagline: settings.footerTagline,
        copyrightYear: settings.copyrightYear,
      }
    : undefined;

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative transition-colors duration-300">
      <div className="hairline-grid absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-100" />
      <div className="relative z-10">
        <Navbar navLinks={navLinks} />
        <div className="pt-28 lg:pt-32">
          <TeamGrid members={members} />
        </div>
        <Footer personalInfo={footerInfo} navLinks={navLinks} />
      </div>
    </main>
  );
}