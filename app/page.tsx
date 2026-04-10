function SlashLogo({ size = 1 }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      {/* slash */}
      <span
        style={{
          width: `${3 * size}px`,
          height: `${28 * size}px`,
          backgroundColor: "#7c0a0b",
          transform: "rotate(20deg)",
          marginRight: `${6 * size}px`,
        }}
      />
      {/* rectangle */}
      <span
        style={{
          width: `${10 * size}px`,
          height: `${28 * size}px`,
          backgroundColor: "#7c0a0b",
        }}
      />
    </span>
  );
}

export default function Home() {
  const categories = ["Event", "Recent Work", "Data", "Tools and Resources"];

  return (
    <div className="min-h-screen bg-white text-zinc-900" style={{ fontFamily: "'Georgia', serif" }}>

      {/* Hero */}
      <section
        style={{
          backgroundColor: "#7c0a0b",
          minHeight: "320px",
          display: "flex",
          alignItems: "flex-end",
          padding: "40px 36px",
        }}
      >
        {/* Left text */}
        <div style={{ flex: 1 }}>
          <p
            style={{
              color: "white",
              fontFamily: "'Georgia', serif",
              fontSize: "1.35rem",
              lineHeight: "1.6",
              maxWidth: "420px",
              display: "flex",
              alignItems: "flex-end",
            }}
          >
            The Conflict Research and Security Studies (CRSS) Lab offers students hands-on experience in data collection, data analysis, and research methods.
          </p>
        </div>

        {/* Right image */}
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <img
            src="/globe.png"
            alt="Globe"
            style={{
              maxWidth: "300px",
              width: "100%",
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>
      </section>

      {/* Content Sections */}
      <main>
        {categories.map((category) => (
          <section
            key={category}
            style={{
              borderBottom: "1px solid #e5e7eb",
              padding: "36px",
              display: "grid",
              gridTemplateColumns: "160px 1fr",
              gap: "24px",
              alignItems: "start",
            }}
          >
            {/* Category label */}
            <div>
              <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "1.1rem", fontWeight: "normal", color: "#7c0a0b" }}>
                {category}
              </h2>
            </div>

            {/* Cards + progress bar */}
            <div>
              {/* Cards row */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                {[1, 2, 3].map((i) => (
                  <div key={i} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: "180px" }}>
                    <div style={{ flex: 1, backgroundColor: "#f5f5f5", marginBottom: "12px" }} />
                    <p style={{ fontFamily: "sans-serif", fontSize: "0.78rem", color: "#444", lineHeight: "1.5", marginBottom: "12px" }}>
                      The Conflict Research and Security Studies Lab brings together experts across the disciplines.
                    </p>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: "sans-serif", fontSize: "0.7rem", color: "#999" }}>May 1st 2026</span>
                      <SlashLogo size={0.5} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div style={{ marginTop: "20px", display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "10px",
                    height: "10px",
                    borderRadius: "50%",
                    backgroundColor: "#a51c30",
                  }}
                />
                <div style={{ flex: 1, height: "1px", backgroundColor: "#e5e7eb", marginLeft: "4px" }} />
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}