import { defineType, defineField } from "sanity";

export const award = defineType({
  name: "award",
  title: "Award / Recognition",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Award Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "issuer",
      title: "Issuing Organization",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "via",
      title: "Via (secondary issuer/venue)",
      type: "string",
      description: "e.g. via IIT Kharagpur",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon (emoji)",
      type: "string",
      initialValue: "🏆",
    }),
    defineField({
      name: "highlight",
      title: "Highlight (Government Funded / Major Award)?",
      type: "boolean",
      initialValue: false,
      description: "Highlighted awards get a gold border and prominent styling",
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
    select: { title: "title", subtitle: "issuer" },
    prepare({ title, subtitle }) {
      return { title, subtitle };
    },
  },
});
