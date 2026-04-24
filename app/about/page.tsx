import { PortableText } from "@portabletext/react";
import { sanityFetch } from "@/sanity/lib/live";
import { Poppins, Cormorant_Garamond } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const ABOUT_QUERY = `*[_type == "about"][0]{
  title,
  heroTitle,
  heroDescription,
  heroImage{
    asset->{
      url
    },
    alt
  },
  missionBody,
  missionImage{
    asset->{
      url
    },
    alt
  },
  historyTitle,
  historyItems[]{
    year,
    body
  },
  impactTitle,
  impactBody,
  sections[]{
    title,
    body
  }
}`;

export default async function AboutPage() {
  const { data } = await sanityFetch({
    query: ABOUT_QUERY,
  });

  if (!data) {
    return (
      <main className={`min-h-screen bg-white px-6 py-20 ${poppins.className}`}>
        <p className="text-lg text-slate-700">No About page content found.</p>
      </main>
    );
  }

  return (
    <main className={`${poppins.className} bg-white text-black`}>
      <section className="px-0 pt-0">
        <div className="relative mx-auto h-[420px] max-w-[1400px] overflow-hidden border-[6px] border-sky-400">
          {data.heroImage?.asset?.url && (
            <img
              src={data.heroImage.asset.url}
              alt={data.heroImage.alt || data.heroTitle || "About hero image"}
              className="h-full w-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

          <div className="absolute bottom-8 left-8 max-w-3xl text-white">
            <h1 className="text-4xl font-semibold tracking-tight md:text-5xl">
              {data.heroTitle}
            </h1>
            <p className="mt-3 max-w-3xl text-sm font-light leading-6 md:text-base">
              {data.heroDescription}
            </p>
          </div>
        </div>
      </section>

      <section className="bg-black px-6 py-10 md:px-12">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
          <div className="text-white">
            <div className="prose prose-invert max-w-none prose-p:text-[18px] prose-p:leading-[1.7] prose-p:font-light">
              <PortableText value={data.missionBody} />
            </div>
          </div>

          <div className="overflow-hidden">
            {data.missionImage?.asset?.url && (
              <img
                src={data.missionImage.asset.url}
                alt={data.missionImage.alt || "Mission image"}
                className="h-full w-full object-cover"
              />
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#efefef] px-6 py-12 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="text-[22px] font-semibold tracking-tight text-black">
            {data.historyTitle}
          </h2>

          <div className="mt-6 mb-4 flex items-center">
            <div className="h-[2px] flex-1 bg-black" />
            <div className="mx-4 h-4 w-4 rounded-full bg-black" />
            <div className="h-[2px] flex-1 bg-black" />
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="flex min-w-max gap-4">
              {data.historyItems?.map((item: any, index: number) => (
                <div
                  key={`${item.year}-${index}`}
                  className="min-h-[320px] w-[340px] flex-shrink-0 border border-neutral-300 bg-[#f3f3f3] p-8"
                >
                  <h3
                    className={`${cormorant.className} text-[30px] leading-none text-black`}
                  >
                    {item.year}
                  </h3>

                  <div className="prose mt-5 max-w-none prose-p:mb-4 prose-p:text-[16px] prose-p:leading-8 prose-p:text-black">
                    <PortableText value={item.body} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#efefef] px-6 pb-20 pt-4 md:px-12">
        <div className="mx-auto max-w-[1400px]">
          <h2 className="text-[22px] font-semibold tracking-tight text-black">
            {data.impactTitle}
          </h2>

          <div className="mt-6 space-y-6 text-[17px] leading-8 text-black">
            <PortableText value={data.impactBody} />
          </div>
        </div>
      </section>

      {data.sections?.map((section: any, index: number) => (
        <section
          key={`${section.title}-${index}`}
          className="bg-[#efefef] px-6 pb-20 pt-4 md:px-12"
        >
          <div className="mx-auto max-w-[1400px]">
            <h2 className="text-[22px] font-semibold tracking-tight text-black">
              {section.title}
            </h2>

            <div className="mt-6 space-y-6 text-[17px] leading-8 text-black">
              <PortableText value={section.body} />
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}