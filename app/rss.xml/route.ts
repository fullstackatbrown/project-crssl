import { client } from "@/sanity/lib/client";
import { toHTML } from "@portabletext/to-html";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://yoursite.com";
const SITE_NAME = "CRSSL News";
const SITE_DESCRIPTION = "Latest news from the Conflict Research and Security Studies Lab";

type NewsArticle = {
  _id: string;
  title: string;
  description: string;
  date: string;
  slug: { current: string };
  body?: any;
};

const NEWS_RSS_QUERY = `*[_type == "newsType" && defined(slug.current)] | order(date desc) {
  _id,
  title,
  description,
  date,
  slug,
  body
}`;

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function generateRssItem(article: NewsArticle): string {
  const url = `${SITE_URL}/news/${article.slug.current}`;
  const pubDate = new Date(article.date).toUTCString();

  // Convert PortableText body to HTML
  let contentHtml = "";
  if (article.body) {
    try {
      contentHtml = toHTML(article.body, {
        components: {
          marks: {
            link: ({ value, children }: any) => {
              const href = value?.href || "";
              return `<a href="${escapeXml(href)}" target="_blank" rel="noopener noreferrer">${children}</a>`;
            },
          },
        },
      });
    } catch (error) {
      console.error("Error converting PortableText to HTML:", error);
      contentHtml = escapeXml(article.description);
    }
  } else {
    contentHtml = escapeXml(article.description);
  }

  return `
    <item>
      <title>${escapeXml(article.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(article.description)}</description>
      <content:encoded><![CDATA[${contentHtml}]]></content:encoded>
      <pubDate>${pubDate}</pubDate>
    </item>
  `.trim();
}

function generateRssFeed(articles: NewsArticle[]): string {
  const itemsXml = articles.map(generateRssItem).join("\n");
  const lastBuildDate = articles.length > 0
    ? new Date(articles[0].date).toUTCString()
    : new Date().toUTCString();

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${SITE_URL}/news</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${itemsXml}
  </channel>
</rss>`.trim();
}

export async function GET() {
  try {
    const articles = await client.fetch<NewsArticle[]>(NEWS_RSS_QUERY);
    const rss = generateRssFeed(articles);

    return new Response(rss, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    return new Response("Error generating RSS feed", { status: 500 });
  }
}
