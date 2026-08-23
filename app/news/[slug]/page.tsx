import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";

const ARTICLE_QUERY = `*[_type == "newsType" && slug.current == $slug][0] {
  _id,
  title,
  description,
  date,
  body,
  "imageUrl": image.asset->url,
  "imageAlt": image.alt,
  slug
}`;

const options = { next: { revalidate: 30 } };

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export default async function NewsArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await client.fetch<SanityDocument | null>(
    ARTICLE_QUERY,
    { slug },
    options,
  );

  if (!article) notFound();

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="relative w-full bg-gray-100">
        {article.imageUrl && (
          <div className="w-full h-[400px] relative">
            <Image
              src={article.imageUrl}
              alt={article.imageAlt || article.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
      </div>

      {/* Article Content */}
      <article className="max-w-[800px] mx-auto px-4 py-12">
        <header className="mb-8">
          <p className="font-main-sans text-sm text-gray-500 mb-3">
            {formatDate(article.date)}
          </p>
          <h1 className="font-main-serif text-4xl md:text-5xl font-semibold text-gray-900 mb-4">
            {article.title}
          </h1>
          <p className="font-main-sans text-lg text-gray-600 leading-relaxed">
            {article.description}
          </p>
        </header>

        <hr className="border-gray-200 mb-8" />

        {article.body && (
          <div className="prose prose-lg max-w-none font-main-sans">
            <PortableText
              value={article.body}
              components={{
                block: {
                  h1: ({children}) => <h1 className="text-4xl font-bold font-main-sans mt-8 mb-4">{children}</h1>,
                  h2: ({children}) => <h2 className="text-3xl font-bold font-main-sans mt-6 mb-3">{children}</h2>,
                  h3: ({children}) => <h3 className="text-2xl font-bold font-main-sans mt-4 mb-2">{children}</h3>,
                  h4: ({children}) => <h4 className="text-xl font-bold font-main-sans mt-4 mb-2">{children}</h4>,
                  normal: ({children}) => <p className="mb-4 leading-relaxed">{children}</p>,
                  blockquote: ({children}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">{children}</blockquote>,
                },
                marks: {
                  link: ({children, value}) => (
                    <a href={value?.href} className="text-blue-600 underline hover:text-blue-800 transition-colors" target="_blank" rel="noopener noreferrer">
                      {children}
                    </a>
                  ),
                  strong: ({children}) => <strong className="font-bold">{children}</strong>,
                  em: ({children}) => <em className="italic">{children}</em>,
                  underline: ({children}) => <span className="underline">{children}</span>,
                },
                list: {
                  bullet: ({children}) => <ul className="list-disc ml-6 mb-4 space-y-2">{children}</ul>,
                  number: ({children}) => <ol className="list-decimal ml-6 mb-4 space-y-2">{children}</ol>,
                },
                listItem: {
                  bullet: ({children}) => <li className="leading-relaxed">{children}</li>,
                  number: ({children}) => <li className="leading-relaxed">{children}</li>,
                },
                types: {
                  image: ({value}) => {
                    if (!value?.asset?._ref) return null;
                    return (
                      <div className="my-8">
                        <img
                          src={urlFor(value).width(800).url()}
                          alt={value.alt || 'Article image'}
                          className="w-full h-auto rounded-lg"
                        />
                        {value.alt && (
                          <p className="text-sm text-gray-500 text-center mt-2 italic">
                            {value.alt}
                          </p>
                        )}
                      </div>
                    );
                  },
                },
              }}
            />
          </div>
        )}
      </article>
    </div>
  );
}
