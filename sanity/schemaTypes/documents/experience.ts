import { defineType, defineField } from "sanity";

export const experience = defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "role",
      title: "Role / Position",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "department",
      title: "Department / Division",
      type: "string",
    }),
    defineField({
      name: "institution",
      title: "Institution / Organization",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration (display string)",
      type: "string",
      description: "e.g. March 2024 – Present",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "years",
      title: "Years (display string)",
      type: "string",
      description: "e.g. 2 Years or 6 Months",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
    }),
    defineField({
      name: "isCurrent",
      title: "Currently Active?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower number = shown first",
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
    select: {
      title: "role",
      subtitle: "institution",
      media: "isCurrent",
    },
    prepare({ title, subtitle }) {
      return { title, subtitle };
    },
  },
});
