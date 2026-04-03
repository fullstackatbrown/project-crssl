import { client } from "@/sanity/lib/client";
import Link from "next/link";

type Author = {
  _id: string;
  name: string;
  affiliation?: string;
};

type Paper = {
  _id: string;
  title: string;
  slug?: string;
  date: string;
  type: "Working Paper" | "Report" | "Policy Brief";
  abstract?: string;
  tags?: string[];
  externalUrl?: string;
  pdfUrl?: string;
  authors: Author[];
};

const PAPERS_QUERY =
  '*[_type == "paperType"] | order(date desc, title asc) {' +
  "  _id," +
  "  title," +
  '  "slug": slug.current,' +
  "  date," +
  "  type," +
  "  abstract," +
  "  tags," +
  "  externalUrl," +
  '  "pdfUrl": pdf.asset->url,' +
  '  "authors": authors[]->{' +
  "    _id," +
  "    name," +
  "    affiliation" +
  "  }" +
  "}";

const options = { next: { revalidate: 30 } };

function getPaperHref(paper: Paper): string {
  if (paper.pdfUrl) return paper.pdfUrl;
  if (paper.externalUrl) return paper.externalUrl;
  if (paper.slug) return "/research/papers/" + paper.slug;
  return "";
}

function PaperTile({ paper }: { paper: Paper }) {
  const href = getPaperHref(paper);
  const hasLink = href.length > 0;
  const isExternal = hasLink && href.startsWith("http");

  return (
    <li className="grid grid-cols-1 border-b border-zinc-300 md:grid-cols-[1fr_180px]">
      <div className="px-6 py-7 md:px-8">
        <h2 className="font-serif text-2xl text-black">
          {hasLink ? (
            <a
              href={href}
              className="hover:text-[#a51c30]"
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              {paper.title}
            </a>
          ) : (
            <span>{paper.title}</span>
          )}
        </h2>
        <p className="mt-2 text-xs text-zinc-700">
          {paper.authors?.map((a) => a.name).join(", ") || "Unknown"}
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-zinc-600">
          {new Date(paper.date).toLocaleDateString()}
        </p>
        {!hasLink ? (
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#a51c30]">
            No link available
          </p>
        ) : null}
      </div>
      <div className="px-6 py-7 text-left text-sm font-semibold text-[#a51c30] md:text-right">
        {paper.type}
      </div>
    </li>
  );
}

export default async function PapersPage() {
  const papers = await client.fetch<Paper[]>(PAPERS_QUERY, {}, options);
  const filters = Array.from(new Set(papers.map((paper) => paper.type)));

  return (
    <div className="bg-white text-black">
      <section className="bg-black px-6 py-14 text-white md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-serif text-4xl md:text-5xl">Research</h1>
          <p className="mt-2 max-w-xl text-sm text-zinc-300">
            CRSSL conducts research in conflict, elections, and institutions.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-x border-zinc-300 bg-white">
        <div className="grid grid-cols-3 border-b border-zinc-300 text-center text-sm font-semibold uppercase tracking-wide">
          <Link
            href="/research/projects"
            className="border-r border-zinc-300 px-4 py-4 hover:bg-zinc-50 hover:text-[#a51c30]"
          >
            Projects
          </Link>
          <div className="border-r border-zinc-300 bg-black px-4 py-4 text-white">
            Papers
          </div>
          <div className="px-4 py-4 text-zinc-500">Explainers</div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr]">
          <aside className="border-b border-r border-zinc-300 p-6 md:border-b-0">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#a51c30]">
              Filter
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-zinc-700">
              {filters.length > 0 ? (
                filters.map((filter) => <span key={filter}>{filter}</span>)
              ) : (
                <span>No filters yet</span>
              )}
            </div>
          </aside>

          <div>
            {papers.length === 0 ? (
              <p className="px-6 py-10 text-sm text-zinc-700 md:px-8">
                No papers found yet. Publish paper entries in Sanity to populate
                this list.
              </p>
            ) : (
              <ul>
                {papers.map((paper) => (
                  <PaperTile key={paper._id} paper={paper} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
