import { defineField, defineType } from "sanity";

export const footerType = defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      initialValue: "Footer",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "linkedinUrl",
      title: "LinkedIn URL",
      type: "url",
      description: "The CRSSL LinkedIn profile link.",
    }),
    defineField({
      name: "blueskyUrl",
      title: "Bluesky URL",
      type: "url",
      description: "The CRSSL Bluesky profile link.",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
      description: "The CRSSL GitHub profile link.",
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
