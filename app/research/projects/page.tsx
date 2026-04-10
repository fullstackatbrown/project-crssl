import Link from "next/link";
import Elipsis from "./project-extra";
import { client } from "@/sanity/lib/client";

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
  blurb: string;
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
    <div className="flex flex-col border border-solid min-w-90">
      <Link
        className="block relative w-full h-48 overflow-hidden"
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
      {project.blurb && (
        <p className="text-sm text-gray-600 font-serif px-2 py-2">
          {project.blurb}
        </p>
      )}
    </div>
  );
}

const PROJECTS_QUERY = `*[_type == "projectType"]{
  _id,
  title,
  slug,
  publishedAt,
  description,
  blurb,
  relevantLinks,
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
    <div className="grid grid-cols-3 gap-6">
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
    <div className="bg-white text-black">
      <section className="bg-black px-6 py-14 text-white md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-serif text-4xl md:text-5xl">Projects</h1>
          <p className="mt-2 max-w-xl text-sm text-zinc-300">
            Research projects conducted by CRSSL.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-10">
        <TileGrid />
      </section>
    </div>
  );
}
