import { defineField, defineType } from "sanity";

export const peoplePageType = defineType({
  name: "peoplePage",
  title: "People Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      initialValue: "People Page",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({
          name: "image",
          title: "Hero Image",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Experts",
        }),
        defineField({
          name: "subtext",
          title: "Subtext",
          type: "string",
          initialValue:
            "The Conflict Research and Security Studies Lab brings together experts across the disciplines.",
        }),
      ],
    }),
    defineField({
      name: "excludedTitles",
      title: "Excluded Job Titles",
      type: "array",
      of: [{ type: "string" }],
      description: "Job titles to exclude from the initial view (e.g., 'Alumni'). If none provided, all people will be shown initially.",
    }),
    defineField({
      name: "expertFinderButton",
      title: "Expert Finder Button",
      type: "object",
      description: "Configure the 'Find an expert' button below the filters",
      fields: [
        defineField({
          name: "text",
          title: "Button Text",
          type: "text",
          initialValue: "Need something different?\nFind an expert here!",
          description: "Text to display on the button (use line breaks for multiple lines)",
        }),
        defineField({
          name: "url",
          title: "Button URL",
          type: "url",
          initialValue: "https://google.com",
          description: "Where the button should link to",
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
