"use client";

import { useId, useState } from "react";

type ProjectMetaPanelProps = {
  formattedPublishedDate: string | null;
  keywords?: string[];
  projectLeader?: string[];
  contributors?: string[];
};

export function ProjectMetaPanel({
  formattedPublishedDate,
  keywords,
  projectLeader,
  contributors,
}: ProjectMetaPanelProps) {
  const [open, setOpen] = useState(false);
  const baseId = useId();
  const toggleId = `${baseId}-toggle`;
  const panelId = `${baseId}-panel`;

  const hasContent =
    Boolean(formattedPublishedDate) ||
    Boolean(keywords?.length) ||
    Boolean(projectLeader?.length) ||
    Boolean(contributors?.length);

  if (!hasContent) return null;

  return (
    <div className="w-full overflow-x-visible">
      {/* Bar row only: backdrop height matches the toggle, not the expanded panel */}
      <div className="relative w-full overflow-x-visible">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-0 w-screen bg-black"
          aria-hidden
        />
        <button
          type="button"
          id={toggleId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => setOpen((v) => !v)}
          className="relative z-10 flex w-full items-center justify-center gap-1.5 bg-transparent px-3 py-2.5 text-center text-sm font-medium text-white transition-colors hover:text-[#a51c30]"
        >
          <span>Project details</span>
          <span
            className={`inline-flex shrink-0 text-inherit transition-[color,transform] duration-200 ${open ? "rotate-180" : ""}`}
            aria-hidden
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>
      </div>
      {open ? (
        <div
          id={panelId}
          role="region"
          aria-labelledby={toggleId}
          className="relative z-10 flex flex-col gap-1 border-b border-zinc-200 bg-white px-6 py-3"
        >
          {formattedPublishedDate ? (
            <p className="text-xs leading-6 text-zinc-700">
              <span className="mr-1 font-serif text-base text-[#a51c30]">Published:</span>
              {formattedPublishedDate}
            </p>
          ) : null}
          {keywords?.length ? (
            <div className="flex flex-row flex-wrap gap-2">
              <h3 className="font-serif text-m text-[#a51c30]">Keywords:</h3>
              {keywords.map((keyword) => (
                <span
                  key={keyword}
                  className="inline-flex items-center rounded-full border border-[#a51c30]/20 bg-[#a51c30]/5 px-3 py-1 text-xs font-medium tracking-wide text-zinc-700"
                >
                  {keyword}
                </span>
              ))}
            </div>
          ) : null}
          {projectLeader?.length ? (
            <p className="text-xs leading-6 text-zinc-700">
              <span className="mr-1 font-serif text-base text-[#a51c30]">Project Leader:</span>
              {projectLeader.join(", ")}
            </p>
          ) : null}
          {contributors?.length ? (
            <p className="text-xs leading-6 text-zinc-700">
              <span className="mr-1 font-serif text-base text-[#a51c30]">Contributors:</span>
              {contributors.join(", ")}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
