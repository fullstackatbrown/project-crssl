'use client'

import { useRef } from 'react'

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
}

function formatDate(dateStr?: string) {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric'
  })
}

function PlaceholderCard() {
  return (
    <div style={{
      minWidth: "300px",
      flex: "0 0 300px",
      scrollSnapAlign: "start",
      display: "flex",
      flexDirection: "column",
      height: "240px",
      flexShrink: 0,
    }}>
      <div style={{ flex: 1, backgroundColor: "#f5f5f5", marginBottom: "16px" }} />
      <p style={{ fontFamily: "sans-serif", fontSize: "0.85rem", color: "#ccc", lineHeight: "1.6", marginBottom: "16px" }}>
        No content yet.
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "sans-serif", fontSize: "0.75rem", color: "#ccc" }}>—</span>
        <SlashLogo size={0.6} />
      </div>
    </div>
  )
}

function ContentCard({ item }: { item: CardItem }) {
  return (
    <div style={{
      minWidth: "300px",
      flex: "0 0 300px",
      scrollSnapAlign: "start",
      display: "flex",
      flexDirection: "column",
      height: "240px",
      flexShrink: 0,
    }}>
      {item.imageUrl
        ? <img src={item.imageUrl} alt={item.title} style={{ width: "100%", aspectRatio: "16/9", objectFit: "cover", marginBottom: "16px" }} />
        : <div style={{ flex: 1, backgroundColor: "#f5f5f5", marginBottom: "16px" }} />
      }
      <p style={{ fontFamily: "sans-serif", fontSize: "0.85rem", color: "#444", lineHeight: "1.6", marginBottom: "16px" }}>
        {item.description}
      </p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "sans-serif", fontSize: "0.75rem", color: "#999" }}>
          {formatDate(item.date)}
        </span>
        <SlashLogo size={0.6} />
      </div>
    </div>
  )
}

export default function ScrollRow({ items }: { items: CardItem[] }) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    const el = scrollRef.current
    const dot = dotRef.current
    const fill = fillRef.current
    if (!el || !dot || !fill) return
    const progress = el.scrollLeft / (el.scrollWidth - el.clientWidth)
    const barWidth = dot.parentElement?.clientWidth ?? 0
    const dotPos = progress * (barWidth - 12)
    dot.style.left = `${dotPos}px`
    fill.style.width = `${dotPos + 6}px`
  }

  return (
    <div style={{ minWidth: 0 }}>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{
          display: "flex",
          gap: "24px",
          overflowX: "scroll",
          scrollSnapType: "x mandatory",
          paddingBottom: "16px",
          paddingRight: "40px",
          scrollbarWidth: "none",
          WebkitOverflowScrolling: "touch",
        }}
        className="hide-scrollbar"
      >
        {items.length > 0
          ? items.map(item => <ContentCard key={item._id} item={item} />)
          : [1, 2, 3, 4, 5].map(i => <PlaceholderCard key={i} />)
        }
      </div>

      {/* Progress bar */}
      <div style={{
        marginTop: "16px",
        marginRight: "80px",
        height: "2px",
        backgroundColor: "#e5e7eb",
        borderRadius: "1px",
        position: "relative",
      }}>
        {/* Red fill left of dot */}
        <div
          ref={fillRef}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "6px",
            height: "2px",
            backgroundColor: "#a51c30",
            borderRadius: "1px",
            transition: "width 0.1s ease",
          }}
        />
        {/* Dot */}
        <div
          ref={dotRef}
          style={{
            position: "absolute",
            left: 0,
            top: "-4px",
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            backgroundColor: "#a51c30",
            transition: "left 0.1s ease",
          }}
        />
      </div>
    </div>
  )
}