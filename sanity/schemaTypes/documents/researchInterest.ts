import { defineType, defineField } from "sanity";

export const researchInterest = defineType({
  name: "researchInterest",
  title: "Research Interest",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "correspondingAuthors",
      title: "Corresponding Author Details",
      type: "array",
      of: [{ type: "correspondingAuthor" }],
      description: "Corresponding lead authors for this research area",
    }),
    defineField({
      name: "icon",
      title: "Lucide Icon Name",
      type: "string",
      description: "Must match a key in the component ICON_MAP: Radio, Waves, Brain, Wifi, Lightbulb, Activity, Mountain, Zap",
      validation: (r) => r.required(),
      options: {
        list: [
          { title: "Radio", value: "Radio" },
          { title: "Waves", value: "Waves" },
          { title: "Brain", value: "Brain" },
          { title: "Wifi", value: "Wifi" },
          { title: "Lightbulb", value: "Lightbulb" },
          { title: "Activity", value: "Activity" },
          { title: "Mountain", value: "Mountain" },
          { title: "Zap", value: "Zap" },
        ],
      },
    }),
    defineField({
      name: "color",
      title: "Gradient Color Class",
      type: "string",
      description: "Tailwind gradient class e.g. from-blue-600 to-cyan-500",
      initialValue: "from-blue-600 to-cyan-500",
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
    select: { title: "title", subtitle: "icon" },
  },
});
