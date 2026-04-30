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
  funders?: CardItem[]
}

const SECTION_CONFIG: {
  key: keyof Sections
  label: string
  href: string
}[] = [
  { key: 'news',       label: 'News',       href: '/news' },
  { key: 'recentWork', label: 'Recent Work', href: '/projects' },
  { key: 'datasets',   label: 'Data',        href: '/data' },
]

function SlashLogo({ size = 1, color = "#7c0a0b" }: { size?: number; color?: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
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
    <div className="min-h-screen bg-white text-zinc-900" style={{ fontFamily: "'Georgia', serif" }}>

      {/* Hero */}
      <section style={{
        backgroundColor: "#7c0a0b",
        minHeight: "260px",
        display: "flex",
        alignItems: "stretch",
        padding: "28px 80px",
      }}>
        <div style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          gap: "8px",
          paddingBottom: "4px",
        }}>
          <div style={{ marginLeft: "2px", marginBottom: "4px" }}>
            <SlashLogo size={1.2} color="white" />
          </div>
          <p style={{
            color: "white",
            fontFamily: "'Georgia', serif",
            fontSize: "1.1rem",
            lineHeight: "1.6",
            maxWidth: "420px",
            margin: 0,
          }}>
            The Conflict Research and Security Studies (CRSS) Lab offers students hands-on experience in data collection, data analysis, and research methods.
          </p>
        </div>

        <div style={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          paddingRight: "40px",
        }}>
          <img
            src="/globe.png"
            alt="Globe"
            style={{ width: "260px", height: "auto", objectFit: "contain" }}
          />
        </div>
      </section>

      {/* Content Sections */}
      <main>
        {SECTION_CONFIG.map(({ key, label, href }) => {
          const items = sections[key] ?? []

          return (
            <section key={key} style={{
              borderBottom: "1px solid #e5e7eb",
              padding: "48px 0 48px 80px",
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              gap: "32px",
              alignItems: "start",
            }}>
              <div style={{ paddingTop: "8px" }}>
                <Link href={href} style={{ textDecoration: "none" }}>
                  <h2 style={{
                    fontFamily: "'Georgia', serif",
                    fontSize: "1.4rem",
                    fontWeight: "normal",
                    color: "#7c0a0b",
                    cursor: "pointer",
                    margin: 0,
                  }}>
                    {label}
                  </h2>
                </Link>
              </div>

              <ScrollRow items={items} />
            </section>
          )
        })}

        {/* Funders */}
        <section style={{
          borderBottom: "1px solid #e5e7eb",
          padding: "48px 0 48px 80px",
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: "32px",
          alignItems: "start",
        }}>
          <div style={{ paddingTop: "8px" }}>
            <h2 style={{
              fontFamily: "'Georgia', serif",
              fontSize: "1.4rem",
              fontWeight: "normal",
              color: "#7c0a0b",
              margin: 0,
            }}>
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