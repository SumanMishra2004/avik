import Navbar from "@/components/Navbar";
import ProjectsBento from "@/components/ProjectsBento";
import Footer from "@/components/Footer";
import { sanityFetch } from "@/lib/sanity/client";
import { SITE_SETTINGS_QUERY, NAV_LINKS_QUERY, PROJECTS_QUERY } from "@/lib/sanity/queries";
import type { SanitySiteSettings, SanityNavLink, SanityProject } from "@/types/sanity";

export const revalidate = 3600;

export const metadata = {
  title: "Projects — Avik Kumar Das",
  description: "Research projects and funded initiatives by Dr. Avik Kumar Das.",
};

export default async function ProjectsPage() {
  const [settings, navLinks, projects] = await Promise.all([
    sanityFetch<SanitySiteSettings>(SITE_SETTINGS_QUERY).catch(() => null),
    sanityFetch<SanityNavLink[]>(NAV_LINKS_QUERY).catch(() => []),
    sanityFetch<SanityProject[]>(PROJECTS_QUERY).catch(() => []),
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
          <ProjectsBento projects={projects} />
        </div>
        <Footer personalInfo={footerInfo} navLinks={navLinks} />
      </div>
    </main>
  );
}
