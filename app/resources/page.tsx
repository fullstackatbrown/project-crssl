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
      <li className="border-b border-[#d4cfc8] py-5">
        <p className="font-serif text-[1.15rem] font-semibold text-[#1a1a18] mb-1">
          {item.label}
        </p>
        <p className="text-[0.95rem] text-[#706b63] mb-3 leading-relaxed">
          {item.description}
        </p>
        <iframe
          className="w-full h-[315px]"
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
    <li className="border-b border-[#d4cfc8]">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex justify-between items-start gap-4 py-4 text-black hover:bg-[#f3efe9] transition"
      >
        <div className="flex flex-col gap-1">
          <span className="font-serif text-[1.15rem] font-semibold leading-snug">
            {item.label}
          </span>

          {item.description && (
            <span className="text-[0.95rem] text-[#706b63] leading-relaxed">
              {item.description}
            </span>
          )}

          <span className="text-[0.65rem] font-bold tracking-[0.18em] uppercase text-[var(--primary,#7c0b0a)] mt-1">
            {TYPE_LABEL[item.resourceType] ?? item.resourceType}
          </span>
        </div>

        <span className="text-[#9a9189] transition-transform group-hover:translate-x-1">
          →
        </span>
      </a>
    </li>
  );
}

function LinkList({ items }: { items: ResourceItem[] }) {
  return (
    <ul className="border-t border-[#d4cfc8]">
      {items.map((item) => (
        <ResourceItemComponent key={item.label} item={item} />
      ))}
    </ul>
  );
}

export default async function ResourcesAndTools() {
  const data = await getResourcesPage();

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div className="relative w-full h-[260px] flex items-end overflow-hidden bg-gray-400">
        {data.bannerImage?.asset?.url && (
          <img
            src={data.bannerImage.asset.url}
            alt={data.bannerImage.alt ?? ""}
            className="absolute inset-0 w-full h-full object-cover object-[center_40%] grayscale brightness-50"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

        <div className="relative z-10 px-10 py-8">
          <h1 className="font-serif text-[2.2rem] text-[#f0ede6] leading-tight mb-1">
            {data.title}
          </h1>
          {data.bannerSubtitle && (
            <p className="font-serif italic text-[#b0a99a] text-sm tracking-wide">
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
            className="mb-12 p-6 bg-[#f7f4ef] border-l-[3px] border-[var(--primary,#7c0b0a)]"
          >
            <p className="font-serif text-[1.6rem] uppercase tracking-[0.25em] text-[var(--primary,#7c0b0a)] mb-2">
              {section.title}
            </p>

            {section.description && (
              <p className="text-sm italic text-[#5a5650] mb-5 leading-relaxed">
                {section.description}
              </p>
            )}

            <LinkList items={section.items} />
          </section>
        ))}
      </div>
    </div>
  );
}
