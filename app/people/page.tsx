"use client";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { Search } from "lucide-react";
import createImageUrlBuilder from "@sanity/image-url";
import type SanityImageSource from "@sanity/image-url";
import { useState, useEffect } from "react";
import PeopleResults, { type Person } from "../components/PeopleResults";
import { buildSearchQuery, buildTagQuery } from "../lib/queries";
import Image from "next/image";

const builder = createImageUrlBuilder(client);

export function urlFor(source: typeof SanityImageSource) {
  return builder.image(source);
}

const options = { next: { revalidate: 30 } };

const DEBOUNCE_MS = 400;

const STRING_QUERY_FIELDS = ["fullname"];

async function getInterests(): Promise<string[]> {
  return client.fetch(`array::unique(*[_type == "peopleType"].interests[])`);
}
const allInterests = await getInterests();
allInterests.sort();

async function getTitles(): Promise<string[]> {
  return client.fetch(`array::unique(*[_type == "peopleType"].jobtitles[])`);
}
const allTitles = await getTitles();
allTitles.sort();

export default function People() {
  const [peopleData, setPeopleData] = useState<Person[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeInterests, setActiveInterests] = useState<string[]>([]);
  const [activeTitles, setActiveTitles] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedSearch(searchQuery),
      DEBOUNCE_MS,
    );
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    let filter = '_type == "peopleType"';

    if (debouncedSearch.trim()) {
      const searchPart = buildSearchQuery(
        debouncedSearch,
        STRING_QUERY_FIELDS,
        true,
        true,
      );
      if (searchPart) filter += ` && ${searchPart}`;
    }

    if (activeInterests.length > 0) {
      const interestPart = buildTagQuery(activeInterests, "interests");
      if (interestPart) filter += ` && ${interestPart}`;
    }

    if (activeTitles.length > 0) {
      const titlePart = buildTagQuery(activeTitles, "jobtitles");
      if (titlePart) filter += ` && ${titlePart}`;
    }

    const query = `*[${filter}]|order(fullname asc){_id, fullname, image, email, recentwork, jobtitles, interests, slug}`;
    client.fetch<Person[]>(query).then(setPeopleData);
  }, [debouncedSearch, activeInterests, activeTitles]);

  const handleInterestToggle = (interest: string, checked: boolean) => {
    setActiveInterests((prev) =>
      checked ? [...prev, interest] : prev.filter((item) => item !== interest),
    );
  };

  const handleTitleToggle = (title: string, checked: boolean) => {
    setActiveTitles((prev) =>
      checked ? [...prev, title] : prev.filter((item) => item !== title),
    );
  };

  return (
    <div className="bg-white font-main-sans">
      <div>
        <div className="relative w-full h-[420px] overflow-hidden bg-primary">
          <img
            src="/meeting.jpg"
            alt="Meeting image"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-transparent" />

          <div className="absolute bottom-8 left-8 max-w-3xl text-white">
            <h1 className="font-main-serif text-4xl font-semibold tracking-tight md:text-5xl">
              Experts
            </h1>
            <p className="font-main-sans mt-3 max-w-3xl text-sm font-light leading-6 md:text-base">
              The Conflict Research and Security Studies Lab brings together
              experts across the disciplines.
            </p>
          </div>
        </div>
        <div>
          <p
            className="font-main-sans text-md text-gray-900"
            style={{ marginLeft: "3rem", marginTop: "2rem" }}
          >
            <b>{peopleData.length}</b>{" "}
            {peopleData.length === 1 ? "person" : "people"}{" "}
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "1.5rem",
          }}
        >
          <div>
            <Search className="absolute text-gray-400 mt-[0.7rem] ml-[1rem]" />
            <input
              style={{
                width: "88.5rem",
                height: "3rem",
                textIndent: "3rem",
              }}
              className="font-main-sans border-solid border-1 text-sm border-gray-300 bg-gray-50 text-gray-900 placeholder-gray-400"
              type="search"
              value={searchQuery}
              placeholder="Search"
              id="namesearch"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginLeft: "3rem", marginTop: "2rem" }}>
            <h1 className="font-main-sans text-md text-gray-900">
              <b>Filters</b>
            </h1>
            <hr
              className="border-gray-300"
              style={{
                width: "15rem",
                marginTop: "0.1rem",
              }}
            ></hr>

            <div>
              <fieldset>
                {allInterests.map((interest) => (
                  <label
                    className="font-main-sans text-sm text-base text-gray-600"
                    style={{
                      display: "block",
                      clear: "left",
                      marginTop: "0.1rem",
                    }}
                    key={`${interest} button label`}
                  >
                    <input
                      style={{
                        clear: "left",
                        marginRight: "0.5rem",
                        marginTop: "0.5rem",
                      }}
                      className="checkboxes"
                      id={`${interest} checkbox`}
                      name="interest"
                      key={`${interest} checkbox`}
                      type="checkbox"
                      checked={activeInterests.includes(interest)}
                      onChange={(e) =>
                        handleInterestToggle(interest, e.target.checked)
                      }
                    />
                    {interest}
                  </label>
                ))}
              </fieldset>
              <hr
                className="border-gray-300"
                style={{
                  width: "15rem",
                  marginTop: "0.2rem",
                }}
              ></hr>
              <form>
                <fieldset>
                  {allTitles.map((title) => (
                    <label
                      className="font-main-sans text-sm text-base text-gray-600"
                      style={{
                        display: "block",
                        clear: "left",
                        marginTop: "0.1rem",
                      }}
                      key={`${title} button label`}
                    >
                      <input
                        style={{
                          clear: "left",
                          marginRight: "0.5rem",
                          marginTop: "0.5rem",
                        }}
                        className="checkboxes"
                        id={`${title} checkbox`}
                        name="title"
                        key={`${title} checkbox`}
                        type="checkbox"
                        checked={activeTitles.includes(title)}
                        onChange={(e) =>
                          handleTitleToggle(title, e.target.checked)
                        }
                      />
                      {title}
                    </label>
                  ))}
                </fieldset>
              </form>
            </div>

            <form action="https://google.com">
              <button className="font-main-sans hover:bg-gray-100 mb-[1rem] mt-[1rem] p-[1rem] border-1 border-gray-400 bg-gray-50 text-gray-800">
                Need something different? <br />
                Find an expert here!
              </button>
            </form>
          </div>
          <PeopleResults people={peopleData} />
        </div>
      </div>
    </div>
  );
}