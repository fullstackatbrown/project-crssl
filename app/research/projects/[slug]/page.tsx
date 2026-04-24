// This is a component to render each page of research
import { type SanityDocument } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextComponentProps,
  type PortableTextComponents,
  type PortableTextMarkComponentProps,
  type PortableTextTypeComponentProps,
} from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);
type ImageBuilder = ReturnType<typeof imageUrlBuilder>;

function urlFor(source: Parameters<ImageBuilder['image']>[0]) {
  return builder.image(source);
}

type LinkMark = { _type: 'link'; href?: string };
type PtImageValue = { _type?: string; alt?: string; asset?: unknown };

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>
    ),
    h3: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h3 className="text-2xl font-bold mt-7 mb-3">{children}</h3>
    ),
    h4: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h4 className="text-xl font-semibold mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="my-2 text-gray-800">{children}</p>
    ),
  },
  marks: {
    link: ({
      value,
      children,
    }: PortableTextMarkComponentProps<LinkMark>) => (
      <a
        href={value?.href ?? '#'}
        className="text-gray-600 underline hover:text-blue-600"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>
    ),
    number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <li className="text-gray-800">{children}</li>
    ),
    number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <li className="text-gray-800">{children}</li>
    ),
  },
  types: {
    image: ({ value }: PortableTextTypeComponentProps<PtImageValue>) => (
      <img
        src={urlFor(value).width(800).url()}
        alt={value.alt || ''}
        className="my-6 rounded-lg"
      />
    ),
  },
};

function slugifyHeading(title: string) {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  return base.length > 0 ? base : 'section';
}

function sectionDomId(section: {
  anchorId?: { current?: string };
  title?: string;
}) {
  if (section.anchorId?.current) {
    return section.anchorId.current;
  }
  if (section.title) {
    return slugifyHeading(section.title);
  }
  return 'section';
}

type ProjectPageSection = {
  _key: string;
  title?: string;
  anchorId?: { current?: string };
  body?: PortableTextBlock[];
};

type FetchedProject = SanityDocument & {
  coverImage?: string;
  pageSections?: ProjectPageSection[];
};

function getContent(project: FetchedProject) {
  const sections = project.pageSections;

  if (Array.isArray(sections) && sections.length > 0) {
    return (
      <div className="max-w-none space-y-12">
        {sections.map((section: ProjectPageSection) => {
          const id = sectionDomId(section);
          return (
            <section key={section._key} id={id} className="scroll-mt-28">
              <h2 className="text-3xl font-serif font-bold border-b border-zinc-200 pb-2 mb-4">
                {section.title}
              </h2>
              {section.body?.length ? (
                <PortableText
                  value={section.body}
                  components={portableTextComponents}
                />
              ) : (
                <p className="text-sm text-zinc-500">No body text in this section yet.</p>
              )}
            </section>
          );
        })}
      </div>
    );
  }

  return (
    <p className="text-zinc-600">No content yet.</p>
  );
}

const PROJECTS_QUERY = `*[_type == "projectType" && slug.current == $slug][0]{
  _id, 
  title, 
  slug, 
  publishedAt, 
  description, 
  relevantLinks, 
  pageSections,
  contributors, 
  "coverImage": coverImage.asset->url
}`;

const options = { next: { revalidate: 30 } };

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await client.fetch<FetchedProject | null>(
    PROJECTS_QUERY,
    { slug },
    options,
  );

  if (!project) {
    return <div>Project not found</div>;
  }

  const pageSections = project.pageSections;
  const hasSectionNav =
    Array.isArray(pageSections) && pageSections.length > 0;

  return (
    <div>
      <div className="relative w-full h-[400px] overflow-hidden">
        <img className="w-full h-full object-cover" src={project.coverImage} />

        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

        <div className="absolute inset-0 grid grid-cols-[1fr_3fr] text-white">
          <div /> {/* empty column to align */}
          <div className="flex flex-col justify-end w-250 p-6">
            <h1 className="text-4xl font-serif">{project.title}</h1>
            <p className="mt-2">{project.description}</p>
            <div className="mt-2">
              {project.relevantLinks?.map(
                (item: {
                  _key: string;
                  _type: string;
                  title: string;
                  url: string;
                }) => {
                  return (
                    <a className="text-white p-2 underline hover:text-blue-500" key={item._key} href={item.url}>
                      {item.title}
                    </a>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_3fr] relative z-10">
        {/* Sidebar */}
        <aside className="bg-white sticky top-[10vh] self-start p-6 -mt-24">
          <Link
            href="/research/projects"
            className="text-gray-500 hover:text-gray-700"
          >
            {'< Research'}
          </Link>
          <p className="font-bold pt-15">In this Group</p>
          {hasSectionNav ? (
            <nav aria-label="On this page" className="mt-3 text-sm">
              <ul className="space-y-1.5 text-gray-600">
                {pageSections.map((section: ProjectPageSection) => {
                  const href = `#${sectionDomId(section)}`;
                  return (
                    <li key={section._key}>
                      <a
                        href={href}
                        className="hover:text-gray-900 underline-offset-2 hover:underline"
                      >
                        {section.title}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          ) : null}
        </aside>

        {/* Main content */}
        <div className="w-250 p-6">{getContent(project)}</div>
      </div>
    </div>
  );
}
