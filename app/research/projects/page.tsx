import { client } from "@/sanity/lib/client";
import ProjectsFilterable, { Project } from "./projects-filterable";
import Link from "next/link";

const PROJECTS_QUERY = `*[_type == "projectType"]{
  _id,
  title,
  slug,
  publishedAt,
  description,
  blurb,
  relevantLinks,
  content,
  "coverImage": coverImage.asset->url,
  tags,
  keywords,
  papers,
  "projectLeader": people[role == "leader"].person->fullname,
  "contributors": people[role == "contributor"].person->fullname,
  "facultyForFilter": array::unique(people[].person->fullname)
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
          <h1 className="font-serif text-4xl md:text-5xl">Research</h1>
          <p className="mt-2 max-w-xl text-sm text-zinc-300">
            CRSSL conducts research in conflict, elections, and institutions.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl bg-white">
        <div className="grid grid-cols-3 border-b border-zinc-300 text-center text-sm font-semibold uppercase tracking-wide">
            <div
              className="border-r border-zinc-300 bg-black px-4 py-4 text-white"
            >
              Projects
            </div>
            <Link
              href="/research/papers"
              className="border-r border-zinc-300 px-4 py-4 hover:bg-zinc-50 hover:text-[#a51c30]"
            >
              Papers
            </Link>
            <Link
              href="/research/explainers"
              className="border-r border-zinc-300 px-4 py-4 hover:bg-zinc-50 hover:text-[#a51c30]"
            >
              Explainers
            </Link>
          </div>
      </section>
      <ProjectsFilterable projects={projects} />
    </div>
  );
}
