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
import Elipsis from '../project-extra';
import { ProjectMetaPanel } from '../project-meta-panel';

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
      <h2 className="mt-10 mb-4 border-l-4 border-[#a51c30] pl-3 font-serif text-3xl font-semibold text-zinc-900">
        {children}
      </h2>
    ),
    h3: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h3 className="mt-8 mb-3 border-l-2 border-[#a51c30]/50 pl-2.5 font-serif text-2xl font-semibold text-zinc-900">
        {children}
      </h3>
    ),
    h4: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <h4 className="mt-6 mb-2 font-serif text-xl font-semibold text-zinc-900">{children}</h4>
    ),
    normal: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <p className="my-3 text-base leading-7 text-zinc-700">{children}</p>
    ),
  },
  marks: {
    link: ({
      value,
      children,
    }: PortableTextMarkComponentProps<LinkMark>) => (
      <a
        href={value?.href ?? '#'}
        className="font-medium text-zinc-700 underline decoration-zinc-400 underline-offset-2 transition-colors hover:text-[#a51c30] hover:decoration-[#a51c30]/60"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
  list: {
    bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ul className="my-4 list-disc space-y-2 pl-10 text-zinc-700 marker:text-[#a51c30]">
        {children}
      </ul>
    ),
    number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <ol className="my-4 list-decimal space-y-2 pl-10 text-zinc-700 marker:text-[#a51c30]">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <li className="leading-7">{children}</li>
    ),
    number: ({ children }: PortableTextComponentProps<PortableTextBlock>) => (
      <li className="leading-7">{children}</li>
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
  outlineTitle?: string;
  anchorId?: { current?: string };
  body?: PortableTextBlock[];
};

type ProjectPaper = {
  _id: string;
  title: string;
  slug?: string;
  externalUrl?: string;
  pdfUrl?: string;
};

type RelevantLink = {
  _key: string;
  _type: string;
  title: string;
  url?: string;
  pdfUrl?: string;
};

type FetchedProject = SanityDocument & {
  publishedAt?: string;
  coverImage?: string;
  tags?: string[];
  keywords?: string[];
  projectLeader?: string[];
  contributors?: string[];
  relevantLinks?: RelevantLink[];
  pageSections?: ProjectPageSection[];
  papers?: ProjectPaper[];
};

const PAPERS_SECTION_ID = 'related-papers';

function getPaperHref(paper: ProjectPaper): string {
  if (paper.pdfUrl) return paper.pdfUrl;
  if (paper.externalUrl) return paper.externalUrl;
  if (paper.slug) return `/research/papers/${paper.slug}`;
  return '';
}

function getRelevantLinkHref(link: RelevantLink): string {
  if (link.pdfUrl) return link.pdfUrl;
  return link.url ?? '';
}

function getContent(project: FetchedProject) {
  const sections = project.pageSections;

  if (Array.isArray(sections) && sections.length > 0) {
    return (
      <div className="max-w-none space-y-7">
        {sections.map((section: ProjectPageSection) => {
          const id = sectionDomId(section);
          return (
            <section key={section._key} id={id} className="scroll-mt-20">
              <h2 className="mb-4 border-l-4 border-[#a51c30] pl-3 font-serif text-3xl font-semibold text-zinc-900">
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
  tags,
  keywords,
  "projectLeader": people[role == "leader"].person->fullname,
  "contributors": people[role == "contributor"].person->fullname,
  "papers": papers[]->{
    _id,
    title,
    "slug": slug.current,
    externalUrl,
    "pdfUrl": pdf.asset->url
  },
  "relevantLinks": relevantLinks[]{
    _key,
    _type,
    title,
    url,
    "pdfUrl": pdf.asset->url
  }, 
  pageSections,
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
  const papers = project.papers ?? [];
  const hasSectionNav =
    Array.isArray(pageSections) && pageSections.length > 0;
  const hasPapers = papers.length > 0;
  const formattedPublishedDate = project.publishedAt
    ? new Date(project.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })
    : null;
  return (
    <div className="overflow-x-visible">
      <div className="relative h-[400px] w-full overflow-hidden">
        <img className="w-full h-full object-cover" src={project.coverImage} />

        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

        <div className="absolute inset-0 grid grid-cols-[1fr_3fr] text-white">
          <div /> {/* empty column to align */}
          <div className="flex w-250 flex-col justify-end p-6">
            <h1 className="font-serif text-4xl font-semibold tracking-tight md:text-5xl">{project.title}</h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-zinc-100">{project.description}</p>
            {project.tags?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 rounded-full border border-white/70 px-3 py-1 text-xs font-medium tracking-wide text-white"
                  >
                    <Elipsis />
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {project.relevantLinks?.map(
                (item: RelevantLink) => {
                  const href = getRelevantLinkHref(item);
                  const isPdfLink = Boolean(item.pdfUrl);

                  if (!href) return null;

                  return (
                    <a
                      className="text-white underline decoration-white/70 underline-offset-2 transition-colors hover:text-[#a51c30] hover:decoration-[#a51c30]"
                      key={item._key}
                      href={href}
                      target={isPdfLink ? undefined : '_blank'}
                      rel={isPdfLink ? undefined : 'noopener noreferrer'}
                      download={isPdfLink ? true : undefined}
                    >
                      {item.title}
                    </a>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 grid grid-cols-[1fr_3fr] overflow-x-visible bg-white">
        {/* Sidebar */}
        <aside className="-mt-24 self-start bg-white p-6 text-zinc-700 sticky top-[10vh]">
          <Link
            href="/research/projects"
            className="text-sm font-medium text-zinc-500 transition-colors hover:text-[#a51c30]"
          >
            {'< Research'}
          </Link>
          <p className="pt-12 font-serif text-lg font-semibold text-zinc-900">In this Group</p>
          {hasSectionNav || hasPapers ? (
            <nav aria-label="On this page" className="mt-3 text-sm">
              <ul className="space-y-2 text-zinc-700">
                {(pageSections ?? []).map((section: ProjectPageSection) => {
                  const href = `#${sectionDomId(section)}`;
                  const outlineLabel = section.outlineTitle || section.title;
                  return (
                    <li key={section._key}>
                      <a
                        href={href}
                        className="font-medium text-zinc-700 underline-offset-2 transition-colors hover:text-[#a51c30] hover:underline"
                      >
                        {outlineLabel}
                      </a>
                    </li>
                  );
                })}
                {hasPapers ? (
                  <li>
                    <a
                      href={`#${PAPERS_SECTION_ID}`}
                      className="font-medium text-zinc-700 underline-offset-2 transition-colors hover:text-[#a51c30] hover:underline"
                    >
                      Related Papers
                    </a>
                  </li>
                ) : null}
              </ul>
            </nav>
          ) : null}
        </aside>

        {/* Main content: meta bar flush under hero (no top padding); body padded below */}
        <div className="w-250 min-w-0 overflow-x-visible flex flex-col text-zinc-700">
          <ProjectMetaPanel
            formattedPublishedDate={formattedPublishedDate}
            keywords={project.keywords}
            projectLeader={project.projectLeader}
            contributors={project.contributors}
          />
          <div className="px-6 pb-6 pt-6">
          {getContent(project)}
          {hasPapers ? (
            <section id={PAPERS_SECTION_ID} className="mt-12 scroll-mt-28 mb-10">
              <h2 className="mb-4 border-l-4 border-[#a51c30] pl-3 font-serif text-3xl font-semibold text-zinc-900">
                Related Papers
              </h2>
              <ul className="space-y-2">
                {papers.map((paper) => {
                  const href = getPaperHref(paper);
                  const hasLink = href.length > 0;
                  const isExternal = hasLink && href.startsWith('http');

                  return (
                    <li key={paper._id} className="text-zinc-700">
                      {hasLink ? (
                        <a
                          href={href}
                          target={isExternal ? '_blank' : undefined}
                          rel={isExternal ? 'noopener noreferrer' : undefined}
                          className="font-medium text-zinc-800 underline decoration-zinc-400 underline-offset-2 transition-colors hover:text-[#a51c30] hover:decoration-[#a51c30]/50"
                        >
                          {paper.title}
                        </a>
                      ) : (
                        <span>{paper.title}</span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
