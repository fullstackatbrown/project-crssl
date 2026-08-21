import { defineField, defineType } from "sanity";

export const homeHeaderType = defineType({
  name: "homeHeader",
  title: "Homepage Header",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Internal Title",
      type: "string",
      initialValue: "Homepage Header",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "Short homepage intro text shown next to the CRSSL logo.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bannerMedia",
      title: "Banner Media",
      type: "object",
      description: "Upload a banner image/GIF or a video. GIFs work in the image field.",
      validation: (Rule) =>
        Rule.custom((value) => {
          const media = value as
            | {
                mediaType?: "image" | "video";
                image?: { asset?: { _ref?: string } };
                video?: { asset?: { _ref?: string } };
              }
            | undefined;

          if (!media) {
            return "Add a banner image or video.";
          }

          if (media.mediaType === "image" && !media.image?.asset?._ref) {
            return "Add a banner image or GIF.";
          }

          if (media.mediaType === "video" && !media.video?.asset?._ref) {
            return "Add a banner video.";
          }

          return true;
        }),
      fields: [
        defineField({
          name: "mediaType",
          title: "Media Type",
          type: "string",
          options: {
            list: [
              { title: "Image / GIF", value: "image" },
              { title: "Video", value: "video" },
            ],
            layout: "radio",
          },
          initialValue: "image",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "image",
          title: "Banner Image / GIF",
          type: "image",
          options: { hotspot: true },
          description: "Use this for still images or GIFs.",
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
          hidden: ({ parent }) => parent?.mediaType !== "image",
        }),
        defineField({
          name: "video",
          title: "Banner Video",
          type: "file",
          options: {
            accept: "video/*",
          },
          description: "Use a short looping banner video.",
          hidden: ({ parent }) => parent?.mediaType !== "video",
        }),
      ],
      preview: {
        select: {
          mediaType: "mediaType",
          imageAlt: "image.alt",
          videoName: "video.asset.originalFilename",
        },
        prepare({ mediaType, imageAlt, videoName }) {
          return {
            title: mediaType === "video" ? "Video banner" : "Image / GIF banner",
            subtitle:
              mediaType === "video"
                ? videoName || "Uploaded video"
                : imageAlt || "Uploaded image",
          };
        },
      },
    }),
  ],
  preview: {
    select: { title: "title" },
  },
});
