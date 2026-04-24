import { defineField, defineType } from 'sanity';

/**
 * One reorderable section on a project page. Used inside projectType.pageSections.
 */
export const projectPageSectionType = defineType({
  name: 'projectPageSection',
  title: 'Page section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Section title',
      description: 'Shown as a link in the page outline.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'anchorId',
      type: 'slug',
      title: 'Anchor link (optional)',
      description:
        'Short ID for in-page links (e.g. #overview). Generate from title or type your own.',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      title: 'Section content',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: title || 'Untitled section',
      };
    },
  },
});
