import { defineType, defineField } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "IoT", value: "IoT" },
          { title: "AI/ML", value: "AI/ML" },
          { title: "Communication", value: "Communication" },
          { title: "GNSS", value: "GNSS" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "Active" },
          { title: "Completed", value: "Completed" },
          { title: "Ongoing", value: "Ongoing" },
        ],
      },
      initialValue: "Active",
    }),
    defineField({ name: "institution", title: "Institution", type: "string" }),
    defineField({ name: "duration", title: "Duration", type: "string", description: "e.g. 2022 – Present" }),
    defineField({ name: "authors", title: "Authors / Collaborators", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "funded", title: "Funded By (leave blank if not funded)", type: "string", description: "e.g. DSIR · Govt. of India" }),
    defineField({ name: "techStack", title: "Tech Stack", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "githubUrl", title: "GitHub URL", type: "url" }),
    defineField({ name: "liveUrl", title: "Live / Demo URL", type: "url" }),
    defineField({ name: "image", title: "Project Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "featured", title: "Featured (wide card)", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Display Order", type: "number", validation: (r) => r.required().integer().min(0) }),
    defineField({ name: "isVisible", title: "Visible on Site", type: "boolean", initialValue: true }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: { select: { title: "title", subtitle: "category" } },
});
