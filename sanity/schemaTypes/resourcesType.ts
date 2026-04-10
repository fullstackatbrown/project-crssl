import { defineType, defineField, defineArrayMember } from "sanity";

export const resourcesType = defineType({
  name: "resourcesPage",
  title: "Resources Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      description: 'e.g. "Tools and Resources"',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "sections",
      title: "Sections",
      type: "array",
      of: [
        defineArrayMember({
          name: "section",
          title: "Section",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Section Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "description",
              title: "Section Description",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "items",
              title: "Section Items",
              type: "array",
              of: [
                defineArrayMember({
                  name: "resourceItem",
                  title: "Resource Item",
                  type: "object",
                  fields: [
                    defineField({
                      name: "label",
                      title: "Label",
                      type: "string",
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "description",
                      title: "Description",
                      type: "text",
                      rows: 2,
                    }),
                    defineField({
                      name: "resourceType",
                      title: "Resource Type",
                      type: "string",
                      options: {
                        list: [
                          { title: "External Link", value: "link" },
                          { title: "File / PDF", value: "file" },
                          { title: "Image", value: "image" },
                          { title: "YouTube Video", value: "youtube" },
                        ],
                        layout: "radio",
                      },
                      validation: (Rule) => Rule.required(),
                    }),
                    // External link
                    defineField({
                      name: "url",
                      title: "URL",
                      type: "url",
                      hidden: ({ parent }) => parent?.resourceType !== "link",
                    }),
                    // File upload (PDF, docs, etc.)
                    defineField({
                      name: "file",
                      title: "File",
                      type: "file",
                      hidden: ({ parent }) => parent?.resourceType !== "file",
                    }),
                    // Image upload
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
                      hidden: ({ parent }) => parent?.resourceType !== "image",
                    }),
                    // YouTube embed
                    defineField({
                      name: "youtubeUrl",
                      title: "YouTube URL",
                      type: "url",
                      description: "Paste a YouTube video or playlist URL",
                      hidden: ({ parent }) =>
                        parent?.resourceType !== "youtube",
                    }),
                  ],
                  preview: {
                    select: { title: "label", subtitle: "resourceType" },
                  },
                }),
              ],
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        }),
      ],
    }),
  ],
});
