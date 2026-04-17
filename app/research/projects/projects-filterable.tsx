"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Elipsis from "./project-extra";

export type Project = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  description: string;
  blurb: string;
  relevantLinks: Array<string>;
  content: string;
  contributors: Array<string>;
  coverImage: string;
  tags: Array<string>;
  projectLeader: Array<{ name: string }>;
};

function Tile({ project }: { project: Project }) {
  return (
    <article className="w-full min-w-0 min-h-50 overflow-hidden border border-solid border-black">
      <Link
        className="relative block w-full overflow-hidden aspect-[1/1]"
        href={`/research/projects/${project.slug.current}`}
      >
        <img
          className="absolute inset-0 w-full h-full object-fill"
          src={project.coverImage}
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black to-transparent"
          aria-hidden="true"
        />
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          {project.tags?.length ? (
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
    </article>
  );
}

function FilterCheckbox({
  id,
  label,
  checked,
  onChange,
}: {
  id: string;
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div>
      <input
        className="w-3 h-3"
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={onChange}
      />
      <label className='text-sm text-zinc-700' htmlFor={id}>{label}</label>
    </div>
  );
}

export default function ProjectsFilterable({
  projects,
}: {
  projects: Project[];
}) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<string[]>([]);

  const tagsList = useMemo(
    () =>
      [...new Set(projects.flatMap((project) => project.tags ?? []))]
        .filter(Boolean)
        .sort(),
    [projects],
  );

  const facultyList = useMemo(
    () =>
      [...new Set(projects.flatMap((project) => project.contributors ?? []))]
        .filter(Boolean)
        .sort(),
    [projects],
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const tagMatch =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => project.tags?.includes(tag));
      const facultyMatch =
        selectedFaculty.length === 0 ||
        selectedFaculty.some((faculty) =>
          project.contributors?.includes(faculty),
        );

      return tagMatch && facultyMatch;
    });
  }, [projects, selectedTags, selectedFaculty]);

  const toggleSelection = (
    value: string,
    selectedValues: string[],
    setSelectedValues: (values: string[]) => void,
  ) => {
    if (selectedValues.includes(value)) {
      setSelectedValues(selectedValues.filter((item) => item !== value));
      return;
    }
    setSelectedValues([...selectedValues, value]);
  };

  return (
    <section className="mx-auto flex max-w-6xl flex-row gap-6 px-6 py-10">
      <div className="w-1/4">
        <h1 className="font-bold">Filter</h1>
        <h3 className="font-semibold text-zinc-700">Tags</h3>
        {tagsList.map((tag) => (
          <FilterCheckbox
            key={tag}
            id={`tag-${tag}`}
            label={tag}
            checked={selectedTags.includes(tag)}
            onChange={() =>
              toggleSelection(tag, selectedTags, setSelectedTags)
            }
          />
        ))}
        <h3 className="font-semibold text-zinc-700">Keywords</h3>
        <h3 className="font-semibold text-zinc-700">Faculty</h3>
        {facultyList.map((faculty) => (
          <FilterCheckbox
            key={faculty}
            id={`faculty-${faculty}`}
            label={faculty}
            checked={selectedFaculty.includes(faculty)}
            onChange={() =>
              toggleSelection(faculty, selectedFaculty, setSelectedFaculty)
            }
          />
        ))}
      </div>
      <div className="flex-1 min-h-[52rem]">
        {filteredProjects.length === 0 ? (
          <div className="flex h-full min-h-[52rem] items-center justify-center px-6 text-center text-zinc-600">
            No projects match current filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
            {filteredProjects.map((project) => (
              <Tile key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
