import Link from "next/link";
import { client } from '../../sanity/lib/client';

const researchLinks = [
  { name: "Projects", href: "/research/projects" },
  { name: "Papers", href: "/research/papers" },
  { name: "Explainers", href: "/research/explainers" },
];

type ResearchPageHero = {
    image?: { alt?: string; asset?: { url?: string } };
    heading?: string;
    subtext?: string;
};


async function getResearchPageHero(): Promise<ResearchPageHero> {
    return client.fetch(`*[_type == "researchPage"][0].hero{ heading, subtext, image{ alt, asset->{ url } } }`)
}
const [researchPageHero] = await Promise.all([getResearchPageHero()]);

export default function ResearchBanner({ active }: { active?: string }) {
  return (
    <>

      <div className="relative w-full h-[420px] overflow-hidden bg-primary">
        {researchPageHero?.image?.asset?.url && (
            <img
            src={researchPageHero.image.asset.url}
            alt={researchPageHero.image.alt ?? ""}
            className="h-full w-full object-cover"
            />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

        <div className="absolute bottom-8 left-8 max-w-3xl text-white">
            <h1 className="font-main-serif text-4xl font-semibold tracking-tight md:text-5xl">
            {researchPageHero?.heading ?? "Research"}
            </h1>
            <p className="font-main-sans mt-3 max-w-3xl text-sm font-light leading-6 md:text-base">
            {researchPageHero?.subtext ?? "CRSSL conducts research in conflict, elections, and institutions."}
            </p>
        </div>
    </div>


      <section className="mx-auto max-w-6xl border-x border-zinc-300 bg-white">
        <div className="grid grid-cols-3 border-b border-zinc-300 text-center">
          {researchLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`font-main-sans border-r border-zinc-300 px-4 py-4 text-sm font-medium uppercase tracking-wide transition
                hover:bg-zinc-50 hover:text-primary
                ${active === link.name.toLowerCase() ? "text-primary border-b-2 border-b-primary" : "text-black"}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}