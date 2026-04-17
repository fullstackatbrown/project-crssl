import { defineField, defineType } from "sanity";

export const dataPageType = defineType({
    name: 'dataPage',
    title: 'Data Page',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Internal Title',
            type: 'string',
            initialValue: 'Data Page',
            validation: Rule => Rule.required(),
        }),
        defineField({
            name: 'hero',
            title: 'Hero Section',
            type: 'object',
            fields: [
                defineField({
                    name: 'image',
                    title: 'Hero Image',
                    type: 'image',
                    options: { hotspot: true },
                    fields: [
                        defineField({
                            name: 'alt',
                            title: 'Alt Text',
                            type: 'string',
                        }),
                    ],
                }),
                defineField({
                    name: 'heading',
                    title: 'Heading',
                    type: 'string',
                    initialValue: 'Data',
                }),
                defineField({
                    name: 'subtext',
                    title: 'Subtext',
                    type: 'string',
                }),
            ],
        }),
    ],
    preview: {
        select: { title: 'title' },
    },
});
