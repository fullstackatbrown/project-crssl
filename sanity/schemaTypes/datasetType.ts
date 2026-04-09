import { defineField } from "sanity";
import { ArchiveIcon, LinkIcon } from '@sanity/icons'

export const datasetType = {
    name: 'dataset',
    title: 'Dataset',
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
            name: 'date',
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
                    icon: LinkIcon,
                    fields: [
                        defineField({
                            name: 'text',
                            type: 'string',
                            validation: Rule => Rule.required()
                        }),
                        defineField({
                            name: 'url',
                            type: 'url',
                            validation: Rule => Rule.required()
                        }),
                    ],
                }),
            ],
        }),
    ],
}
