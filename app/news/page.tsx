import { client } from "@/sanity/lib/client";
import Link from "next/link";

type NewsItem = {
  _id: string;
  title: string;
  description: string;
  date: string;
  imageUrl?: string;
  imageAlt?: string;
  slug?: { current: string };
};

const NEWS_QUERY = `*[_type == "newsType"] | order(date desc) {
  _id,
  title,
  description,
  date,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt,
  slug
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
      <div className="relative w-full h-[420px] overflow-hidden bg-primary">
        <div className="absolute inset-0" />
        <div className="absolute bottom-8 left-8 max-w-3xl text-white">
          <h1 className="font-main-serif text-4xl font-semibold tracking-tight md:text-5xl">
            News
          </h1>
          <p className="font-main-sans mt-3 text-sm font-light leading-6 md:text-base">
            Read about the latest news of our lab.
          </p>
        </div>
      </div>

      {/* News list */}
      <main className="max-w-[900px] mx-auto px-4 py-10">
        {news.length === 0 && (
          <p className="font-main-sans text-gray-400">No news yet.</p>
        )}
        {news.map((item, i) => {
          const content = (
            <>
              {item.imageUrl ? (
                <img
                  src={item.imageUrl}
                  alt={item.imageAlt ?? item.title}
                  className="w-[140px] h-[100px] object-cover flex-shrink-0 rounded"
                />
              ) : (
                <div className="w-[140px] h-[100px] bg-gray-100 flex-shrink-0 rounded" />
              )}

              <div className="flex-1">
                <h2 className="font-main-serif text-xl font-semibold text-gray-900 mb-1 hover:text-gray-700 transition-colors">
                  {item.title}
                </h2>
                <p className="font-main-sans text-[0.85rem] text-gray-500 mb-2 leading-relaxed">
                  {item.description}
                </p>
                <p className="font-main-sans text-[0.78rem] text-gray-400">
                  {formatDate(item.date)}
                </p>
              </div>
            </>
          );

          return (
            <div key={item._id}>
              {item.slug?.current ? (
                <Link
                  href={`/news/${item.slug.current}`}
                  className="flex gap-6 items-start py-6 hover:bg-gray-50 transition-colors -mx-4 px-4 rounded-lg"
                >
                  {content}
                </Link>
              ) : (
                <div className="flex gap-6 items-start py-6 -mx-4 px-4">
                  {content}
                </div>
              )}

              {i < news.length - 1 && <hr className="border-gray-200" />}
            </div>
          );
        })}
      </main>
    </div>
  );
}