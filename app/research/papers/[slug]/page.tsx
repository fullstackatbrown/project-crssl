import { client } from "@/sanity/lib/client";
import Link from "next/link";

type PaperAuthor = {
  _id: string;
  fullname: string;
  slug?: string;
};

type Paper = {
  _id: string;
  title: string;
  date: string;
  type: string;
  abstract?: string;
  tags?: string[];
  externalUrl?: string;
  pdfUrl?: string;
  authors?: PaperAuthor[];
};

const PAPER_QUERY =
  '*[_type == "paperType" && slug.current == $slug][0]{' +
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

export default async function PaperPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const paper = await client.fetch<Paper | null>(
    PAPER_QUERY,
    { slug },
    options,
  );

  if (!paper) return <div>Paper not found</div>;

  return (
    <div>
      <Link href="/research/papers">{"< Papers"}</Link>

      <h1 className="mt-4 text-3xl font-semibold">{paper.title}</h1>
      <p className="mt-2 text-sm text-zinc-600">
        {new Date(paper.date).toLocaleDateString()} • {paper.type}
      </p>
      <p className="mt-2 text-sm text-zinc-700">
        {paper.authors?.length
          ? paper.authors.map((author, index) => (
              <span key={author._id}>
                {index > 0 ? ", " : ""}
                {author.slug ? (
                  <Link
                    href={`/people/${author.slug}`}
                    className="hover:text-[#a51c30] hover:underline"
                  >
                    {author.fullname}
                  </Link>
                ) : (
                  <span>{author.fullname}</span>
                )}
              </span>
            ))
          : "Unknown"}
      </p>

      {paper.abstract ? <p className="mt-6">{paper.abstract}</p> : null}

      <div className="mt-6 flex gap-4">
        {paper.pdfUrl ? (
          <a
            href={paper.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Open PDF
          </a>
        ) : null}
        {paper.externalUrl ? (
          <a
            href={paper.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            External Link
          </a>
        ) : null}
      </div>
    </div>
  );
}
