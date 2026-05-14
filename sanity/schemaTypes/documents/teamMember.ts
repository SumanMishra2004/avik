import { defineType, defineField } from "sanity";

export const teamMember = defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Full Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Role / Position",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "department",
      title: "Department / Group",
      type: "string",
      description: "e.g. PhD Scholar, M.Tech Researcher, Project Intern",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "bio",
      title: "Short Bio",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(280),
    }),
    defineField({
      name: "photo",
      title: "Profile Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "researchArea",
      title: "Research Area / Specialization",
      type: "string",
      description: "e.g. Underwater Acoustic Communication, OTFS Modulation",
    }),
    defineField({
      name: "institution",
      title: "Institution",
      type: "string",
      description: "e.g. IIEST Shibpur, UEM Kolkata",
    }),
    defineField({
      name: "year",
      title: "Year / Status",
      type: "string",
      description: "e.g. 2nd Year PhD, M.Tech 2024",
    }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({ name: "twitter", title: "Twitter / X URL", type: "url" }),
        defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
        defineField({ name: "github", title: "GitHub URL", type: "url" }),
        defineField({ name: "email", title: "Email", type: "string" }),
        defineField({ name: "scholar", title: "Google Scholar URL", type: "url" }),
      ],
    }),
    defineField({
      name: "isFeatured",
      title: "Featured (shown prominently)",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      validation: (r) => r.required().integer().min(0),
    }),
    defineField({
      name: "isVisible",
      title: "Visible on Site",
      type: "boolean",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
