import { client } from "@/sanity/lib/client";
import ProjectsFilterable, { Project } from "./projects-filterable";

const PROJECTS_QUERY = `*[_type == "projectType"]{
  _id,
  title,
  slug,
  publishedAt,
  description,
  blurb,
  relevantLinks,
  content,
  "contributors": contributors[]->fullname,
  "coverImage": coverImage.asset->url,
  tags,
  projectLeader,
  keywords,
  papers
}`;

const options = { next: { revalidate: 30 } };

async function getProjects() {
  const projects = await client.fetch<Project[]>(PROJECTS_QUERY, {}, options);
  return projects ?? [];
}
export default async function projects() {
  const projects = await getProjects();
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
      <ProjectsFilterable projects={projects} />
    </div>
  );
}
