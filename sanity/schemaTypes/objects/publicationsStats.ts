import { defineType, defineField } from "sanity";

export const publicationsStatsSchema = defineType({
  name: "publicationsStats",
  title: "Publications Statistics",
  type: "object",
  fields: [
    defineField({ name: "total", title: "Total (display string, e.g. 60+)", type: "string" }),
    defineField({ name: "patents", title: "Total Patents", type: "number" }),
    defineField({ name: "patentsGranted", title: "Patents Granted", type: "number" }),
    defineField({ name: "patentsPublished", title: "Patents Published", type: "number" }),
    defineField({ name: "patentsFiled", title: "Patents Filed", type: "number" }),
    defineField({ name: "journals", title: "Journal Papers", type: "number" }),
    defineField({ name: "ieeeTransactions", title: "IEEE Transactions Papers", type: "number" }),
    defineField({ name: "bookChapters", title: "Book Chapters", type: "number" }),
    defineField({ name: "conferences", title: "Conference Papers", type: "number" }),
  ],
});
