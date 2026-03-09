# Sanity CMS Integration

This project uses [Sanity](https://www.sanity.io/) as its headless CMS, embedded directly into the Next.js app using [next-sanity](https://www.sanity.io/plugins/next-sanity) ([github](https://github.com/sanity-io/next-sanity)). Content editors manage data through a Studio UI served at `/studio`, and the frontend fetches content via GROQ queries.

- To edit CMS content, open `http://localhost:3000/studio` to access the Sanity Studio.
- To see examples of how to fetch and render Sanity content on the frontend, see the example dataset page at `http://localhost:3000/sanity-example`.

---

## Prerequisites

- Access to the Sanity project (ask a team member for an invite at [sanity.io/manage](https://sanity.io/manage))
- Environment variables `.env.local` configured (see below)

---

## Environment Variables

Create a `.env.local` file at the project root with the following:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=a9upj7is
NEXT_PUBLIC_SANITY_DATASET=production
```

All variables are prefixed with `NEXT_PUBLIC_` because they are read on both the server and client. They are validated at startup in [sanity/env.ts](./env.ts); The app will throw an error if any are missing.

---

## Accessing the Studio

Once the dev server is running (`npm run dev`), navigate to:

```
http://localhost:3000/studio
```

The Studio is embedded using `next-sanity`. It renders fullscreen, the site Navbar and Footer are hidden on `/studio` routes via [app/components/SiteWrapper.tsx](../app/components/SiteWrapper.tsx).

You must be logged into Sanity to use the Studio.

---

## Sanity Related Project Structure

```
sanity/
├── env.ts                  # Validates required environment variables
├── structure.ts            # Studio sidebar navigation order
├── lib/
│   ├── client.ts           # Sanity client for data fetching
│   ├── image.ts            # urlFor() helper for Sanity image assets
│   └── live.ts             # sanityFetch + SanityLive for live content
└── schemaTypes/
    ├── index.ts            # Registers all schemas
    ├── xxxxType.ts         # document schema

sanity.config.ts            # Main Studio configuration (plugins, schemas, basePath)
sanity.cli.ts               # Sanity CLI configuration
```

---

## Adding a New Schema

1. **Create the schema file** in `sanity/schemaTypes/`

2. **Register it** in `sanity/schemaTypes/index.ts`

3. **Add it to the Studio sidebar** in `sanity/structure.ts` (optional)

---

## Removing a Schema

I strongly recommend going to the studio and deleting all documents of that type before deleting the schema file to avoid orphaned data. Otherwise, you can only delete them via Sanity API or CLI.

---

## Useful Sanity Links

- [Displaying content in Next.js](https://www.sanity.io/docs/next-js-quickstart/diplaying-content-in-next-js)
- [Query Cheat Sheet - GROQ](https://www.sanity.io/docs/content-lake/query-cheat-sheet)
- [Schemas and Forms](https://www.sanity.io/docs/studio/schemas-and-forms)
- [File](https://www.sanity.io/docs/studio/file-type)
