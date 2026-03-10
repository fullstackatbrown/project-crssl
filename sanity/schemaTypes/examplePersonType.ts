import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const examplePersonType = defineType({
    name: "examplePerson",
    title: "Example Person",
    type: "document",
    icon: UserIcon,
    fields: [
        defineField({
            name: "name",
            type: "string",
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "name",
            },
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: "role",
            type: "string",
        }),
        defineField({
            name: "bio",
            type: "text",
        }),
        defineField({
            name: "image",
            type: "image",
            options: { hotspot: true },
        }),
    ],
});
