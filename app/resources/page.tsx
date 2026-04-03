import { client } from "@/sanity/lib/client";

async function getResourcesPage() {
  return client.fetch(`
    *[_type == "resourcesPage"][0] {
      title,
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

function ResourceItem({ item }: { item: ResourceItem }) {
  const content = (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        padding: "1.25rem 0",
      }}
    >
      <div>
        <div
          style={{
            fontWeight: "bold",
            fontSize: "1.25rem",
            marginBottom: "0.5rem",
          }}
        >
          {item.label}
        </div>
        <div style={{ fontSize: "0.95rem" }}>{item.description}</div>
      </div>
      <span style={{ fontSize: "1.25rem", marginLeft: "1rem", flexShrink: 0 }}>
        →
      </span>
    </div>
  );

  // YouTube gets its own embed instead of a link
  if (item.resourceType === "youtube" && item.youtubeUrl) {
    const id = item.youtubeUrl.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1];
    return (
      <li style={{ borderBottom: "1px solid #ccc" }}>
        <div style={{ padding: "1.25rem 0" }}>
          <div
            style={{
              fontWeight: "bold",
              fontSize: "1.25rem",
              marginBottom: "0.5rem",
            }}
          >
            {item.label}
          </div>
          <div style={{ fontSize: "0.95rem", marginBottom: "0.75rem" }}>
            {item.description}
          </div>
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            width="100%"
            height="315"
            allowFullScreen
            style={{ border: "none" }}
          />
        </div>
      </li>
    );
  }

  // Everything else is a link
  const href =
    item.resourceType === "link"
      ? item.url
      : item.resourceType === "file"
        ? item.file?.asset?.url
        : item.resourceType === "image"
          ? item.image?.asset?.url
          : "#";

  return (
    <li style={{ borderBottom: "1px solid #ccc" }}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: "none", display: "block" }}
      >
        {content}
      </a>
    </li>
  );
}

function LinkList({ items }: { items: ResourceItem[] }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((item) => (
        <ResourceItem key={item.label} item={item} />
      ))}
    </ul>
  );
}

export default async function ResourcesAndTools() {
  const data = await getResourcesPage();

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>{data.title}</h1>

      {data.sections.map((section: Section) => (
        <section key={section.title} style={{ marginBottom: "3rem" }}>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.3rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "0.25rem",
            }}
          >
            {section.title}
          </p>
          <p style={{ fontSize: "0.95rem", marginBottom: "1rem" }}>
            {section.description}
          </p>
          <LinkList items={section.items} />
        </section>
      ))}
    </div>
  );
}
