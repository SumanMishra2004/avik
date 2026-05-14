import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export default defineConfig({
  name: "pavik-portfolio",
  title: "Avik Kumar Das — Portfolio CMS",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(S.document().schemaType("siteSettings").documentId("siteSettings")),
            S.divider(),
            S.documentTypeListItem("researchInterest").title("Research Interests"),
            S.documentTypeListItem("experience").title("Experience"),
            S.documentTypeListItem("education").title("Education"),
            S.documentTypeListItem("award").title("Awards & Recognition"),
            S.documentTypeListItem("skill").title("Skills & Languages"),
            S.documentTypeListItem("navLink").title("Navigation Links"),
            S.documentTypeListItem("teamMember").title("Team Members"),
            S.divider(),
            S.documentTypeListItem("project").title("Projects"),
            S.documentTypeListItem("publication").title("Publications"),
          ]),
    }),
  ],
  schema: { types: schemaTypes },
});
