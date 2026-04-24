"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Fuse from "fuse.js";
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
  keywords?: Array<string>;
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
  const [keywordQuery, setKeywordQuery] = useState("");
  const [keywordInputValue, setKeywordInputValue] = useState("");
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(-1);
  const [isKeywordSuggestionsOpen, setIsKeywordSuggestionsOpen] = useState(false);

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

  const keywordList = useMemo(
    () =>
      [...new Set(projects.flatMap((project) => project.keywords ?? []))]
        .filter(Boolean)
        .sort(),
    [projects],
  );

  const fuse = useMemo(
    () =>
      new Fuse(projects, {
        keys: ["keywords"],
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [projects],
  );

  const keywordFuse = useMemo(
    () =>
      new Fuse(keywordList, {
        threshold: 0.35,
        ignoreLocation: true,
      }),
    [keywordList],
  );

  const keywordSuggestions = useMemo(() => {
    const trimmedKeywordQuery = keywordInputValue.trim();
    if (trimmedKeywordQuery.length === 0) {
      return keywordList.slice(0, 8);
    }

    return keywordFuse
      .search(trimmedKeywordQuery, { limit: 8 })
      .map((result) => result.item);
  }, [keywordInputValue, keywordList, keywordFuse]);

  const filteredProjects = useMemo(() => {
    const trimmedKeywordQuery = keywordQuery.trim();
    const keywordTerms = trimmedKeywordQuery
      .split(/\s+/)
      .map((term) => term.trim())
      .filter(Boolean);

    const baseProjects =
      keywordTerms.length > 0
        ? projects.filter((project) =>
            keywordTerms.every((term) =>
              fuse
                .search(term)
                .some((result) => result.item._id === project._id),
            ),
          )
        : projects;

    return baseProjects.filter((project) => {
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
  }, [projects, selectedTags, selectedFaculty, keywordQuery, fuse]);

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

  const selectKeywordSuggestion = (value: string) => {
    setKeywordInputValue(value);
    setKeywordQuery(value);
    setActiveSuggestionIndex(-1);
    setIsKeywordSuggestionsOpen(false);
  };

  const applyKeywordQuery = () => {
    setKeywordQuery(keywordInputValue.trim().replace(/\s+/g, " "));
    setActiveSuggestionIndex(-1);
    setIsKeywordSuggestionsOpen(false);
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
        <h3 className="font-semibold text-zinc-700">Keywords</h3>
        <div className="relative">
          <form
            className="flex items-center gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              applyKeywordQuery();
            }}
          >
            <input
              type="text"
              value={keywordInputValue}
              onChange={(event) => {
                setKeywordInputValue(event.target.value);
                setActiveSuggestionIndex(-1);
                setIsKeywordSuggestionsOpen(true);
              }}
              onFocus={() => setIsKeywordSuggestionsOpen(true)}
              onBlur={() => setIsKeywordSuggestionsOpen(false)}
              onKeyDown={(event) => {
                if (event.key === "ArrowDown" && keywordSuggestions.length > 0) {
                  event.preventDefault();
                  setActiveSuggestionIndex((currentIndex) =>
                    currentIndex < keywordSuggestions.length - 1
                      ? currentIndex + 1
                      : 0,
                  );
                }

                if (event.key === "ArrowUp" && keywordSuggestions.length > 0) {
                  event.preventDefault();
                  setActiveSuggestionIndex((currentIndex) =>
                    currentIndex > 0
                      ? currentIndex - 1
                      : keywordSuggestions.length - 1,
                  );
                }

                if (event.key === "Enter" && activeSuggestionIndex >= 0) {
                  event.preventDefault();
                  selectKeywordSuggestion(keywordSuggestions[activeSuggestionIndex]);
                }

                if (event.key === "Escape") {
                  setActiveSuggestionIndex(-1);
                  setIsKeywordSuggestionsOpen(false);
                }
              }}
              placeholder="Search keywords"
              className="w-full rounded border border-zinc-300 px-2 py-1 text-sm"
              role="combobox"
              aria-expanded={isKeywordSuggestionsOpen && keywordSuggestions.length > 0}
              aria-controls="keyword-suggestions-list"
            />
            <button
              type="submit"
              className="rounded border border-zinc-300 px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
            >
              Enter
            </button>
          </form>
          {isKeywordSuggestionsOpen && keywordSuggestions.length > 0 ? (
            <ul
              id="keyword-suggestions-list"
              className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded border border-zinc-200 bg-white text-sm shadow"
            >
              {keywordSuggestions.map((suggestion, index) => (
                <li key={suggestion}>
                  <button
                    type="button"
                    className={`w-full px-2 py-1 text-left ${index === activeSuggestionIndex
                        ? "bg-zinc-100 text-zinc-900"
                        : "hover:bg-zinc-50"
                      }`}
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => selectKeywordSuggestion(suggestion)}
                  >
                    {suggestion}
                  </button>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
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
