import { client } from "@/sanity/lib/client";

type NewsItem = {
  _id: string;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
  imageAlt?: string;
};

const NEWS_QUERY = `*[_type == "newsType"] | order(date desc) {
  _id,
  title,
  description,
  date,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt,
}`;

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default async function NewsPage() {
  const news: NewsItem[] = await client.fetch(NEWS_QUERY);

  return (
    <div className="bg-white min-h-screen">

      {/* Hero */}
      <section
        style={{
          height: "240px",
          backgroundColor: "#7c0b0a",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: "2rem",
        }}
      >
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "2.25rem", color: "white", marginBottom: "0.25rem" }}>
          News
        </h1>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "0.95rem", color: "#fca5a5" }}>
          Read about the latest news of our lab.
        </p>
      </section>

      {/* News list */}
      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2.5rem 1rem" }}>
        {news.length === 0 && (
          <p style={{ color: "#9ca3af", fontFamily: "Georgia, serif" }}>No news yet.</p>
        )}
        {news.map((item, i) => (
          <div key={item._id}>
            <div
              style={{
                display: "flex",
                gap: "1.5rem",
                alignItems: "flex-start",
                padding: "1.5rem 0",
              }}
            >
              {/* Image */}
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt ?? item.title}
                  style={{
                    width: "140px",
                    height: "90px",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "140px",
                    height: "90px",
                    backgroundColor: "#f3f4f6",
                    flexShrink: 0,
                  }}
                />
              )}

              {/* Text */}
              <div style={{ flex: 1 }}>
                <h2
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#111827",
                    marginBottom: "0.25rem",
                  }}
                >
                  {item.title}
                </h2>
                <p
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "0.85rem",
                    color: "#6b7280",
                    marginBottom: "0.5rem",
                    lineHeight: "1.5",
                  }}
                >
                  {item.description}
                </p>
                <p
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "0.78rem",
                    color: "#9ca3af",
                  }}
                >
                  {formatDate(item.date)}
                </p>
              </div>
            </div>

            {/* Divider */}
            {i < news.length - 1 && (
              <hr style={{ borderColor: "#e5e7eb", margin: 0 }} />
            )}
          </div>
        ))}
      </main>
    </div>
  );
}