"use client";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { Search } from "lucide-react";
import createImageUrlBuilder from "@sanity/image-url";
import type SanityImageSource from "@sanity/image-url";
import { useState, useEffect } from "react";
import PeopleResults, { type Person } from "../components/PeopleResults";
import { buildSearchQuery, buildTagQuery } from "../lib/queries";

// Create an image URL builder using the client
const builder = createImageUrlBuilder(client);

// Export a function that can be used to get image URLs
export function urlFor(source: typeof SanityImageSource) {
  return builder.image(source);
}

const options = { next: { revalidate: 30 } };

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
  const [activeInterests, setActiveInterests] = useState<string[]>([]);
  const [activeTitles, setActiveTitles] = useState<string[]>([]);

  useEffect(() => {
    let filter = '_type == "peopleType"';

    if (searchQuery.trim()) {
      const searchPart = buildSearchQuery(searchQuery, STRING_QUERY_FIELDS, true, true);
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
  }, [searchQuery, activeInterests, activeTitles]);

  const handleInterestToggle = (interest: string, checked: boolean) => {
    setActiveInterests((prev) =>
      checked ? [...prev, interest] : prev.filter((item) => item !== interest)
    );
  };

  const handleTitleToggle = (title: string, checked: boolean) => {
    setActiveTitles((prev) =>
      checked ? [...prev, title] : prev.filter((item) => item !== title)
    );
  };

  return (
    <div className="bg-white">
      <div>
        <div
          style={{
            height: "15rem",
            background: "#7c0b0a",
            display: "flex",
            flexDirection: "column",
            position: "relative",
            // alignItems: "flex-end",
          }}
        >
          <h1
            style={{
              position: "absolute",
              bottom: "3rem",
              marginLeft: "2rem",
            }}
            className="text-4xl text-white"
          >
            Experts
          </h1>
          <h2
            style={{
              position: "absolute",
              bottom: "1rem",
              marginLeft: "2rem",
            }}
            className="text-xl text-white"
          >
            The Conflict Research and Security Studies Lab brings together
            experts across the disciplines.
          </h2>
        </div>
        <div>
          <p
            className="text-lg text-gray-900"
            style={{ marginLeft: "3rem", marginTop: "2rem" }}
          >
            <b>{peopleData.length}</b> {peopleData.length === 1 ? "person" : "people"}{" "}
          </p>
        </div>
        {/* <PeopleCount /> */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2rem",
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
              className="border-solid border bg-gray-50 text-gray-900 placeholder-gray-400"
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
            <h1 className="text-lg text-gray-900">Filters</h1>
            <hr
              className="border-gray-900"
              style={{
                width: "15rem",
                marginTop: "0.1rem",
                // marginBottom: "0.1rem",
              }}
            ></hr>

            <div>
              <fieldset>
                {allInterests.map((interest) => (
                  <label
                    className="text-base text-gray-900"
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
                className="border-gray-900"
                style={{
                  width: "15rem",
                  marginTop: "0.2rem",
                }}
              ></hr>
              <form>
                <fieldset>
                  {allTitles.map((title) => (
                    <label
                      className="text-base text-gray-900"
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
              <button className="hover:bg-gray-100 mb-[1rem] mt-[1rem] p-[1rem] border rounded bg-gray-50 border-gray-900 text-gray-900">
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
