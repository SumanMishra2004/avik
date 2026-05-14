import { defineType, defineField } from "sanity";

export const ctaButton = defineType({
  name: "ctaButton",
  title: "CTA Button",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "href",
      title: "Link URL",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "variant",
      title: "Variant",
      type: "string",
      options: {
        list: [
          { title: "Gold (Primary)", value: "gold" },
          { title: "Ghost (Secondary)", value: "ghost" },
        ],
        layout: "radio",
      },
      initialValue: "ghost",
    }),
    defineField({
      name: "icon",
      title: "Icon Name (lucide)",
      type: "string",
      description: "e.g. ArrowUpRight, Mail, Download",
    }),
  ],
  preview: {
    select: { title: "label", subtitle: "variant" },
  },
});
