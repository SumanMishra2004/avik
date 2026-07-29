// ─── Sanity TypeScript types ──────────────────────────────────────────────────
// These mirror lib/data.ts shapes exactly to avoid breaking component contracts.
// _id used instead of numeric id to match Sanity documents.

export interface SanityImage {
  asset?: { url: string };
  alt?: string;
}

export interface SanitySiteSettings {
  name: string;
  title: string;
  tagline: string;
  subTagline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  orcid: string;
  twitter: string;
  twitterUrl: string;
  linkedin: string;
  linkedinUrl: string;
  cvUrl?: string;
  profileImage?: SanityImage;
  heroTags: string[];
  heroStats: SanityHeroStat[];
  heroCTAs?: SanityCtaButton[];
  identityBadges: string[];
  toolChips: string[];
  publicationsStats: SanityPublicationsStats;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  seoImage?: SanityImage;
  footerTagline?: string;
  copyrightYear?: string;
}

export interface SanityHeroStat {
  value: number;
  label: string;
  suffix: string;
}

export interface SanityCtaButton {
  label: string;
  href: string;
  variant: "gold" | "ghost";
  icon?: string;
}

export interface SanityCorrespondingAuthor {
  name: string;
  email?: string;
  affiliation?: string;
  role?: string;
  phone?: string;
}

export interface SanityResearchInterest {
  _id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  correspondingAuthors?: SanityCorrespondingAuthor[];
}

export interface SanityExperience {
  _id: string;
  role: string;
  department: string;
  institution: string;
  duration: string;
  years: string;
  location: string;
  isCurrent: boolean;
}

export interface SanityEducation {
  _id: string;
  degree: string;
  field: string;
  institution: string;
  duration: string;
  status: string;
  grade: string;
  icon: string;
}

export interface SanityAward {
  _id: string;
  title: string;
  issuer: string;
  via: string;
  year: string;
  icon: string;
  highlight: boolean;
}

export interface SanitySkill {
  _id: string;
  name: string;
  level: number;
  category: "technical" | "language";
  languageLevel?: number;
}

export interface SanityNavLink {
  _id: string;
  label: string;
  href: string;
}

export interface SanityPublicationsStats {
  total: string;
  patents: number;
  patentsGranted: number;
  patentsPublished: number;
  patentsFiled: number;
  journals: number;
  ieeeTransactions: number;
  bookChapters: number;
  conferences: number;
}

export interface SanityTeamMember {
  _id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  photo?: { asset?: { url: string }; alt?: string };
  researchArea?: string;
  institution?: string;
  year?: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    email?: string;
    scholar?: string;
  };
  isFeatured: boolean;
  order: number;
}

export interface SanityProject {
  _id: string;
  title: string;
  description: string;
  category: "IoT" | "AI/ML" | "Communication" | "GNSS";
  status: string;
  institution?: string;
  duration?: string;
  authors?: string[];
  correspondingAuthors?: SanityCorrespondingAuthor[];
  funded?: string;
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: { asset?: { url: string } };
  featured: boolean;
}

export interface SanityPublication {
  _id: string;
  title: string;
  type: "Journal" | "Conference" | "Patent" | "Preprint" | "Book Chapter";
  year: string;
  publisher: string;
  authors?: string[];
  correspondingAuthors?: SanityCorrespondingAuthor[];
  description?: string;
  keywords?: string[];
  doi?: string;
  pdfUrl?: string;
}

export interface HomePageData {
  siteSettings: SanitySiteSettings;
  researchInterests: SanityResearchInterest[];
  experience: SanityExperience[];
  education: SanityEducation[];
  awards: SanityAward[];
  skills: SanitySkill[];
  navLinks: SanityNavLink[];
}
