import { defineType, defineField } from "sanity";

export const navLink = defineType({
  name: "navLink",
  title: "Navigation Link",
  type: "document",
  fields: [
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "href",
      title: "URL / Href",
      type: "string",
      description: "e.g. / or /#about or /projects",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower number = shown first (left in navbar)",
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
    select: { title: "label", subtitle: "href" },
  },
});
