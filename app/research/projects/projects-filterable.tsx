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
  projectLeader?: Array<string>;
};

function Tile({ project }: { project: Project }) {
  return (
    <article className="min-h-50 w-full min-w-0 overflow-hidden border border-[0.5px] border-zinc-900 bg-white transition-shadow hover:shadow-sm">
      <Link
        className="relative block aspect-[1/1] w-full overflow-hidden"
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
            <div className="inline-block w-fit rounded-full border border-white/80 px-2 py-1 text-center text-xs text-white">
              <div className="flex flex-row items-center gap-2">
                <Elipsis />
                {project.tags[0]}
              </div>
            </div>
          ) : (
            <div />
          )}
          <div className="px-1 py-1 font-serif text-xl text-white">
            {project.title}
          </div>
          {project.projectLeader?.length ? (
            <div className="px-1 pb-1 text-xs text-zinc-200">
              PL: {project.projectLeader.join(", ")}
            </div>
          ) : null}
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
    <div className="flex items-center gap-2 py-0.5">
      <input
        className="h-3 w-3 accent-zinc-900"
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={onChange}
      />
      <label className="text-sm text-zinc-700" htmlFor={id}>{label}</label>
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
    <section className="mx-auto flex max-w-6xl flex-row items-stretch">
      <div className="min-h-[50rem] w-1/4 self-stretch border border-[0.5px] border-zinc-900 bg-white p-6">
        <h1 className="text-l font-semibold text-zinc-900">Filters</h1>
        <h3 className="text-sm mt-4 mb-1 font-semibold text-zinc-700">Tags</h3>
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
        <h3 className="text-sm mt-4 mb-1 font-semibold text-zinc-700">Faculty</h3>
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
        <h3 className="text-sm mt-4 mb-1 font-semibold text-zinc-700">Keywords</h3>
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
              className="w-full rounded border border-zinc-300 bg-white px-2 py-1 text-sm text-zinc-800 placeholder:text-zinc-400 focus:border-zinc-500 focus:outline-none"
              role="combobox"
              aria-expanded={isKeywordSuggestionsOpen && keywordSuggestions.length > 0}
              aria-controls="keyword-suggestions-list"
            />
            <button
              type="submit"
              className="rounded border border-zinc-300 bg-white px-2 py-1 text-xs font-medium text-zinc-700 hover:bg-zinc-100"
            >
              Enter
            </button>
          </form>
          {isKeywordSuggestionsOpen && keywordSuggestions.length > 0 ? (
            <ul
              id="keyword-suggestions-list"
              className="absolute z-10 mt-1 max-h-48 w-full overflow-y-auto rounded border border-zinc-200 bg-white text-sm shadow-sm"
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
      <div className="min-h-[50rem] flex-1">
        {filteredProjects.length === 0 ? (
          <div className="flex h-full min-h-[50rem] items-center justify-center rounded border border-zinc-200 bg-zinc-50 px-6 text-center text-zinc-600">
            No projects match current filters.
          </div>
        ) : (
          <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <Tile key={project._id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
