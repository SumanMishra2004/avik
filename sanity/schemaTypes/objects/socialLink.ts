import { defineType, defineField } from "sanity";

export const socialLink = defineType({
  name: "socialLink",
  title: "Social Link",
  type: "object",
  fields: [
    defineField({
      name: "platform",
      title: "Platform",
      type: "string",
      options: {
        list: [
          { title: "Twitter / X", value: "twitter" },
          { title: "LinkedIn", value: "linkedin" },
          { title: "ORCID", value: "orcid" },
          { title: "Email", value: "email" },
          { title: "GitHub", value: "github" },
          { title: "Other", value: "other" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "url",
      title: "URL",
      type: "url",
      validation: (r) =>
        r.uri({ allowRelative: false, scheme: ["https", "http", "mailto"] }),
    }),
    defineField({
      name: "handle",
      title: "Display Handle / Text",
      type: "string",
      description: "e.g. @005avik_das or avikdasetc",
    }),
  ],
  preview: {
    select: { title: "platform", subtitle: "handle" },
  },
});
