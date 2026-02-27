const mockData = [
  {
    Title: 'Mock 1',
    subtitle: 'Research',
    image: undefined,
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.',
  },
  {
    Title: 'Mock 2',
    subtitle: 'Grant Opportunity',
    image: undefined,
    description: 'Lorem ipsum dolor sit amet consectetur adipiscing elit.',
  },
  {
    Title: 'Mock 3',
    subtitle: 'Analysis',
    image: undefined,
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.',
  },
  {
    Title: 'Mock 4',
    subtitle: 'Research',
    image: undefined,
    description:
      'Lorem ipsum dolor sit amet consectetur adipiscing elit. Dolor sit amet consectetur adipiscing elit quisque faucibus.',
  },
];

/**
 *
 * @param param0
 * @returns a single grid containing information about each project
 */
function Tile({
  title,
  subtitle,
  description,
  image,
}: {
  title: string;
  subtitle?: string;
  description: string;
  image?: string; // FIXME: remove optionality
}) {
  return (
    <div className="display-flex flex-direction-col border-solid border max-w-100 max-h-300 min-h-100">
      <img src={image}></img>
      <h2>{title}</h2>
      <h3>{subtitle}</h3>
      <p>{description}</p>
    </div>
  );
}

/**
 * 
 * @returns grid of all projects
 */
function TileGrid() {
  return (
    <div className="grid grid-cols-2 max-w-200">
      {mockData.map((project, ind) => {
        return (
          <Tile
            key={ind}
            title={project.Title}
            subtitle={project.subtitle}
            description={project.description}
            image={project.image}
          />
        );
      })}
    </div>
  );
}

export default function projects() {
  return (
    <div>
      <h1>Projects</h1>
      <TileGrid/>
    </div>
  );
}
