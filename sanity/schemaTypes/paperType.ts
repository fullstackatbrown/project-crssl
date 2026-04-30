import { defineField, defineType } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

// For Research > Papers
export const paperType = defineType({
  name: "paperType",
  title: "Paper",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      // Title
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      // Slug enables stable URLs if/when a paper detail route is added.
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      // Ordered people references for rendering author bylines.
      name: "authors",
      type: "array",
      of: [{ type: "reference", to: [{ type: "peopleType" }] }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      // Publication or release date
      name: "date",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      // Paper Type
      name: "type",
      type: "string",
      options: {
        list: [
          { title: "Working Paper", value: "Working Paper" },
          { title: "Report", value: "Report" },
          { title: "Policy Brief", value: "Policy Brief" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    // Optional summary for list previews and SEO snippets.
    defineField({ name: "abstract", type: "text", rows: 4 }),
    // Uploaded PDF for direct download/view.
    defineField({ name: "pdf", type: "file", options: { accept: ".pdf" } }),
    // External host URL if the paper is published elsewhere.
    defineField({ name: "externalUrl", type: "url" }),
    // Freeform tags for future filtering and topic grouping.
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
  ],
  validation: (Rule) =>
    Rule.custom((doc: { pdf?: unknown; externalUrl?: string } | undefined) => {
      // Require at least one way for users to access the paper.
      if (doc?.pdf || doc?.externalUrl) return true;
      return "Add either a PDF or an external URL";
    }),
  preview: {
    select: { title: "title", subtitle: "type" },
    prepare({ title, subtitle }) {
      return { title, subtitle };
    },
  },
});
