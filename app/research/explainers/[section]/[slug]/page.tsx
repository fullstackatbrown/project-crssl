import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import type { PortableTextComponents } from "@portabletext/react";
import Link from "next/link";
import type { ReactNode } from "react";

const MAROON = "#6b0f1a";

const EXPLAINER_QUERY = `
  *[_type == "explainerSectionType" && coalesce(slug.current, array::join(string::split(lower(title), " "), "-")) == $section && defined(explainers[coalesce(slug.current, array::join(string::split(lower(title), " "), "-")) == $slug])][0] {
    "sectionTitle": title,
    "explainer": explainers[coalesce(slug.current, array::join(string::split(lower(title), " "), "-")) == $slug][0] {
      title,
      blurb,
      content,
      attachments[] {
        title,
        file {
          asset->{
            url,
            originalFilename
          }
        }
      }
    }
  }
`;

const options = { next: { revalidate: 30 } };

type PortableTextBlockProps = {
  children: ReactNode;
};

type PortableTextLinkProps = {
  value?: {
    href?: string;
  };
  children: ReactNode;
};

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }: PortableTextBlockProps) => (
      <h2 className="mt-8 mb-4 font-main-serif text-3xl">{children}</h2>
    ),
    h3: ({ children }: PortableTextBlockProps) => (
      <h3 className="mt-7 mb-3 font-main-serif text-2xl">{children}</h3>
    ),
    h4: ({ children }: PortableTextBlockProps) => (
      <h4 className="mt-6 mb-2 text-xl font-semibold">{children}</h4>
    ),
    normal: ({ children }: PortableTextBlockProps) => (
      <p className="my-3 leading-relaxed text-zinc-800">{children}</p>
    ),
  },
  marks: {
    link: ({ value, children }: PortableTextLinkProps) => (
      <a
        href={value?.href}
        className="underline hover:text-[#6b0f1a]"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: PortableTextBlockProps) => (
      <ul className="my-4 list-disc space-y-2 pl-6">{children}</ul>
    ),
  },
  listItem: {
    bullet: ({ children }: PortableTextBlockProps) => (
      <li className="text-zinc-800">{children}</li>
    ),
  },
};

type Attachment = {
  title?: string;
  file?: {
    asset?: {
      url?: string;
      originalFilename?: string;
    };
  };
};

type ExplainerResult = {
  sectionTitle?: string;
  explainer?: {
    title?: string;
    blurb?: string;
    content?: unknown;
    attachments?: Attachment[];
  };
};

export default async function ExplainerPage({
  params,
}: {
  params: Promise<{ section: string; slug: string }>;
}) {
  const { section, slug } = await params;

  const result = await client.fetch<ExplainerResult | null>(
    EXPLAINER_QUERY,
    { section, slug },
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
    <div className="bg-white font-main-sans text-black">
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
          <h1 className="font-main-serif text-4xl md:text-5xl">{explainer.title}</h1>
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

        {explainer.attachments?.length ? (
          <section className="mt-12 border-t border-zinc-200 pt-8">
            <h2 className="font-main-serif text-2xl text-[#6b0f1a]">
              Attachments
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              {explainer.attachments.map((attachment) => {
                const fileUrl = attachment.file?.asset?.url;
                const fileName =
                  attachment.file?.asset?.originalFilename ??
                  attachment.title ??
                  "Download";

                if (!fileUrl) return null;

                return (
                  <a
                    key={`${attachment.title ?? fileName}-${fileUrl}`}
                    href={`${fileUrl}?dl=`}
                    download
                    className="inline-flex w-fit items-center gap-2 border border-zinc-300 px-3 py-2 text-sm text-zinc-700 transition hover:bg-zinc-50 hover:text-zinc-900"
                  >
                    {attachment.title ?? fileName}
                  </a>
                );
              })}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
}
