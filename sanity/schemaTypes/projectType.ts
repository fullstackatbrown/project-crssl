import React from 'react';
import {
  defineField,
  defineType,
  type SlugInputProps,
  type StringInputProps,
} from 'sanity';

const countTextStyle: React.CSSProperties = {
  color: '#6b7280',
  fontSize: '0.8125rem',
  marginTop: '0.375rem',
};

const stringInputWithCount = (maxChars: number) =>
  function StringInputWithCount(props: StringInputProps) {
    const currentLength = typeof props.value === 'string' ? props.value.length : 0;

    return React.createElement(
      'div',
      null,
      props.renderDefault(props),
      React.createElement(
        'div',
        { style: countTextStyle },
        `${currentLength}/${maxChars} characters`,
      ),
    );
  };

function slugInputWithCount(props: SlugInputProps) {
  const currentLength =
    typeof props.value?.current === 'string' ? props.value.current.length : 0;

  return React.createElement(
    'div',
    null,
    props.renderDefault(props),
    React.createElement(
      'div',
      { style: countTextStyle },
      `${currentLength}/100 characters`,
    ),
  );
}

export const projectType = defineType({
  title: 'projectType',
  name: 'projectType',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      description: 'Project title shown across listing cards and the project hero. (Max 100 characters)',
      validation: (Rule) => Rule.required().max(100),
      components: {
        input: stringInputWithCount(100),
      },
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      description: 'URL segment for this project page (for example: project-name). (Max 100 characters)',
      options: {
        source: 'title',
        maxLength: 100,
      },
      validation: (Rule) => Rule.required(),
      components: {
        input: slugInputWithCount,
      },
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      description: 'Publication date used for ordering and display.',
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
      description: 'Useful links shown in the project hero (for example: paper, repo, site, or PDF download).',
      of: [
        defineField({
          name: 'link',
          type: 'object',
          description: 'One link label with either a URL or an uploaded PDF.',
          validation: (Rule) =>
            Rule.custom((value) => {
              const linkValue = value as
                | {
                    url?: string;
                    pdf?: { asset?: { _ref?: string } };
                  }
                | undefined;

              if (!linkValue) return true;

              const hasUrl = Boolean(linkValue.url);
              const hasPdf = Boolean(linkValue.pdf?.asset?._ref);

              if (!hasUrl && !hasPdf) {
                return 'Add either a URL or a PDF file.';
              }

              if (hasUrl && hasPdf) {
                return 'Use either URL or PDF, not both.';
              }

              return true;
            }),
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              description: 'Short link label shown on the page.',
            }),
            defineField({
              name: 'url',
              type: 'url',
              description: 'Destination URL (optional when using PDF).',
            }),
            defineField({
              name: 'pdf',
              type: 'file',
              description: 'Optional PDF file to offer as a download.',
              options: {
                accept: 'application/pdf',
              },
            }),
          ],
        }),
      ],
    }),
    defineField({
      name: 'people',
      title: 'People',
      type: 'array',
      description:
        'Everyone associated with this project. Choose Project leader for leads and Contributor for all others. Each person is listed once with a single role.',
      of: [
        {
          type: 'object',
          name: 'projectMember',
          fields: [
            defineField({
              name: 'person',
              type: 'reference',
              to: [{ type: 'peopleType' }],
              description: 'Person record from the directory.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'role',
              type: 'string',
              title: 'Role',
              options: {
                list: [
                  { title: 'Project leader', value: 'leader' },
                  { title: 'Contributor', value: 'contributor' },
                ],
                layout: 'radio',
              },
              initialValue: 'contributor',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              name: 'person.fullname',
              role: 'role',
            },
            prepare({ name, role }) {
              return {
                title: name || 'Person',
                subtitle: role === 'leader' ? 'Project leader' : 'Contributor',
              };
            },
          },
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
      description: 'Short summary shown in the project hero section. (Max 300 characters)',
      validation: (Rule) => Rule.max(300),
      components: {
        input: stringInputWithCount(300),
      },
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
