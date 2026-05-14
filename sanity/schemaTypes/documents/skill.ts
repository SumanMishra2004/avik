import { defineType, defineField } from "sanity";

export const skill = defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Skill Name",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "level",
      title: "Proficiency Level (0–100)",
      type: "number",
      validation: (r) => r.required().min(0).max(100),
      description: "Used to render the progress bar in Technical Skills",
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Technical Skill", value: "technical" },
          { title: "Language", value: "language" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "languageLevel",
      title: "Language Dot Rating (1–5)",
      type: "number",
      description: "Only for Language category — number of filled dots",
      validation: (r) => r.min(1).max(5),
      hidden: ({ document }) => document?.category !== "language",
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
    select: { title: "name", subtitle: "category" },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle === "technical" ? "⚡ Technical" : "🌐 Language" };
    },
  },
});
