type LinkItem = {
  id: number;
  label: string;
  description: string;
  href: string;
};

type Section = {
  id: number;
  sectionLabel: string;
  sectionDescription: string;
  items: LinkItem[];
};

const sections: Section[] = [
  {
    id: 1,
    sectionLabel: "Tools & Resources",
    sectionDescription: "A curated list of tools and resources.",
    items: [
      {
        id: 1,
        label: "Resource One",
        description: "Description for resource one.",
        href: "#",
      },
    ],
  },
  {
    id: 2,
    sectionLabel: "Speaker Series",
    sectionDescription: "Upcoming and past speaker series events.",
    items: [
      {
        id: 1,
        label: "Speaker Series Event One",
        description: "Description for speaker series event one.",
        href: "#",
      },
    ],
  },
  {
    id: 3,
    sectionLabel: "Trainings",
    sectionDescription: "Available training programs and workshops.",
    items: [
      {
        id: 1,
        label: "Training One",
        description: "Description for training one.",
        href: "#",
      },
    ],
  },
];

function LinkList({ items }: { items: LinkItem[] }) {
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {items.map((item) => (
        <li key={item.id} style={{ borderBottom: "1px solid #ccc" }}>
          <a
            href={item.href}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              padding: "1.25rem 0",
              textDecoration: "none",
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
            <span
              style={{ fontSize: "1.25rem", marginLeft: "1rem", flexShrink: 0 }}
            >
              →
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function ResourcesAndTools() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
      <h1 style={{ fontSize: "2.5rem", marginBottom: "2rem" }}>
        Tools + Resources
      </h1>

      {sections.map((section) => (
        <section key={section.id} style={{ marginBottom: "3rem" }}>
          <p
            style={{
              fontWeight: "bold",
              fontSize: "1.3rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: "0.25rem",
            }}
          >
            {section.sectionLabel}
          </p>
          <p style={{ fontSize: "0.95rem", marginBottom: "1rem" }}>
            {section.sectionDescription}
          </p>
          <LinkList items={section.items} />
        </section>
      ))}
    </div>
  );
}
