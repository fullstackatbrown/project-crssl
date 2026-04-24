import { defineField, defineType } from 'sanity';

export const explainerType = defineType({
  title: 'Explainer',
  name: 'explainerType',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'The card title shown on the explainers page.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'explainerCategoryType' }],
      description: 'The section this explainer belongs to.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls position within the category. Lower numbers appear first (the first item gets the highlighted card style).',
    }),
    defineField({
      name: 'blurb',
      title: 'Blurb',
      type: 'text',
      description: 'A short summary shown at the top of the explainer detail page.',
    }),
    defineField({
      name: 'content',
      title: 'Full Content',
      type: 'blockContent',
      description: 'The full body of the explainer page.',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
  ],
});
