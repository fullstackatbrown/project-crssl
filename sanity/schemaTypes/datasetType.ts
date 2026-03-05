import { defineField } from "sanity";
import {ArchiveIcon} from '@sanity/icons'

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
    ],
}