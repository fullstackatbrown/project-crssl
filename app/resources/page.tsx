// import { client } from "@/sanity/lib/client";

// async function getResourcesPage() {
//   return client.fetch(`
//     *[_type == "resourcesPage"][0] {
//       title,
//       sections[] {
//         title,
//         description,
//         items[] {
//           label,
//           description,
//           resourceType,
//           url,
//           file { asset-> { url } },
//           image { asset-> { url }, alt },
//           youtubeUrl
//         }
//       }
//     }
//   `);
// }

// type ResourceItem = {
//   label: string;
//   description: string;
//   resourceType: "link" | "file" | "image" | "youtube";
//   url?: string;
//   file?: { asset: { url: string } };
//   image?: { asset: { url: string }; alt?: string };
//   youtubeUrl?: string;
// };

// type Section = {
//   title: string;
//   description: string;
//   items: ResourceItem[];
// };

// function ResourceItem({ item }: { item: ResourceItem }) {
//   const content = (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "flex-start",
//         padding: "1.25rem 0",
//       }}
//     >
//       <div>
//         <div
//           style={{
//             fontWeight: "bold",
//             fontSize: "1.25rem",
//             marginBottom: "0.5rem",
//           }}
//         >
//           {item.label}
//         </div>
//         <div style={{ fontSize: "0.95rem" }}>{item.description}</div>
//       </div>
//       <span style={{ fontSize: "1.25rem", marginLeft: "1rem", flexShrink: 0 }}>
//         →
//       </span>
//     </div>
//   );

//   // YouTube gets its own embed instead of a link
//   if (item.resourceType === "youtube" && item.youtubeUrl) {
//     const id = item.youtubeUrl.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1];
//     return (
//       <li style={{ borderBottom: "1px solid #ccc" }}>
//         <div style={{ padding: "1.25rem 0" }}>
//           <div
//             style={{
//               fontWeight: "bold",
//               fontSize: "1.25rem",
//               marginBottom: "0.5rem",
//             }}
//           >
//             {item.label}
//           </div>
//           <div style={{ fontSize: "0.95rem", marginBottom: "0.75rem" }}>
//             {item.description}
//           </div>
//           <iframe
//             src={`https://www.youtube.com/embed/${id}`}
//             width="100%"
//             height="315"
//             allowFullScreen
//             style={{ border: "none" }}
//           />
//         </div>
//       </li>
//     );
//   }

//   // Everything else is a link
//   const href =
//     item.resourceType === "link"
//       ? item.url
//       : item.resourceType === "file"
//         ? item.file?.asset?.url
//         : item.resourceType === "image"
//           ? item.image?.asset?.url
//           : "#";

//   return (
//     <li style={{ borderBottom: "1px solid #ccc" }}>
//       <a
//         href={href}
//         target="_blank"
//         rel="noopener noreferrer"
//         style={{ textDecoration: "none", display: "block" }}
//       >
//         {content}
//       </a>
//     </li>
//   );
// }

// function LinkList({ items }: { items: ResourceItem[] }) {
//   return (
//     <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
//       {items.map((item) => (
//         <ResourceItem key={item.label} item={item} />
//       ))}
//     </ul>
//   );
// }

// export default async function ResourcesAndTools() {
//   const data = await getResourcesPage();

//   return (
//     <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
//       <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>{data.title}</h1>

//       {data.sections.map((section: Section) => (
//         <section key={section.title} style={{ marginBottom: "3rem" }}>
//           <p
//             style={{
//               fontWeight: "bold",
//               fontSize: "1.3rem",
//               letterSpacing: "0.1em",
//               textTransform: "uppercase",
//               marginBottom: "0.25rem",
//             }}
//           >
//             {section.title}
//           </p>
//           <p style={{ fontSize: "0.95rem", marginBottom: "1rem" }}>
//             {section.description}
//           </p>
//           <LinkList items={section.items} />
//         </section>
//       ))}
//     </div>
//   );
// }
import { client } from "@/sanity/lib/client";
import "./resource.css";

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
      <li className="item-youtube">
        <p className="youtube-label">{item.label}</p>
        <p className="youtube-description">{item.description}</p>
        <iframe
          className="youtube-embed"
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
    <li className="resource-item">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="item-link"
      >
        <div className="item-body">
          <span className="item-label">{item.label}</span>
          {item.description && (
            <span className="item-description">{item.description}</span>
          )}
          <span className="item-meta">
            {TYPE_LABEL[item.resourceType] ?? item.resourceType}
          </span>
        </div>
        <span className="item-arrow" aria-hidden>
          →
        </span>
      </a>
    </li>
  );
}

function LinkList({ items }: { items: ResourceItem[] }) {
  return (
    <ul className="resource-list">
      {items.map((item) => (
        <ResourceItemComponent key={item.label} item={item} />
      ))}
    </ul>
  );
}

export default async function ResourcesAndTools() {
  const data = await getResourcesPage();

  return (
    <>
      <div className="banner">
        {data.bannerImage?.asset?.url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.bannerImage.asset.url}
            alt={data.bannerImage.alt ?? ""}
            className="banner-image"
          />
        )}
        <div className="banner-overlay" />
        <div className="banner-content">
          <h1 className="banner-title">{data.title}</h1>
          {data.bannerSubtitle && (
            <p className="banner-subtitle">{data.bannerSubtitle}</p>
          )}
        </div>
      </div>

      <div className="resources-page">
        {data.sections.map((section: Section) => (
          <section key={section.title} className="resources-section">
            <p className="section-title">{section.title}</p>
            {section.description && (
              <p className="section-description">{section.description}</p>
            )}
            <LinkList items={section.items} />
          </section>
        ))}
      </div>
    </>
  );
}
