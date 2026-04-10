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
  relevantLinks: Array<string>;
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
    <div className="display-flex flex-direction-col border-solid border width-200 height-200 min-w-90 min-h-90">
      <Link
        className="block relative w-full h-full overflow-hidden"
        href={`/research/projects/${project.slug.current}`}
      >
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src={project.coverImage}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black to-transparent"
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          {project.tags ? (
            <div className=" inline-block border-solid border-1 border-white rounded-[60px] text-white text-center text-xs w-fit px-2 py-1">
              <div className="flex flex-row gap-2 items-center">
                <Elipsis />
                {project.tags[0]}
              </div>
            </div>
          ) : (
            <div />
          )}
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

const TAGS_QUERY = `*[_type == "projectType"]{
  _id,
  tags
}`

const KEYWORDS_QUERY = `*[_type == "projectType"]{
  _id,
  keywords
}`

const FACULTY_QUERY = `*[_type == "projectType"]{
  _id,
  contributors
}`

/**Temporarily a placeholder for the side bar */
async function SideBar() {
  const tags = await client.fetch<Project[]>(TAGS_QUERY, {}, options);
  const keywords = await client.fetch<Project[]>(KEYWORDS_QUERY, {}, options);
  const faculty = await client.fetch<Project[]>(FACULTY_QUERY, {}, options);

  console.log(tags, keywords, faculty);

  return (
    <div className="w-1/4">
      <h1>Filter</h1>
      <h3>Tags</h3>
      <h3>Keywords</h3>
      <h3>Faculty</h3>
    </div>
  );
}

export default function projects() {
  return (
    <div>
      <h1>Projects</h1>
      <div className="flex flex-row justify-between">
        <SideBar />
        <TileGrid />
      </div>
    </div>
  );
}
