import { defineField } from "sanity";
import {ArchiveIcon} from '@sanity/icons'

export const exampleDatasetType = {
    name: 'exampleDataset',
    title: 'Example Dataset',
    type: 'document',
    icon: ArchiveIcon,
    fields: [
        defineField({
            name: 'name',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'slug',
            type: 'slug',
            options: {
                source: 'name',
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'publishedAt',
            type: 'datetime',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'description',
            type: 'text',
        }),
        defineField({
            name: 'files',
            type: 'array',
            of: [
                defineField({
                    name: 'file',
                    type: 'file',
                    options: {
                        accept: 'text/markdown, text/csv',  // accept only md and csv files
                    },
                }),
            ],
        }),
        defineField({
            name: 'links',
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
            title: 'Contributors',
            type: 'array',
            of: [
                {
                    type: 'reference',
                    to: [{ type: 'examplePerson' }],
                },
            ],
        }),
        defineField({
            name: 'content',
            type: 'blockContent',
        }),
    ],
}