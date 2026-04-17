import { defineField, defineType, defineArrayMember } from "sanity";

export const aboutType = defineType({
  name: "about",
  title: "About Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      initialValue: "About Page",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "siteTitle",
      title: "Site Title",
      type: "string",
      initialValue: "CRSS LAB",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "siteSubtitle",
      title: "Site Subtitle",
      type: "string",
      initialValue: "Conflict Research and Security Studies",
    }),

    defineField({
      name: "navLinks",
      title: "Navigation Links",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "href",
              title: "Href",
              type: "string",
              validation: (Rule) => Rule.required(),
              description: "Example: #about, /team, /project",
            }),
          ],
          preview: {
            select: {
              title: "label",
              subtitle: "href",
            },
          },
        }),
      ],
    }),

    defineField({
      name: "hero",
      title: "Hero Section",
      type: "object",
      fields: [
        defineField({
          name: "backgroundImage",
          title: "Background Image",
          type: "image",
          options: { hotspot: true },
          validation: (Rule) => Rule.required(),
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
        }),
        defineField({
          name: "overlayHeading",
          title: "Overlay Heading",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "overlayText",
          title: "Overlay Text",
          type: "text",
          rows: 4,
        }),
      ],
    }),

    defineField({
      name: "missionSection",
      title: "Mission Section",
      type: "object",
      fields: [
        defineField({
          name: "sectionId",
          title: "Section ID",
          type: "slug",
          options: { source: "heading" },
        }),
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "About",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "body",
          title: "Body",
          type: "blockContent",
        }),
        defineField({
          name: "image",
          title: "Image",
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
      ],
    }),

    defineField({
      name: "historySection",
      title: "History Section",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Our History",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "items",
          title: "Timeline Items",
          type: "array",
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
                  name: "title",
                  title: "Title",
                  type: "string",
                }),
                defineField({
                  name: "description",
                  title: "Description",
                  type: "text",
                  rows: 5,
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "year",
                  subtitle: "description",
                },
              },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "impactSection",
      title: "Impact Section",
      type: "object",
      fields: [
        defineField({
          name: "heading",
          title: "Heading",
          type: "string",
          initialValue: "Our Impact",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "body",
          title: "Body",
          type: "blockContent",
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "siteTitle",
    },
  },
});
