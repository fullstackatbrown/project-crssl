import { defineField, defineType } from 'sanity';

export const projectType = defineType({
  title: 'projectType',
  name: 'projectType',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Project title shown across listing cards and the project hero.',
      validation: (Rule) => Rule.required().max(90),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'URL segment for this project page (for example: project-name).',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      description: 'Publication date used for ordering and display.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      description: 'Main image shown in project cards and the project hero header.',
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
          description: 'Describe the image for accessibility and screen readers.',
        },
      ],
    }),
    defineField({
      name: 'relevantLinks',
      type: 'array',
      description: 'Useful links shown in the project hero (for example: paper, repo, site).',
      of: [
        defineField({
          name: 'link',
          type: 'object',
          description: 'One link label and destination URL.',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              description: 'Short link label shown on the page.',
            }),
            defineField({
              name: 'url',
              type: 'url',
              description: 'Destination URL.',
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'projectLeader',
      type: 'array',
      description: 'Primary people leading this project.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'peopleType' }],
        },
      ],
    }),
    defineField({
      name: 'contributors',
      type: 'array',
      description: 'People contributing to this project.',
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
      description: 'High-level labels used for browsing and filtering.',
      of: [
        {
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'keywords',
      type: 'array',
      description: 'Search terms used by keyword search on the Projects page.',
      of: [
        {
          type: 'string',
        },
      ],
    }),
    defineField({
      name: 'description',
      type: 'string',
      description: 'Short summary shown in the project hero section.',
      validation: (Rule) => Rule.max(220),
    }),
    defineField({
        name: "papers",
        type: "array",
        description: 'Related papers associated with this project.',
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
      description: 'Main body content. Add sections and drag to reorder.',
      of: [{ type: 'projectPageSection' }],
    }),
  ],
});
