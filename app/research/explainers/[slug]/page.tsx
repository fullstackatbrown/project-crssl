import { client } from "@/sanity/lib/client";
import { type SanityDocument } from "next-sanity";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

const MAROON = "#6b0f1a";

const EXPLAINER_QUERY = `
  *[_type == "explainerSectionType" && defined(explainers[slug.current == $slug])][0] {
    "sectionTitle": title,
    "explainer": explainers[slug.current == $slug][0] {
      title,
      blurb,
      content
    }
  }
`;

const options = { next: { revalidate: 30 } };

const portableTextComponents = {
  block: {
    h2: ({ children }: any) => (
      <h2 className="mt-8 mb-4 font-serif text-3xl">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="mt-7 mb-3 font-serif text-2xl">{children}</h3>
    ),
    h4: ({ children }: any) => (
      <h4 className="mt-6 mb-2 text-xl font-semibold">{children}</h4>
    ),
    normal: ({ children }: any) => (
      <p className="my-3 leading-relaxed text-zinc-800">{children}</p>
    ),
  },
  marks: {
    link: ({ value, children }: any) => (
      <a
        href={value.href}
        className="underline hover:text-[#6b0f1a]"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="my-4 list-disc space-y-2 pl-6">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-zinc-800">{children}</li>
    ),
  },
};

export default async function ExplainerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const result = await client.fetch<SanityDocument | null>(
    EXPLAINER_QUERY,
    { slug },
    options,
  );

  const explainer = result?.explainer;

  if (!explainer) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center text-zinc-500">
        Explainer not found.
      </div>
    );
  }

  return (
    <div className="bg-white text-black">
      <section
        className="px-6 py-14 text-white md:px-10 md:py-20"
        style={{ backgroundColor: MAROON }}
      >
        <div className="mx-auto max-w-3xl">
          {result.sectionTitle && (
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-white/70">
              {result.sectionTitle}
            </p>
          )}
          <h1 className="font-serif text-4xl md:text-5xl">{explainer.title}</h1>
          {explainer.blurb && (
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/80">
              {explainer.blurb}
            </p>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-6 py-12 md:px-10">
        <Link
          href="/research/explainers"
          className="text-sm text-zinc-500 hover:text-zinc-800"
        >
          ← Back to Explainers
        </Link>

        {explainer.content && (
          <div className="mt-8">
            <PortableText
              value={explainer.content}
              components={portableTextComponents}
            />
          </div>
        )}
      </div>
    </div>
  );
}
