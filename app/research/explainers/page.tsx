import Link from "next/link";
import { client } from "@/sanity/lib/client";

const MAROON = "#6b0f1a";

type ExplainerCard = {
  _key: string;
  title: string;
  slug: { current: string };
};

type ExplainerSection = {
  _id: string;
  title: string;
  description: string;
  explainers: ExplainerCard[];
};

const EXPLAINERS_QUERY = `
  *[_type == "explainerSectionType"] | order(order asc) {
    _id,
    title,
    description,
    explainers[] {
      _key,
      title,
      slug
    }
  }
`;

const options = { next: { revalidate: 30 } };

async function getExplainerSections(): Promise<ExplainerSection[]> {
  const sections = await client.fetch<ExplainerSection[]>(
    EXPLAINERS_QUERY,
    {},
    options,
  );
  return sections ?? [];
}

function ExplainerCard({
  card,
  highlighted,
}: {
  card: ExplainerCard;
  highlighted: boolean;
}) {
  return (
    <article
      className="flex min-h-48 flex-col justify-between p-6"
      style={
        highlighted
          ? { backgroundColor: MAROON }
          : {
              backgroundColor: "#ffffff",
              border: "1px solid #e4e4e7",
              borderBottomWidth: "3px",
              borderBottomColor: MAROON,
            }
      }
    >
      <h3
        className="font-serif text-xl leading-snug"
        style={{ color: highlighted ? "#ffffff" : "#000000" }}
      >
        {card.title}
      </h3>
      <Link
        href={`/research/explainers/${card.slug.current}`}
        className="mt-4 inline-block text-sm underline underline-offset-2"
        style={{ color: highlighted ? "#ffffff" : MAROON }}
      >
        Learn more
      </Link>
    </article>
  );
}

export default async function ExplainersPage() {
  const sections = await getExplainerSections();

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
            className="border-r border-zinc-300 px-4 py-4 hover:bg-zinc-50 hover:text-[#6b0f1a]"
          >
            Projects
          </Link>
          <Link
            href="/research/papers"
            className="border-r border-zinc-300 px-4 py-4 hover:bg-zinc-50 hover:text-[#6b0f1a]"
          >
            Papers
          </Link>
          <div className="bg-black px-4 py-4 text-white">Explainers</div>
        </div>

        <div className="px-6 py-14 md:px-10">
          {sections.length === 0 ? (
            <p className="text-sm text-zinc-500">
              Nothing here yet. Add a section in Sanity to get started.
            </p>
          ) : (
            sections.map((section) => (
              <div key={section._id} className="mb-14">
                <h2
                  className="font-serif text-3xl md:text-4xl"
                  style={{ color: MAROON }}
                >
                  {section.title}
                </h2>
                {section.description && (
                  <p className="mt-2 text-sm text-zinc-700">
                    {section.description}
                  </p>
                )}
                {section.explainers?.length > 0 ? (
                  <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {section.explainers.map((card, i) => (
                      <ExplainerCard
                        key={card._key}
                        card={card}
                        highlighted={i === 0}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="mt-4 text-sm text-zinc-400">
                    No explainers added to this section yet.
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
