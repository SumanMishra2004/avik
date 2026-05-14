import { defineType, defineField } from "sanity";

export const heroStat = defineType({
  name: "heroStat",
  title: "Hero Stat",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "number",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "suffix",
      title: "Suffix (e.g. +)",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
});
