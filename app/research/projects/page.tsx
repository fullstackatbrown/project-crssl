import Link from 'next/link';
import mockData from './mockData';
import Elipsis from './project-extra';
import { type SanityDocument } from 'next-sanity';
import { client } from '@/sanity/lib/client';

type Person = {
  name: String;
};

type Project = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: object;
  description: string;
  relaventLinks: Array<string>;
  content: string;
  contributors: Array<Object>;
  coverImage: string;
  tags: Array<string>;
  projectLeader: Array<Person>;
};
/**
 *
 * @param param0
 * @returns a single grid containing information about each project
 */
function Tile({ project: project }: { project: Project }) {
  return (
    <div className="display-flex flex-direction-col border-solid border width-100 height-100 min-w-75 min-h-75">
      <Link
        className="block relative w-full h-full overflow-hidden"
        href={`/research/projects/${project.slug.current}`}
      >
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={project.coverImage}
        ></img>
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <div className=" inline-block border-solid border-1 border-white rounded-[60px] text-white text-center text-xs w-fit px-2 py-1">
            <div className="flex flex-row gap-2 items-center">
              <Elipsis />
              {project.tags[0]}
              {/* FIXME: allow multiple tags? */}
            </div>
          </div>
          <div className="text-white px-1 py-1 font-serif text-xl">
            {project.title}
          </div>
        </div>
      </Link>
    </div>
  );
}

const PROJECTS_QUERY = `*[_type == "projectType"]{
  _id, 
  title, 
  slug, 
  publishedAt, 
  description, 
  relaventLinks, 
  content, 
  contributors, 
  "coverImage": coverImage.asset->url,
  tags,
  projectLeader
}`;

const options = { next: { revalidate: 30 } };

/**
 *
 * @returns grid of all projects
 */
async function TileGrid() {
  const projects = await client.fetch<Project[]>(PROJECTS_QUERY, {}, options);

  console.log(projects);
  if (!projects) {
    return <div></div>;
  }

  return (
    <div className="grid grid-cols-3">
      {projects.map((project: Project, ind: number) => {
        return <Tile key={ind} project={project} />;
      })}
    </div>
  );
}

/**Temporarily a placeholder for the side bar */
function SideBar() {
  return (
    <div className="w-1/4">
      <h1>Side Bar</h1>
    </div>
  );
}

export default function projects() {
  return (
    <div>
      <h1>Projects</h1>
      <div className="flex flex-row">
        <SideBar />
        <TileGrid />
      </div>
    </div>
  );
}
