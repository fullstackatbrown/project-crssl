import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const peopleType = defineType({
  title: "peopleType",
  name: "peopleType",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "fullname",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio",
      type: "string",
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
    defineField({
      name: "slug",
      type: "slug",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  // orderings: [
  //   {
  //     title: "name",
  //     name: "nameDesc",
  //     by: [{ field: "name", direction: "desc" }],
  //   },
  // ],
});
