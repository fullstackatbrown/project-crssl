import { client } from '../sanity/lib/client'
import { HOME_QUERY } from './lib/queries'
import Link from 'next/link'
import Image from 'next/image'
import ScrollRow from './components/ScrollRow'

type CardItem = {
  _id: string
  title?: string
  description?: string
  date?: string
  imageUrl?: string
}

type HomeHeader = {
  title?: string
  description?: string
  bannerMedia?: {
    mediaType?: 'image' | 'video'
    image?: {
      alt?: string
      asset?: {
        url?: string
      }
    }
    video?: {
      asset?: {
        url?: string
        mimeType?: string
      }
    }
  }
}

type Sections = {
  homeHeader?: HomeHeader | null
  news?: CardItem[]
  recentWork?: CardItem[]
  datasets?: CardItem[]
  funders?: CardItem[]
}

const SECTION_CONFIG: {
  key: keyof Sections
  label: string
  href: string
}[] = [
  { key: 'news',       label: 'News',        href: '/news' },
  { key: 'recentWork', label: 'Recent Work',  href: '/projects' },
  { key: 'datasets',   label: 'Data',         href: '/data' },
]

function SlashLogo({ size = 1, color = "var(--color-primary)" }: { size?: number; color?: string }) {
  return (
    <span className="inline-flex items-center">
      <span style={{
        width: `${3 * size}px`,
        height: `${28 * size}px`,
        backgroundColor: color,
        transform: "rotate(20deg)",
        marginRight: `${6 * size}px`,
      }} />
      <span style={{
        width: `${10 * size}px`,
        height: `${28 * size}px`,
        backgroundColor: color,
      }} />
    </span>
  )
}

function HomepageBannerMedia({ homeHeader }: { homeHeader?: HomeHeader | null }) {
  const imageUrl = homeHeader?.bannerMedia?.image?.asset?.url
  const imageAlt =
    homeHeader?.bannerMedia?.image?.alt ??
    homeHeader?.title ??
    "CRSSL homepage banner"
  const videoUrl = homeHeader?.bannerMedia?.video?.asset?.url
  const videoType = homeHeader?.bannerMedia?.video?.asset?.mimeType ?? "video/mp4"

  if (homeHeader?.bannerMedia?.mediaType === "video" && videoUrl) {
    return (
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        aria-label={homeHeader.title ?? "Homepage banner video"}
      >
        <source src={videoUrl} type={videoType} />
      </video>
    )
  }

  if (imageUrl) {
    return (
      <Image
        src={imageUrl}
        alt={imageAlt}
        fill
        sizes="(min-width: 768px) 50vw, 100vw"
        className="object-cover"
      />
    )
  }

  return null
}

export default async function Home() {
  const sections: Sections = await client.fetch(HOME_QUERY)
  const homeHeader = sections.homeHeader
  const hasHomeBannerMedia = Boolean(
    homeHeader?.bannerMedia?.image?.asset?.url ||
      homeHeader?.bannerMedia?.video?.asset?.url,
  )

  return (
      <div className="min-h-screen bg-white text-zinc-900">

      {/* Hero */}
      <section className="relative min-h-[480px] overflow-hidden bg-primary md:min-h-[540px]">
        {hasHomeBannerMedia ? (
          <HomepageBannerMedia homeHeader={homeHeader} />
        ) : null}

        <div className="absolute inset-x-0 bottom-0 h-[44%] bg-gradient-to-t from-black/65 via-black/30 to-transparent" />

        <div className="absolute inset-x-0 bottom-0 flex items-end px-5 py-6 md:px-20 md:py-10">
          <div className="max-w-3xl text-white">
            <div className="ml-0.5 mb-2">
              <SlashLogo size={1.2} color="white" />
            </div>
            <p className="font-main-serif text-[0.95rem] leading-relaxed m-0 md:text-[1.1rem]">
              {homeHeader?.description ??
                "The Conflict Research and Security Studies (CRSS) Lab offers students hands-on experience in data collection, data analysis, and research methods."}
            </p>
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <main>
        {SECTION_CONFIG.map(({ key, label, href }) => {
          const items = sections[key] ?? []

          return (
            <section
              key={key}
              className="border-b border-gray-200 py-8 px-5 flex flex-col gap-3 items-start md:py-12 md:pl-20 md:pr-0 md:grid md:grid-cols-[220px_1fr] md:gap-8"
            >
              <div className="md:pt-2">
                <Link href={href} className="no-underline">
                  <h2 className="font-main-serif font-bold text-xl font-normal text-primary cursor-pointer m-0 md:text-[1.4rem]">
                    {label}
                  </h2>
                </Link>
              </div>

              <div className="min-w-0">
                <ScrollRow items={items} />
              </div>
            </section>
          )
        })}

        {/* Funders */}
        <section className="border-b border-gray-200 py-8 px-5 flex flex-col gap-3 items-start md:py-12 md:pl-20 md:pr-0 md:grid md:grid-cols-[220px_1fr] md:gap-8">
          <div className="md:pt-2">
            <h2 className="font-main-serif text-[1.2rem] font-normal text-primary m-0 md:text-[1.4rem]">
              Funders
            </h2>
          </div>

          <ScrollRow items={sections.funders ?? []} variant="funder" />
        </section>
      </main>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}
