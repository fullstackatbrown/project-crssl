import { defineField, defineType } from 'sanity';

export const projectType = defineType({
  title: 'projectType',
  name: 'projectType',
  type: 'document',
  fields: [
    /**
     * project title
     * project slug
     * publish date
     * relevant links
     * short description
     *
     * page sections (reorderable)
     * references
     */
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'relevantLinks',
      type: 'array',
      of: [
        defineField({
          name: 'link',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
            }),
            defineField({
              name: 'url',
              type: 'url',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'projectLeader',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'examplePerson' }],
        },
      ],
    }),
    defineField({
      name: 'contributors',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'peopleType' }],
        },
      ],
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'keywords',
      type: 'array',
      of: [
        {
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'description',
      type: 'string',
    }),
    defineField({
      name: 'blurb',
      title: 'Blurb',
      type: 'text',
      description: 'A short paragraph shown under the project tile on the Research Projects page.',
    }),
    defineField({
        name: "papers",
        type: "array",
        of: [
            {
                type: 'reference',
                to: [{ type: 'paperType' }],
            },
        ],
    }),
    defineField({
      name: 'pageSections',
      title: 'Page sections',
      type: 'array',
      description: 'Add sections and drag to reorder. Each section has its own title and rich text.',
      of: [{ type: 'projectPageSection' }],
    }),
  ],
});
