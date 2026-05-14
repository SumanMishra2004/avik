import { defineType, defineField } from "sanity";

export const education = defineType({
  name: "education",
  title: "Education",
  type: "document",
  fields: [
    defineField({
      name: "degree",
      title: "Degree",
      type: "string",
      description: "e.g. PhD, M.Tech, B.Tech",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "field",
      title: "Field of Study",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "institution",
      title: "Institution",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration (display string)",
      type: "string",
      description: "e.g. June 2014 – May 2016",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      description: "e.g. Completed or Pre-submission completed 13.09.2023",
    }),
    defineField({
      name: "grade",
      title: "Grade / CGPA",
      type: "string",
      description: "e.g. CGPA: 8.13 (leave blank if not applicable)",
    }),
    defineField({
      name: "icon",
      title: "Icon (emoji)",
      type: "string",
      description: "e.g. 🎓 or 🏫",
      initialValue: "🎓",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower number = shown first (most recent first)",
      validation: (r) => r.required().integer().min(0),
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
    select: { title: "degree", subtitle: "institution" },
  },
});
