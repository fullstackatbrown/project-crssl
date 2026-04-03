import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

// Author records are used by paperType.
// Keeping this separate from peopleType for now as it holds more detail
export const authorType = defineType({
  name: "authorType",
  title: "Author",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      // Display name used in paper author lists and search.
      name: "name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      // Optional routing support for future author profile pages.
      name: "slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    // Institution or organization shown next to author name.
    defineField({ name: "affiliation", type: "string" }),
    // Short bio
    defineField({ name: "bio", type: "text", rows: 3 }),
    defineField({
      // Optional headshot
      name: "photo",
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    // Personal, lab, or academic homepage.
    defineField({ name: "url", type: "url" }),
  ],
  preview: {
    select: { title: "name", subtitle: "affiliation", media: "photo" },
  },
});
