import { defineField } from "sanity";
import { ArchiveIcon, TagsIcon, LinkIcon } from '@sanity/icons'

export const datasetType = {
    name: 'dataset',
    title: 'Dataset',
    type: 'document',
    icon: ArchiveIcon,
    fields: [
        defineField({
            name: 'name',
            title: 'Name',
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
            title: 'Date',
            type: 'date',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'description',
            type: 'text',
        }),
        defineField({
            name: 'tags',
            title: 'Tags',
            type: 'array',
            of: [{
                type: 'object',
                icon: TagsIcon,
                fields: [
                    defineField({
                        name: 'tag',
                        title: 'Tag',
                        type: 'string',
                        description: 'Lowercase, underscores as spaces, hyphens for compound words — e.g. "time_series" or "pre-trained_models"',
                        validation: Rule => Rule.required().custom(tag => {
                            if (typeof tag === 'undefined') return true
                            if (/[A-Z]/.test(tag)) return 'Must be lowercase'
                            if (/^[_-]/.test(tag)) return 'Cannot start with an underscore or hyphen'
                            if (/[_-]$/.test(tag)) return 'Cannot end with an underscore or hyphen'
                            if (/[_-]{2,}/.test(tag)) return 'No consecutive underscores or hyphens'
                            if (/[^a-z0-9_-]/.test(tag)) return 'Only letters, numbers, underscores and hyphens allowed'
                            return true
                        })
                    })
                ],
                preview: { select: { title: 'tag' } }
            }],
            validation: Rule => Rule.custom(tags => {
                if (!tags) return true
                const values = tags.map(t => t.tag)
                const unique = new Set(values)
                return unique.size === values.length ? true : 'Duplicate tags found.'
            }).warning()
        }),
        defineField({
            name: 'files',
            title: 'Files',
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
            title: 'Links',
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
