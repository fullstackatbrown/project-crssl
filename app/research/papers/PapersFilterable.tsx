"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Author = {
  _id: string;
  fullname: string;
  slug?: string;
};

type Paper = {
  _id: string;
  title: string;
  slug?: string;
  date: string;
  type: "Working Paper" | "Report" | "Policy Brief";
  abstract?: string;
  tags?: string[];
  externalUrl?: string;
  pdfUrl?: string;
  authors: Author[];
};

function getPaperHref(paper: Paper): string {
  if (paper.pdfUrl) return paper.pdfUrl;
  if (paper.externalUrl) return paper.externalUrl;
  if (paper.slug) return "/research/papers/" + paper.slug;
  return "";
}

function PaperTile({ paper }: { paper: Paper }) {
  const href = getPaperHref(paper);
  const hasLink = href.length > 0;
  const isExternal = hasLink && href.startsWith("http");

  return (
    <li className="grid grid-cols-1 border-b border-zinc-300 md:grid-cols-[1fr_180px]">
      <div className="px-6 py-7 md:px-8">
        <h2 className="font-serif text-2xl text-black">
          {hasLink ? (
            <a
              href={href}
              className="hover:text-[#a51c30]"
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noopener noreferrer" : undefined}
            >
              {paper.title}
            </a>
          ) : (
            <span>{paper.title}</span>
          )}
        </h2>
        <p className="mt-2 text-xs text-zinc-700">
          {paper.authors?.length
            ? paper.authors.map((author, index) => (
                <span key={author._id}>
                  {index > 0 ? ", " : ""}
                  {author.slug ? (
                    <Link
                      href={`/people/${author.slug}`}
                      className="hover:text-[#a51c30] hover:underline"
                    >
                      {author.fullname}
                    </Link>
                  ) : (
                    <span>{author.fullname}</span>
                  )}
                </span>
              ))
            : "Unknown"}
        </p>
        <p className="mt-1 text-xs uppercase tracking-wide text-zinc-600">
          {new Date(paper.date).toLocaleDateString()}
        </p>
        {!hasLink ? (
          <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-[#a51c30]">
            No link available
          </p>
        ) : null}
      </div>
      <div className="px-6 py-7 text-left text-sm font-semibold text-[#a51c30] md:text-right">
        {paper.type}
      </div>
    </li>
  );
}

export default function PapersFilterable({ papers }: { papers: Paper[] }) {
  const [selectedType, setSelectedType] = useState<string>("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string>("date-desc");

  const hasActiveControls =
    selectedType !== "All" ||
    selectedTags.length > 0 ||
    search.length > 0 ||
    sortBy !== "date-desc";

  function resetControls() {
    setSelectedType("All");
    setSelectedTags([]);
    setSearch("");
    setSortBy("date-desc");
  }

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag],
    );
  }

  const filters = useMemo(() => {
    const values = Array.from(new Set(papers.map((paper) => paper.type)));
    return ["All", ...values];
  }, [papers]);

  const tags = useMemo(() => {
    const values = Array.from(
      new Set(papers.flatMap((paper) => paper.tags ?? []).filter(Boolean)),
    ).sort((a, b) => a.localeCompare(b));
    return values;
  }, [papers]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filteredPapers = papers.filter((paper) => {
      const matchesType = selectedType === "All" || paper.type === selectedType;
      const matchesTag =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => (paper.tags ?? []).includes(tag));
      if (!query) return matchesType && matchesTag;

      const authorText =
        paper.authors
          ?.map((a) => a.fullname)
          .join(" ")
          .toLowerCase() ?? "";
      const haystack =
        `${paper.title} ${paper.abstract ?? ""} ${authorText}`.toLowerCase();
      const matchesSearch = haystack.includes(query);

      return matchesType && matchesTag && matchesSearch;
    });

    return [...filteredPapers].sort((a, b) => {
      if (sortBy === "title-asc") return a.title.localeCompare(b.title);
      if (sortBy === "title-desc") return b.title.localeCompare(a.title);
      if (sortBy === "date-asc") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [papers, search, selectedTags, selectedType, sortBy]);

  return (
    <section className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-10 md:flex-row">
      <aside className="md:w-1/4">
        <p className="text-lg font-bold text-zinc-900">Filter</p>

        <p className="mt-2 text-base font-semibold text-zinc-700">Type</p>
        <div className="mt-1 flex flex-col gap-2 text-sm text-zinc-700">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setSelectedType(filter)}
              className={
                "text-left transition hover:text-[#a51c30] " +
                (selectedType === filter ? "font-semibold text-[#a51c30]" : "")
              }
            >
              {filter}
            </button>
          ))}
        </div>

        <p className="mt-4 text-base font-semibold text-zinc-700">Tags</p>
        <div className="mt-1 flex flex-col gap-1 text-sm text-zinc-700">
          {tags.length === 0 ? (
            <p className="text-xs text-zinc-500">No tags available</p>
          ) : (
            tags.map((tag) => {
              const checked = selectedTags.includes(tag);
              return (
                <label key={tag} className="inline-flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleTag(tag)}
                    className="h-3 w-3"
                  />
                  <span>{tag}</span>
                </label>
              );
            })
          )}
        </div>

        <div className="mt-6">
          <label
            htmlFor="papers-sort"
            className="text-xs font-semibold uppercase tracking-wide text-zinc-600"
          >
            Sort
          </label>
          <select
            id="papers-sort"
            value={sortBy}
            onChange={(event) => setSortBy(event.target.value)}
            className="mt-2 w-full border border-zinc-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#a51c30]"
          >
            <option value="date-desc">Date added (Newest)</option>
            <option value="date-asc">Date added (Oldest)</option>
            <option value="title-asc">Title (A-Z)</option>
            <option value="title-desc">Title (Z-A)</option>
          </select>
        </div>

        <div className="mt-6">
          <label
            htmlFor="papers-search"
            className="text-xs font-semibold uppercase tracking-wide text-zinc-600"
          >
            Search
          </label>
          <input
            id="papers-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Title or author"
            className="mt-2 w-full border border-zinc-300 px-3 py-2 text-sm outline-none focus:border-[#a51c30]"
          />
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={resetControls}
            disabled={!hasActiveControls}
            className="w-full border border-zinc-300 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-zinc-700 transition enabled:hover:border-[#a51c30] enabled:hover:text-[#a51c30] disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reset Filters
          </button>
        </div>
      </aside>

      <div className="flex-1 min-h-[52rem]">
        <div className="border-b border-zinc-300 px-6 py-3 md:px-8">
          <p className="text-xs uppercase tracking-wide text-zinc-600">
            {filtered.length} result{filtered.length === 1 ? "" : "s"}
          </p>
        </div>
        {filtered.length === 0 ? (
          <p className="px-6 py-10 text-sm text-zinc-700 md:px-8">
            No papers match your current filters.
          </p>
        ) : (
          <ul>
            {filtered.map((paper) => (
              <PaperTile key={paper._id} paper={paper} />
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
