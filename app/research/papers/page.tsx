import { client } from "@/sanity/lib/client";
import Link from "next/link";
import PapersFilterable from "./PapersFilterable";
import ResearchBanner from "@/app/components/ResearchBanner";

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
      <ResearchBanner active="papers" />

      <section className="mx-auto max-w-6xl border-x border-zinc-300 bg-white">

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
