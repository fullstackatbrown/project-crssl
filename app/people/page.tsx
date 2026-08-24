"use client";
import { client } from "@/sanity/lib/client";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";
import PeopleResults, { type Person } from "../components/PeopleResults";
import { buildSearchQuery, buildTagQuery } from "../lib/queries";
import PeopleBanner from "../components/PeopleBanner";

const DEBOUNCE_MS = 400;

const STRING_QUERY_FIELDS = ["fullname"];

export default function People() {
  const [peopleData, setPeopleData] = useState<Person[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeInterests, setActiveInterests] = useState<string[]>([]);
  const [activeTitles, setActiveTitles] = useState<string[]>([]);
  const [allInterests, setAllInterests] = useState<string[]>([]);
  const [allTitles, setAllTitles] = useState<string[]>([]);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [expertFinderButton, setExpertFinderButton] = useState<{
    text: string;
    url: string;
  }>({
    text: "Need something different?\nFind an expert here!",
    url: "https://google.com",
  });

  // Fetch initial filter data and configuration
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // Fetch all interests
        const interests = await client.fetch(
          `array::unique(*[_type == "peopleType"].interests[])`
        );
        interests.sort();
        setAllInterests(interests);

        // Fetch all titles
        const titles = await client.fetch(
          `array::unique(*[_type == "peopleType"].jobtitles[])`
        );
        titles.sort();
        setAllTitles(titles);

        // Fetch excluded titles
        const excludedTitles = await client.fetch(
          `*[_type == "peoplePage"][0].excludedTitles`
        );

        // Set initial active titles (all except excluded)
        if (excludedTitles && excludedTitles.length > 0) {
          const initialTitles = titles.filter(
            (title: string) => !excludedTitles.includes(title)
          );
          setActiveTitles(initialTitles);
        }

        // Fetch expert finder button config
        const buttonConfig = await client.fetch(
          `*[_type == "peoplePage"][0].expertFinderButton{text, url}`
        );
        if (buttonConfig) {
          setExpertFinderButton(buttonConfig);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setIsInitialLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const timer = setTimeout(
      () => setDebouncedSearch(searchQuery),
      DEBOUNCE_MS,
    );
    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    // Don't fetch people data until initial config is loaded
    if (isInitialLoading) return;

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
      // Use OR logic for titles: show people who have ANY of the selected titles
      const titleConditions = activeTitles
        .map((title) => `"${title}" in jobtitles`)
        .join(" || ");
      filter += ` && (${titleConditions})`;
    }

    const query = `*[${filter}]|order(fullname asc){_id, fullname, image, email, recentwork, jobtitles, interests, testimonial, slug}`;
    client.fetch<Person[]>(query).then(setPeopleData);
  }, [debouncedSearch, activeInterests, activeTitles, isInitialLoading]);

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
        <PeopleBanner />
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

            {expertFinderButton.url && (
              <a
                href={expertFinderButton.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-main-sans hover:bg-gray-100 mb-[1rem] mt-[1rem] p-[1rem] border-1 border-gray-400 bg-gray-50 text-gray-800 inline-block text-center"
              >
                {expertFinderButton.text.split('\n').map((line, index, arr) => (
                  <span key={index}>
                    {line}
                    {index < arr.length - 1 && <br />}
                  </span>
                ))}
              </a>
            )}
          </div>
          <PeopleResults people={peopleData} />
        </div>
      </div>
    </div>
  );
}
