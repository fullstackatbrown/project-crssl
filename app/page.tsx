import { client } from '../sanity/lib/client'
import { HOME_QUERY } from './lib/queries'

function SlashLogo({ size = 1 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      <span style={{
        width: `${3 * size}px`,
        height: `${28 * size}px`,
        backgroundColor: "#7c0a0b",
        transform: "rotate(20deg)",
        marginRight: `${6 * size}px`,
      }} />
      <span style={{
        width: `${10 * size}px`,
        height: `${28 * size}px`,
        backgroundColor: "#7c0a0b",
      }} />
    </span>
  )
}

type CardItem = {
  _id: string
  title?: string
  description?: string
  date?: string
  imageUrl?: string
  items?: {
    label: string
    description?: string
    resourceType: string
    url?: string
    fileUrl?: string
    imageUrl?: string
    youtubeUrl?: string
  }[]
}

type Sections = {
  events?: CardItem[]
  recentWork?: CardItem[]
  datasets?: CardItem[]
  tools?: CardItem[]
}

const SECTION_CONFIG: { key: keyof Sections; label: string }[] = [
  { key: 'events',     label: 'Event' },
  { key: 'recentWork', label: 'Recent Work' },
  { key: 'datasets',   label: 'Data' },
  { key: 'tools',      label: 'Tools and Resources' },
]

function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  })
}

export default async function Home() {
  const sections: Sections = await client.fetch(HOME_QUERY)

  return (
    <div className="min-h-screen bg-white text-zinc-900" style={{ fontFamily: "'Georgia', serif" }}>

      {/* Hero */}
      <section style={{
        backgroundColor: "#7c0a0b",
        minHeight: "320px",
        display: "flex",
        alignItems: "flex-end",
        padding: "40px 36px",
      }}>
        <div style={{ flex: 1 }}>
          <p style={{
            color: "white",
            fontFamily: "'Georgia', serif",
            fontSize: "1.35rem",
            lineHeight: "1.6",
            maxWidth: "420px",
          }}>
            The Conflict Research and Security Studies (CRSS) Lab offers students hands-on experience in data collection, data analysis, and research methods.
          </p>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <img src="/globe.png" alt="Globe" style={{ maxWidth: "300px", width: "100%", height: "auto", objectFit: "contain" }} />
        </div>
      </section>

      {/* Content Sections */}
      <main>
        {SECTION_CONFIG.map(({ key, label }) => {
          const items = sections[key] ?? []
          const isTools = key === 'tools'

          return (
            <section key={key} style={{
              borderBottom: "1px solid #e5e7eb",
              padding: "36px",
              display: "grid",
              gridTemplateColumns: "160px 1fr",
              gap: "24px",
              alignItems: "start",
            }}>
              <div>
                <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "1.1rem", fontWeight: "normal", color: "#7c0a0b" }}>
                  {label}
                </h2>
              </div>

              <div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                  {items.length > 0
                    ? items.map(item => (
                        <div key={item._id} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "180px" }}>
                          {item.imageUrl
                            ? <img src={item.imageUrl} alt={item.title} style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", marginBottom: "12px" }} />
                            : <div style={{ flex: 1, backgroundColor: "#f5f5f5", marginBottom: "12px" }} />
                          }
                          <p style={{ fontFamily: "sans-serif", fontSize: "0.78rem", color: "#444", lineHeight: "1.5", marginBottom: "12px" }}>
                            {isTools ? item.title : item.description}
                          </p>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontFamily: "sans-serif", fontSize: "0.7rem", color: "#999" }}>
                              {isTools
                                ? item.items?.[0]?.resourceType === 'link' && item.items[0].url
                                  ? <a href={item.items[0].url} style={{ color: "#7c0a0b" }}>{item.items[0].label} →</a>
                                  : null
                                : formatDate(item.date)
                              }
                            </span>
                            <SlashLogo size={0.5} />
                          </div>
                        </div>
                      ))
                    : [1, 2, 3].map(i => (
                        <div key={i} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "180px" }}>
                          <div style={{ flex: 1, backgroundColor: "#f5f5f5", marginBottom: "12px" }} />
                          <p style={{ fontFamily: "sans-serif", fontSize: "0.78rem", color: "#ccc", lineHeight: "1.5", marginBottom: "12px" }}>
                            No content yet.
                          </p>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <span style={{ fontFamily: "sans-serif", fontSize: "0.7rem", color: "#ccc" }}>—</span>
                            <SlashLogo size={0.5} />
                          </div>
                        </div>
                      ))
                  }
                </div>

                {/* Progress bar */}
                <div style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#a51c30" }} />
                  <div style={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb", marginLeft: "4px" }} />
                </div>
              </div>
            </section>
          )
        })}
      </main>
    </div>
  )
}