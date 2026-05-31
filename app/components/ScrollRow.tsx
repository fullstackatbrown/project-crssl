'use client'

import { useRef } from 'react'

function SlashLogo({ size = 1 }: { size?: number }) {
  return (
    <span className="inline-flex items-center">
      <span style={{
        width: `${3 * size}px`,
        height: `${28 * size}px`,
        backgroundColor: "var(--color-primary)",
        transform: "rotate(20deg)",
        marginRight: `${6 * size}px`,
      }} />
      <span style={{
        width: `${10 * size}px`,
        height: `${28 * size}px`,
        backgroundColor: "var(--color-primary)",
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
    <div className="min-w-[300px] w-[300px] shrink-0 flex flex-col h-[240px] snap-start">
      <div className="flex-1 bg-[#f5f5f5] mb-4" />
      <p className="font-main-sans text-[0.85rem] text-[#ccc] leading-relaxed mb-4">
        No content yet.
      </p>
      <div className="flex justify-between items-center">
        <span className="font-main-sans text-[0.75rem] text-[#ccc]">—</span>
        <SlashLogo size={0.6} />
      </div>
    </div>
  )
}

function ContentCard({ item }: { item: CardItem }) {
  const hasImage = Boolean(item.imageUrl)

  if (hasImage) {
    // Image layout: fixed height, image on top
    return (
      <div className="min-w-[300px] w-[300px] shrink-0 flex flex-col h-[240px] snap-start">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full aspect-video object-cover mb-4"
        />
        <p className="font-main-sans text-[1rem] text-[#111] leading-snug mb-4 line-clamp-2">
          {item.title}
        </p>
        <div className="flex justify-between items-center mt-auto">
          <span className="font-main-sans text-[0.75rem] text-[#999]">
            {formatDate(item.date)}
          </span>
          <SlashLogo size={0.6} />
        </div>
      </div>
    )
  }

  // Text-only layout: no image, title is prominent, more room for description
  return (
    <div className="min-w-[300px] w-[300px] shrink-0 flex flex-col h-[240px] snap-start">
      {item.title && (
        <p className="font-main-sans text-lg text-[#111] leading-snug mb-3 line-clamp-2">
          {item.title}
        </p>
      )}
      {item.description && (
        <p className="font-main-sans text-[0.85rem] text-[#444] leading-relaxed mb-4 line-clamp-4">
          {item.description}
        </p>
      )}
      <div className="flex justify-between items-center mt-auto">
        <span className="font-main-sans text-[0.75rem] text-[#999]">
          {formatDate(item.date)}
        </span>
        <SlashLogo size={0.6} />
      </div>
    </div>
  )
}

function FunderCard({ item }: { item: CardItem }) {
  return (
    <div style={{
      minWidth: "300px",
      flex: "0 0 300px",
      scrollSnapAlign: "start",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "180px",
      flexShrink: 0,
      border: "1px solid #e5e7eb",
      padding: "20px",
    }}>
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {item.imageUrl
          ? <img src={item.imageUrl} alt={item.title} style={{ maxWidth: "80%", maxHeight: "100px", objectFit: "contain" }} />
          : <span className="font-main-sans text-lg text-black" style={{ textAlign: "center" }}>
              {item.title}
            </span>
        }
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <SlashLogo size={0.6} />
      </div>
    </div>
  )
}

function renderCards(items: CardItem[], variant: "default" | "funder") {
  if (items.length === 0) {
    return [1, 2, 3, 4, 5].map(i => <PlaceholderCard key={i} />)
  }
  if (variant === "funder") {
    return items.map(item => <FunderCard key={item._id} item={item} />)
  }
  return items.map(item => <ContentCard key={item._id} item={item} />)
}

export default function ScrollRow({ items, variant = "default" }: { items: CardItem[], variant?: "default" | "funder" }) {
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
    <div className="min-w-0">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="hide-scrollbar flex gap-6 overflow-x-scroll snap-x snap-mandatory pb-4 pr-10"
        style={{ scrollbarWidth: "none", WebkitOverflowScrolling: "touch" }}
      >
        {renderCards(items, variant)}
      </div>

      {/* Progress bar */}
      <div className="mt-4 mr-20 h-[2px] bg-gray-200 rounded-[1px] relative">
        <div
          ref={fillRef}
          className="absolute left-0 top-0 w-[6px] h-[2px] bg-primary rounded-[1px] transition-[width] duration-100 ease-in-out"
        />
        <div
          ref={dotRef}
          className="absolute left-0 -top-1 w-3 h-3 rounded-full bg-primary transition-[left] duration-100 ease-in-out"
        />
      </div>
    </div>
  )
}