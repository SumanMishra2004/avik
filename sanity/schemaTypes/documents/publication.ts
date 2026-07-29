import { defineType, defineField } from "sanity";

export const publication = defineType({
  name: "publication",
  title: "Publication",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "type",
      title: "Publication Type",
      type: "string",
      options: {
        list: [
          { title: "Journal", value: "Journal" },
          { title: "Conference", value: "Conference" },
          { title: "Patent", value: "Patent" },
          { title: "Preprint", value: "Preprint" },
          { title: "Book Chapter", value: "Book Chapter" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "year", title: "Year", type: "string", validation: (r) => r.required() }),
    defineField({ name: "publisher", title: "Publisher / Venue", type: "string", validation: (r) => r.required() }),
    defineField({ name: "authors", title: "Authors", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "correspondingAuthors",
      title: "Corresponding Author Details",
      type: "array",
      of: [{ type: "correspondingAuthor" }],
      description: "Detailed contact info for corresponding author(s)",
    }),
    defineField({ name: "description", title: "Abstract / Description", type: "text", rows: 4 }),
    defineField({ name: "keywords", title: "Keywords", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "doi", title: "DOI / Paper URL", type: "url" }),
    defineField({
      name: "pdfFile",
      title: "PDF File (upload)",
      type: "file",
      options: { accept: ".pdf,application/pdf" },
    }),
    defineField({ name: "isVisible", title: "Visible on Site", type: "boolean", initialValue: true }),
  ],
  orderings: [{ title: "Year (Newest First)", name: "yearDesc", by: [{ field: "year", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "publisher" },
    prepare({ title, subtitle }) {
      return { title, subtitle };
    },
  },
});
