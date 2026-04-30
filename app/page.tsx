import { client } from '../sanity/lib/client'
import { HOME_QUERY } from './lib/queries'
import Link from 'next/link'
import ScrollRow from './components/ScrollRow'

type CardItem = {
  _id: string
  title?: string
  description?: string
  date?: string
  imageUrl?: string
}

type Sections = {
  news?: CardItem[]
  recentWork?: CardItem[]
  datasets?: CardItem[]
}

const FUNDERS: CardItem[] = [
  { _id: 'brown',    title: 'Brown University' },
  { _id: 'pitt',     title: 'University of Pittsburgh' },
  { _id: 'nsf',      title: 'National Science Foundation' },
  { _id: 'mit',      title: 'MIT' },
  { _id: 'stanford', title: 'Stanford University' },
]

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

export default async function Home() {
  const sections: Sections = await client.fetch(HOME_QUERY)

  return (
    <div className="min-h-screen bg-white text-zinc-900">

      {/* Hero */}
      <section className="bg-primary flex items-stretch px-5 py-6 min-h-[200px] md:px-20 md:py-7 md:min-h-[260px]">
        {/* Left: slash logo directly above text */}
        <div className="flex flex-1 flex-col justify-end gap-2 pb-1">
          <div className="ml-0.5 mb-1">
            <SlashLogo size={1.2} color="white" />
          </div>
          <p className="text-white font-main-serif text-[0.95rem] leading-relaxed max-w-[420px] m-0 md:text-[1.1rem]">
            The Conflict Research and Security Studies (CRSS) Lab offers students hands-on experience in data collection, data analysis, and research methods.
          </p>
        </div>

        {/* Right: globe — hidden on mobile, visible on desktop */}
        <div className="hidden md:flex flex-1 justify-end items-center pr-10">
          <img
            src="/globe.png"
            alt="Globe"
            className="w-[260px] h-auto object-contain"
          />
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
                  <h2 className="font-main-serif text-[1.2rem] font-normal text-primary cursor-pointer m-0 md:text-[1.4rem]">
                    {label}
                  </h2>
                </Link>
              </div>

              <ScrollRow items={items} />
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

          <ScrollRow items={FUNDERS} />
        </section>
      </main>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}