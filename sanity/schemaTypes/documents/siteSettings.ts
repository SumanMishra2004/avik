import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  // Singleton — enforced via Studio UI and queries
  fields: [
    // ── Personal Info ──────────────────────────────────────────────────────
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (r) => r.required(),
      initialValue: "Avik Kumar Das",
    }),
    defineField({
      name: "title",
      title: "Professional Title",
      type: "string",
      initialValue: "Associate Professor | AI-ML Researcher | Signal Processing Expert",
    }),
    defineField({
      name: "tagline",
      title: "Hero Tagline",
      type: "string",
      initialValue: "Bridging Deep Technology with Real-World Impact",
    }),
    defineField({
      name: "subTagline",
      title: "Hero Sub-tagline",
      type: "string",
      initialValue: "6 Years of Teaching · 60+ Publications · 14 Patents · IIT-backed Researcher",
    }),
    defineField({
      name: "bio",
      title: "Biography",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      initialValue: "Kolkata, India",
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (r) => r.required().email(),
      initialValue: "avikdas005@gmail.com",
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      initialValue: "+91 9836820652",
    }),
    defineField({
      name: "orcid",
      title: "ORCID URL",
      type: "url",
      initialValue: "https://orcid.org/0000-0001-8824-703X",
    }),
    defineField({
      name: "twitter",
      title: "Twitter Handle (with @)",
      type: "string",
      initialValue: "@005avik_das",
    }),
    defineField({
      name: "twitterUrl",
      title: "Twitter URL",
      type: "url",
      initialValue: "https://twitter.com/005avik_das",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn Username",
      type: "string",
      initialValue: "avikdasetc",
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
      initialValue: "https://www.linkedin.com/in/avikdasetc",
    }),
    defineField({
      name: "cvFile",
      title: "CV / Resume File",
      type: "file",
      options: { accept: ".pdf,application/pdf" },
      description: "Upload your CV (PDF). Replaces the default public/CV.pdf",
    }),

    // ── Profile Image ──────────────────────────────────────────────────────
    defineField({
      name: "profileImage",
      title: "Profile Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          initialValue: "Dr. Avik Kumar Das — Associate Professor & Researcher",
        }),
      ],
    }),

    // ── Hero ───────────────────────────────────────────────────────────────
    defineField({
      name: "heroTags",
      title: "Hero Role Tags",
      type: "array",
      of: [{ type: "string" }],
      initialValue: ["Associate Professor", "AI & Machine Learning", "14 Patents"],
      description: "Small pill-shaped tags shown below the name in the hero section",
    }),
    defineField({
      name: "heroStats",
      title: "Hero Stats Bar",
      type: "array",
      of: [{ type: "heroStat" }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "heroCTAs",
      title: "Hero CTA Buttons",
      type: "array",
      of: [{ type: "ctaButton" }],
    }),

    // ── About / Identity ───────────────────────────────────────────────────
    defineField({
      name: "identityBadges",
      title: "Identity Badges",
      type: "array",
      of: [{ type: "string" }],
      description: "Shown in the About section under Identity & Roles",
      initialValue: [
        "PhD Researcher", "IEEE Member", "OSI Life Member",
        "IIT Shibpur Alumni", "14 Patent Holder", "Goalkeeper – IIEST",
        "BFA Musician", "Nature Photographer",
      ],
    }),
    defineField({
      name: "toolChips",
      title: "Tools & Platforms Chips",
      type: "array",
      of: [{ type: "string" }],
      description: "Shown in the Skills section under Tools & Platforms",
      initialValue: [
        "Python", "MATLAB", "Arduino", "Raspberry Pi", "LaTeX",
        "Photoshop", "Eagle PCB", "LabVIEW", "RTKLib", "LattePanda",
        "ESP32", "FPGA", "TMS320C6748", "CCS", "C Programming",
      ],
    }),

    // ── Publications Stats ─────────────────────────────────────────────────
    defineField({
      name: "publicationsStats",
      title: "Publications Statistics",
      type: "publicationsStats",
    }),

    // ── SEO ────────────────────────────────────────────────────────────────
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      group: "seo",
      initialValue: "Avik Kumar Das — Associate Professor & AI-ML Researcher",
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Meta Description",
      type: "text",
      rows: 3,
      group: "seo",
    }),
    defineField({
      name: "seoKeywords",
      title: "SEO Keywords",
      type: "array",
      of: [{ type: "string" }],
      group: "seo",
    }),
    defineField({
      name: "seoImage",
      title: "OG / Social Share Image",
      type: "image",
      group: "seo",
    }),

    // ── Footer ─────────────────────────────────────────────────────────────
    defineField({
      name: "footerTagline",
      title: "Footer Tagline",
      type: "string",
      initialValue: "Kolkata, India · Bridging deep technology with real-world impact through research, teaching, and innovation.",
    }),
    defineField({
      name: "copyrightYear",
      title: "Copyright Year",
      type: "string",
      initialValue: "2025",
    }),
  ],
  groups: [
    { name: "seo", title: "SEO & Open Graph" },
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
