const toolsAndResources = [
  { id: 1, label: "Resource One", href: "#" },
  { id: 2, label: "Resource Two", href: "#" },
  { id: 3, label: "Resource Three", href: "#" },
];

const speakerSeries = [
  { id: 1, label: "Speaker Series Event One", href: "#" },
  { id: 2, label: "Speaker Series Event Two", href: "#" },
  { id: 3, label: "Speaker Series Event Three", href: "#" },
];

const trainings = [
  { id: 1, label: "Training One", href: "#" },
  { id: 2, label: "Training Two", href: "#" },
  { id: 3, label: "Training Three", href: "#" },
];

type LinkItem = {
  id: number;
  label: string;
  href: string;
};

function LinkList({ items }: { items: LinkItem[] }) {
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <a href={item.href}>{item.label}</a>
        </li>
      ))}
    </ul>
  );
}

export default function ResourcesAndTools() {
  return (
    <div>
      <section>
        <h2>Tools & Resources</h2>
        <LinkList items={toolsAndResources} />
      </section>

      <section>
        <h2>Speaker Series</h2>
        <LinkList items={speakerSeries} />
      </section>

      <section>
        <h2>Trainings</h2>
        <LinkList items={trainings} />
      </section>
    </div>
  );
}
