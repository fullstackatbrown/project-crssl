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
  ],
  preview: {
    select: { title: "title" },
  },
});
