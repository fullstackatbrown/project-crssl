import { defineField, defineType } from 'sanity';
import { UserIcon } from '@sanity/icons';

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
     * content : blockContentType, but allow color text
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
      name: 'relaventLinks',
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
      name: 'contributors',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'examplePerson' }],
        },
      ],
    }),
    defineField({
      name: 'description',
      type: 'string',
    }),
    // definteField({
    //     name: "relatedResearch",
    //     type: "array",
    //     of: [
    //         {
    //             type: "reference",
    //             to: [{ type: }] // fill with papers type when that comes out
    //         }
    //     ]
    // })
    defineField({
      name: 'content',
      type: 'blockContent',
    }),
  ],
});
