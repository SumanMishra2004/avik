import { defineType, defineField } from "sanity";

export const correspondingAuthor = defineType({
  name: "correspondingAuthor",
  title: "Corresponding Author",
  type: "object",
  fields: [
    defineField({
      name: "name",
      title: "Author Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email Address",
      type: "string",
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: "affiliation",
      title: "Affiliation / Institution",
      type: "string",
      description: "e.g. Department of ECE, IIEST Shibpur",
    }),
    defineField({
      name: "role",
      title: "Role / Designation",
      type: "string",
      description: "e.g. Primary Corresponding Author, Co-Corresponding Author",
    }),
    defineField({
      name: "phone",
      title: "Contact Phone (Optional)",
      type: "string",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "email",
    },
  },
});
