import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const peopleType = defineType({
  title: "peopleType",
  name: "peopleType",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "firstname",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lastname",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "recentwork",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "jobtitles",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "interests",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
});
