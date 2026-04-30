import { client } from "@/sanity/lib/client";
import ProjectsFilterable, { Project } from "./projects-filterable";
import Link from "next/link";
import ResearchBanner from "@/app/components/ResearchBanner";

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
      <ResearchBanner active="projects" />
      <ProjectsFilterable projects={projects} />
    </div>
  );
}
