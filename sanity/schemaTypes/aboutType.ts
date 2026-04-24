import { defineType, defineField, defineArrayMember } from "sanity";

export const aboutType = defineType({
  name: "about",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      validation: (Rule) => Rule.required(),
      initialValue: "About Page",
    }),

    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      initialValue: "About",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroDescription",
      title: "Hero Description",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "heroImage",
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
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "missionBody",
      title: "Mission Body",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "missionImage",
      title: "Mission Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "historyTitle",
      title: "History Title",
      type: "string",
      initialValue: "Our History",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "historyItems",
      title: "History Items",
      type: "array",
      validation: (Rule) => Rule.min(1).required(),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "year",
              title: "Year",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "body",
              title: "Body",
              type: "array",
              of: [{ type: "block" }],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "year",
              subtitle: "body.0.children.0.text",
            },
          },
        }),
      ],
    }),

    defineField({
      name: "impactTitle",
      title: "Impact Title",
      type: "string",
      initialValue: "Our Impact",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "impactBody",
      title: "Impact Body",
      type: "array",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "sections",
      title: "Additional Sections",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Section Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "body",
              title: "Section Body",
              type: "array",
              of: [{ type: "block" }],
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "body.0.children.0.text",
            },
          },
        }),
      ],
    }),
  ],
});
