import { defineField, defineType } from "sanity";

export const funderType = defineType({
  name: "funderType",
  title: "Funder",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "url",
      title: "Website URL",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      description: "Controls display order, lower numbers appear first",
    }),
  ],
  preview: {
    select: { title: "name" },
  },
});