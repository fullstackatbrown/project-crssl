import { client } from "@/sanity/lib/client";
import Link from "next/link";
import PapersFilterable from "./PapersFilterable";

type Author = {
  _id: string;
  fullname: string;
  slug?: string;
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
  "    fullname," +
  '    "slug": slug.current' +
  "  }" +
  "}";

const options = { next: { revalidate: 30 } };

export default async function PapersPage() {
  const papers = await client.fetch<Paper[]>(PAPERS_QUERY, {}, options);

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

        {papers.length === 0 ? (
          <p className="px-6 py-10 text-sm text-zinc-700 md:px-8">
            No papers found yet. Publish paper entries in Sanity to populate
            this list.
          </p>
        ) : (
          <PapersFilterable papers={papers} />
        )}
      </section>
    </div>
  );
}
