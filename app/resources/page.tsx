import { client } from "@/sanity/lib/client";

async function getResourcesPage() {
  return client.fetch(`
    *[_type == "resourcesPage"][0] {
      title,
      bannerImage { asset-> { url }, alt },
      bannerSubtitle,
      sections[] {
        title,
        description,
        items[] {
          label,
          description,
          resourceType,
          url,
          file { asset-> { url } },
          image { asset-> { url }, alt },
          youtubeUrl
        }
      }
    }
  `);
}

type ResourceItem = {
  label: string;
  description: string;
  resourceType: "link" | "file" | "image" | "youtube";
  url?: string;
  file?: { asset: { url: string } };
  image?: { asset: { url: string }; alt?: string };
  youtubeUrl?: string;
};

type Section = {
  title: string;
  description: string;
  items: ResourceItem[];
};

const TYPE_LABEL: Record<string, string> = {
  link: "External Link",
  file: "Download",
  image: "Image",
  youtube: "Video",
};

function ResourceItemComponent({ item }: { item: ResourceItem }) {
  if (item.resourceType === "youtube" && item.youtubeUrl) {
    const id = item.youtubeUrl.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1];

    return (
      <li className="border-b border-gray-200 px-6 py-5 last:border-b-0">
        <p className="font-main-sans text-[0.95rem] font-semibold text-[#1a1a18] mb-1">
          {item.label}
        </p>
        <p className="font-main-sans text-[0.9rem] text-[#706b63] mb-3 leading-relaxed">
          {item.description}
        </p>
        <iframe
          className="w-full h-[280px]"
          src={`https://www.youtube.com/embed/${id}`}
          allowFullScreen
        />
      </li>
    );
  }

  const href =
    item.resourceType === "link"
      ? item.url
      : item.resourceType === "file"
        ? item.file?.asset?.url
        : item.resourceType === "image"
          ? item.image?.asset?.url
          : "#";

  return (
    <li className="border-b border-gray-200 last:border-b-0">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-between items-start gap-4 py-[0.9rem] px-6 text-black hover:bg-gray-200 transition group"
      >
        <div className="flex flex-col gap-1">
          <span className="font-main-sans text-[0.95rem] font-semibold leading-snug">
            {item.label}
          </span>

          {item.description && (
            <span className="font-main-sans text-[0.88rem] text-[#706b63] leading-relaxed">
              {item.description}
            </span>
          )}

          <span className="font-main-sans inline-block text-[10px] font-medium tracking-[0.1em] uppercase px-[7px] py-[2px] bg-[#f3e5e4] text-[#7c0b0a] mt-1 self-start">
            {TYPE_LABEL[item.resourceType] ?? item.resourceType}
          </span>
        </div>

        <span className="font-main-sans text-[#9a9189] mt-[2px] transition-transform group-hover:translate-x-1">
          →
        </span>
      </a>
    </li>
  );
}

function LinkList({ items }: { items: ResourceItem[] }) {
  return (
    <ul className="border-t border-gray-200">
      {items.map((item) => (
        <ResourceItemComponent key={item.label} item={item} />
      ))}
    </ul>
  );
}

export default async function ResourcesAndTools() {
  const data = await getResourcesPage();
  const youtubeId = "dQw4w9WgXcQ";
  
  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div className="relative w-full h-[420px] overflow-hidden">
        {data.bannerImage?.asset?.url && (
          <img
            src={data.bannerImage.asset.url}
            alt={data.bannerImage.alt ?? data.title ?? ""}
            className="h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

        <div className="absolute bottom-8 left-8 max-w-3xl text-white">
          <h1 className="font-main-serif text-4xl font-semibold tracking-tight md:text-5xl">
            {data.title}
          </h1>
          {data.bannerSubtitle && (
            <p className="font-main-sans mt-3 max-w-3xl text-sm font-light leading-6 md:text-base">
              {data.bannerSubtitle}
            </p>
          )}
        </div>
      </div>

      {/* Page */}
      <div className="max-w-[860px] mx-auto px-8 py-12 text-[var(--color-foreground)]">
        {data.sections.map((section: Section) => (
          <section
            key={section.title}
            className="mb-8 border border-gray-200"
          >
            <div className="px-6 py-4 border-b border-gray-200">
              <p className="font-main-serif text-2xl text-[#7c0b0a] mb-1">
                {section.title}
              </p>

              {section.description && (
                <p className="font-main-sans text-[0.85rem] text-[#5a5650] leading-relaxed">
                  {section.description}
                </p>
              )}
            </div>

            <LinkList items={section.items} />
          </section>
        ))}
      </div>

      {/* Bottom YouTube Embed */}
      <div className="max-w-[860px] mx-auto px-8 pb-16">
        <div className="border border-gray-200 p-6">
          <h2 className="font-main-serif text-2xl text-[#7c0b0a] mb-3">
            Featured Video
          </h2>

          <div className="relative w-full overflow-hidden rounded-sm pt-[56.25%]">
            <iframe
              className="absolute inset-0 h-full w-full"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>

          <div className="mt-4">
            <a
              href="https://youtube.com/@yourchannel"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex items-center justify-center
                bg-[#7c0b0a]
                text-white
                px-4 py-2
                text-sm
                font-main-sans
                transition-all duration-300
                hover:bg-[#5f0808]
                hover:-translate-y-[1px]
                hover:shadow-md
              "
            >
              Visit Our Channel
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}