import { PortableText } from "@portabletext/react";
import { sanityFetch } from "@/sanity/lib/live";

const ABOUT_PAGE_QUERY = `*[_type == "about"][0]{
  siteTitle,
  siteSubtitle,
  navLinks[]{ label, href },
  hero{
    overlayHeading,
    overlayText,
    backgroundImage{
      alt,
      asset->{ url }
    }
  },
  missionSection{
    heading,
    body,
    image{
      alt,
      asset->{ url }
    }
  },
  historySection{
    heading,
    items[]{ year, title, description }
  },
  impactSection{
    heading,
    body
  }
}`;

type NavLink = {
  label: string;
  href: string;
};

type AboutData = {
  siteTitle?: string;
  siteSubtitle?: string;
  navLinks?: NavLink[];
  hero?: {
    overlayHeading?: string;
    overlayText?: string;
    backgroundImage?: {
      alt?: string;
      asset?: { url?: string };
    };
  };
  missionSection?: {
    heading?: string;
    body?: any[];
    image?: {
      alt?: string;
      asset?: { url?: string };
    };
  };
  historySection?: {
    heading?: string;
    items?: {
      year?: string;
      title?: string;
      description?: string;
    }[];
  };
  impactSection?: {
    heading?: string;
    body?: any[];
  };
};

function SideNav({ navLinks }: { navLinks?: NavLink[] }) {
  return (
    <aside className="hidden lg:block lg:w-64">
      <nav className="sticky top-24 space-y-4 pl-8">
        {navLinks?.map((link) => (
          <a
            key={`${link.label}-${link.href}`}
            href={link.href}
            className="block text-sm text-neutral-700 transition hover:text-blue-600"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

function Hero({ hero }: { hero?: AboutData["hero"] }) {
  return (
    <section className="relative h-[460px] w-full overflow-hidden md:h-[540px]">
      {hero?.backgroundImage?.asset?.url && (
        <img
          src={hero.backgroundImage.asset.url}
          alt={hero.backgroundImage.alt || "Hero image"}
          className="h-full w-full object-cover"
        />
      )}

      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black via-black/65 to-transparent px-8 py-10 text-white md:px-12 md:py-12">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-4xl font-serif md:text-5xl">
            {hero?.overlayHeading}
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 md:text-base">
            {hero?.overlayText}
          </p>
        </div>
      </div>
    </section>
  );
}

function MissionSection({
  missionSection,
}: {
  missionSection?: AboutData["missionSection"];
}) {
  return (
    <section id="about" className="bg-neutral-100 px-8 py-16 text-black md:py-20">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <div className="max-w-2xl">
          {missionSection?.heading && (
            <h3 className="mb-8 text-3xl font-semibold md:text-4xl">
              {missionSection.heading}
            </h3>
          )}
          <div className="prose prose-invert max-w-none text-base leading-8">
            <PortableText value={missionSection?.body ?? []} />
          </div>
        </div>

        {missionSection?.image?.asset?.url && (
          <div className="flex justify-center md:justify-end">
            <img
              src={missionSection.image.asset.url}
              alt={missionSection.image.alt || "Mission image"}
              className="max-h-[360px] w-full max-w-md object-cover shadow-2xl"
            />
          </div>
        )}
      </div>
    </section>
  );
}

function HistorySection({
  historySection,
}: {
  historySection?: AboutData["historySection"];
}) {
  return (
    <section id="history" className="bg-neutral-100 px-8 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <h3 className="text-2xl font-semibold">{historySection?.heading}</h3>

        <div className="mt-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-black" />
          <div className="h-2.5 w-2.5 rounded-full bg-black" />
          <div className="h-px flex-[12] bg-black" />
        </div>

        <div className="mt-8 overflow-x-auto">
          <div className="flex min-w-max gap-3">
            {historySection?.items?.map((item, index) => (
              <div
                key={`${item.year}-${index}`}
                className="w-72 min-h-[220px] border border-neutral-300 bg-neutral-100 p-5"
              >
                <p className="text-sm text-neutral-700">{item.year}</p>
                {item.title && (
                  <h4 className="mt-4 text-base font-semibold text-black">
                    {item.title}
                  </h4>
                )}
                <p className="mt-4 text-sm leading-6 text-neutral-700">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ImpactSection({
  impactSection,
}: {
  impactSection?: AboutData["impactSection"];
}) {
  return (
    <section id="impact" className="bg-neutral-100 px-8 py-16 md:py-20">
      <div className="mx-auto max-w-7xl">
        <h3 className="text-2xl font-semibold">{impactSection?.heading}</h3>
        <div className="prose mt-8 max-w-none text-sm leading-7 text-neutral-800 md:text-base">
          <PortableText value={impactSection?.body ?? []} />
        </div>
      </div>
    </section>
  );
}

export default async function AboutPage() {
  const { data } = await sanityFetch({ query: ABOUT_PAGE_QUERY });
  const aboutData = data as AboutData | null;

  if (!aboutData) {
    return <main className="p-8">No about page content found.</main>;
  }

  return (
    <main className="bg-white text-black">

      <Hero hero={aboutData.hero} />

      <div className="mx-auto flex max-w-7xl gap-10 px-6 py-10">
        <div className="min-w-0 flex-1">
          <MissionSection missionSection={aboutData.missionSection} />
          <HistorySection historySection={aboutData.historySection} />
          <ImpactSection impactSection={aboutData.impactSection} />
        </div>

        <SideNav navLinks={aboutData.navLinks} />
      </div>
    </main>
  );
}