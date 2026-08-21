import { defineField, defineType, defineArrayMember } from 'sanity';

export const explainerSectionType = defineType({
  title: 'Explainer Section',
  name: 'explainerSectionType',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'e.g. "Armed Conflict". shows up as the big heading for this section.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'string',
      description: 'One-liner that goes right under the heading.',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order of pages',
    }),
    defineField({
      name: 'slug',
      title: 'Section Slug',
      type: 'slug',
      options: { source: 'title' },
      description: 'Used in the URL as the outer explainers section segment.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'explainers',
      title: 'Explainers',
      type: 'array',
      description: 'The cards that show up under this section on the explainers page.',
      of: [
        defineArrayMember({
          type: 'object',
          title: 'Explainer',
          fields: [
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              description: 'What shows up on the card.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'slug',
              title: 'Slug',
              type: 'slug',
              options: { source: 'title' },
              description: 'Just hit Generate, it figures it out from the title.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'blurb',
              title: 'Blurb',
              type: 'text',
              description: 'Short summary at the top of the page, keep it to a sentence or two.',
            }),
            defineField({
              name: 'content',
              title: 'Full Content',
              type: 'blockContent',
              description: 'The actual content of the explainer page.',
            }),
            defineField({
              name: 'attachments',
              title: 'Attachments',
              type: 'array',
              description: 'Upload supporting files like codebooks, appendices, or scripts.',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'Attachment Title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: 'file',
                      title: 'File',
                      type: 'file',
                      validation: (Rule) => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      subtitle: 'file.asset.originalFilename',
                    },
                  },
                },
              ],
            }),
          ],
          preview: {
            select: { title: 'title' },
          },
        }),
      ],
    }),
  ],
});
