# Sanity CMS Integration

This project uses [Sanity](https://www.sanity.io/) as its headless CMS, embedded directly into the Next.js app. Content editors manage data through a Studio UI served at `/studio`, and the frontend fetches content via GROQ queries.

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
    ├── datasetType.ts      # `Dataset` document schema
    └── blockContentType.ts # Reusable rich text block content from Sanity's startup code

sanity.config.ts            # Main Studio configuration (plugins, schemas, basePath)
sanity.cli.ts               # Sanity CLI configuration
```

---

## Adding a New Schema

1. **Create the schema file** in `sanity/schemaTypes/`

2. **Register it** in `sanity/schemaTypes/index.ts`

3. **Add it to the Studio sidebar** in `sanity/structure.ts` (optional)
