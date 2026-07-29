import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ResearchGrid from "@/components/ResearchGrid";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import AwardsShelf from "@/components/AwardsShelf";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

import { sanityFetch } from "@/lib/sanity/client";
import { HOME_PAGE_QUERY } from "@/lib/sanity/queries";
import type { HomePageData } from "@/types/sanity";

// Fallback to lib/data.ts values while CMS is being seeded
import {
  personalInfo as fallbackPersonal,
  heroStats as fallbackHeroStats,
  researchInterests as fallbackResearch,
  experience as fallbackExperience,
  education as fallbackEducation,
  awards as fallbackAwards,
  technicalSkills as fallbackTechnicalSkills,
  languages as fallbackLanguages,
  toolChips as fallbackToolChips,
  identityBadges as fallbackBadges,
  navLinks as fallbackNavLinks,
} from "@/lib/data";

// Dev: always fresh (0). Production: ISR every hour (3600).
export const revalidate = 3600;

export default async function Home() {
  // Fetch everything in one GROQ round-trip
  const data = await sanityFetch<HomePageData>(HOME_PAGE_QUERY).catch(() => null);

  // ─── Resolve data: prefer CMS, fall back to lib/data.ts ──────────────────
  const s = data?.siteSettings;

  const personalInfo = s
    ? {
        name: s.name,
        bio: s.bio,
        cvUrl: s.cvUrl ?? "/CV.pdf",
        profileImage: s.profileImage,
        email: s.email,
        phone: s.phone,
        location: s.location,
        orcid: s.orcid,
        twitter: s.twitter,
        twitterUrl: s.twitterUrl,
        linkedin: s.linkedin,
        linkedinUrl: s.linkedinUrl,
        identityBadges: s.identityBadges ?? fallbackBadges,
        footerTagline: s.footerTagline,
        copyrightYear: s.copyrightYear,
      }
    : {
        ...fallbackPersonal,
        cvUrl: "/CV.pdf",
        profileImage: undefined,
        identityBadges: fallbackBadges,
        footerTagline: undefined,
        copyrightYear: "2025",
      };

  const heroStats = s?.heroStats?.length
    ? s.heroStats
    : fallbackHeroStats.map((h) => ({ value: h.value, label: h.label, suffix: h.suffix }));

  const heroTags = s?.heroTags?.length
    ? s.heroTags
    : ["Associate Professor", "AI & Machine Learning", "14 Patents"];

  const researchInterests = data?.researchInterests?.length
    ? data.researchInterests
    : fallbackResearch.map((r) => ({ ...r, _id: String(r.id), order: r.id }));

  const experience = data?.experience?.length
    ? data.experience
    : fallbackExperience.map((e) => ({ ...e, _id: String(e.id) }));

  const education = data?.education?.length
    ? data.education
    : fallbackEducation.map((e) => ({ ...e, _id: String(e.id) }));

  const awards = data?.awards?.length
    ? data.awards
    : fallbackAwards.map((a) => ({ ...a, _id: String(a.id) }));

  const skills = data?.skills?.length
    ? data.skills
    : [
        ...fallbackTechnicalSkills.map((s, i) => ({
          _id: `tech-${i}`,
          name: s.name,
          level: s.level,
          category: "technical" as const,
        })),
        ...fallbackLanguages.map((l, i) => ({
          _id: `lang-${i}`,
          name: l.name,
          level: l.level,
          category: "language" as const,
          languageLevel: l.level,
        })),
      ];

  const toolChips = s?.toolChips?.length ? s.toolChips : fallbackToolChips;

  const navLinks = data?.navLinks?.length
    ? data.navLinks
    : fallbackNavLinks.map((n, i) => ({ _id: String(i), label: n.label, href: n.href }));

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden relative transition-colors duration-300">
      <div className="hairline-grid absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-100" />
      <div className="relative z-10">
        <Navbar navLinks={navLinks} />
        <HeroSection
          personalInfo={personalInfo}
          heroStats={heroStats}
          heroTags={heroTags}
        />
        <AboutSection
          personalInfo={personalInfo}
          education={education}
        />
        <ResearchGrid interests={researchInterests} />
        <ExperienceTimeline experience={experience} />
        <AwardsShelf awards={awards} />
        <SkillsSection skills={skills} toolChips={toolChips} />
        <ContactSection personalInfo={personalInfo} />
        <Footer personalInfo={personalInfo} navLinks={navLinks} />
      </div>
    </main>
  );
}
