import { groq } from "next-sanity";

// ─── Site Settings (singleton) ────────────────────────────────────────────────
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    name, title, tagline, subTagline, bio,
    location, email, phone, orcid,
    twitter, twitterUrl, linkedin, linkedinUrl, cvUrl,
    profileImage { asset->{ url }, alt },
    heroTags,
    heroStats[] { value, label, suffix },
    heroCTAs[] { label, href, variant, icon },
    identityBadges,
    toolChips,
    publicationsStats {
      total, patents, patentsGranted, patentsPublished,
      patentsFiled, journals, ieeeTransactions, bookChapters, conferences
    },
    seoTitle, seoDescription, seoKeywords,
    seoImage { asset->{ url } },
    footerTagline, copyrightYear
  }
`;

// ─── Research Interests ───────────────────────────────────────────────────────
export const RESEARCH_INTERESTS_QUERY = groq`
  *[_type == "researchInterest" && isVisible != false] | order(order asc) {
    _id, title, description, icon, color, order
  }
`;

// ─── Experience ───────────────────────────────────────────────────────────────
export const EXPERIENCE_QUERY = groq`
  *[_type == "experience" && isVisible != false] | order(order asc) {
    _id, role, department, institution, duration, years, location, isCurrent
  }
`;

// ─── Education ────────────────────────────────────────────────────────────────
export const EDUCATION_QUERY = groq`
  *[_type == "education"] | order(order asc) {
    _id, degree, field, institution, duration, status, grade, icon
  }
`;

// ─── Awards ───────────────────────────────────────────────────────────────────
export const AWARDS_QUERY = groq`
  *[_type == "award" && isVisible != false] | order(order asc) {
    _id, title, issuer, via, year, icon, highlight
  }
`;

// ─── Skills ───────────────────────────────────────────────────────────────────
export const SKILLS_QUERY = groq`
  *[_type == "skill" && isVisible != false] | order(order asc) {
    _id, name, level, category, languageLevel
  }
`;

// ─── Nav Links ────────────────────────────────────────────────────────────────
export const NAV_LINKS_QUERY = groq`
  *[_type == "navLink" && isVisible != false] | order(order asc) {
    _id, label, href
  }
`;

// ─── Team Members ─────────────────────────────────────────────────────────────
export const TEAM_MEMBERS_QUERY = groq`
  *[_type == "teamMember" && isVisible != false] | order(order asc) {
    _id, name, role, department, bio, isFeatured,
    photo { asset->{ url }, alt },
    researchArea, institution, year,
    socials { twitter, linkedin, github, email, scholar }
  }
`;

// ─── Projects ─────────────────────────────────────────────────────────────────
export const PROJECTS_QUERY = groq`
  *[_type == "project" && isVisible != false] | order(order asc) {
    _id, title, description, category, status,
    institution, duration, authors, funded, techStack,
    githubUrl, liveUrl, featured,
    image { asset->{ url } }
  }
`;

// ─── Publications ─────────────────────────────────────────────────────────────
export const PUBLICATIONS_QUERY = groq`
  *[_type == "publication" && isVisible != false] | order(year desc) {
    _id, title, type, year, publisher,
    authors, description, keywords, doi,
    "pdfUrl": pdfFile.asset->url
  }
`;

// ─── Full Home Page (single round-trip) ──────────────────────────────────────
export const HOME_PAGE_QUERY = groq`
  {
    "siteSettings": ${SITE_SETTINGS_QUERY},
    "researchInterests": ${RESEARCH_INTERESTS_QUERY},
    "experience": ${EXPERIENCE_QUERY},
    "education": ${EDUCATION_QUERY},
    "awards": ${AWARDS_QUERY},
    "skills": ${SKILLS_QUERY},
    "navLinks": ${NAV_LINKS_QUERY}
  }
`;

// ─── SEO only (for metadata generation) ──────────────────────────────────────
export const SEO_QUERY = groq`
  *[_type == "siteSettings"][0] {
    seoTitle, seoDescription, seoKeywords,
    seoImage { asset->{ url } },
    name, twitter
  }
`;
