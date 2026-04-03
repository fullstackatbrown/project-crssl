// "use client";
import Image from "next/image";
import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import createImageUrlBuilder from "@sanity/image-url";
import type SanityImageSource from "@sanity/image-url";
import { relative } from "path";

// Create an image URL builder using the client
const builder = createImageUrlBuilder(client);

// Export a function that can be used to get image URLs
export function urlFor(source: typeof SanityImageSource) {
  return builder.image(source);
}

const DEFAULT_QUERY = `*[
  _type == "peopleType"
]|order(fullname asc){_id, fullname, image, email, recentwork, jobtitles, interests, slug}`;

const counter = defineQuery(`count(*[_type == 'peopleType'])`);

function FilterPeople() {}

function SearchInput() {
  return (
    <div>
      <input type="search" className="border-solid border" />
      <button onClick={Search} className="border-solid border">
        {" "}
        Search{" "}
      </button>
    </div>
  );
}

function Search() {}
export default async function People() {
  const options = { next: { revalidate: 30 } };

  const datasets = await client.fetch<SanityDocument[]>(
    DEFAULT_QUERY,
    {},
    options,
  );
  console.log("Fetched datasets:", datasets);

  const peoplecount = await client.fetch(counter, {}, options);
  const plural = peoplecount > 1 ? "people" : "person";

  const interestsall = [datasets.map((person) => person.interests)];
  const interestsflat = interestsall.flat(Infinity);
  const interests = Array.from(new Set(interestsflat));
  interests.sort();

  const titlesall = [datasets.map((person) => person.jobtitles)];
  const titlesflat = titlesall.flat(Infinity);
  const titles = Array.from(new Set(titlesflat));
  titles.sort();

  return (
    <div>
      <div>
        <div
          style={{
            height: "15rem",
            background: "pink",
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
            className="text-4xl"
          >
            Experts
          </h1>
          <h2
            style={{
              position: "absolute",
              bottom: "1rem",
              marginLeft: "2rem",
            }}
            className="text-xl"
          >
            The Conflict Research and Security Studies Lab brings together
            experts across the disciplines.
          </h2>
        </div>
        <p
          className="text-lg"
          style={{ marginLeft: "3rem", marginTop: "2rem" }}
        >
          <b>{peoplecount}</b> {plural}{" "}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <input
            style={{
              width: "88.5rem",
              height: "3rem",
              textIndent: "2rem",
            }}
            className="border-solid border bg-gray-50"
            type="search"
            placeholder="Search"
          />
          <button
            style={{ width: "3rem", height: "3rem" }}
            className="group absolute right-[3rem] hover:bg-[#a51c30]"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="relative -right-[0.75rem] "
            >
              <path
                d="M19 19L14.66 14.66M17 9C17 13.4183 13.4183 17 9 17C4.58172 17 1 13.4183 1 9C1 4.58172 4.58172 1 9 1C13.4183 1 17 4.58172 17 9Z"
                stroke="#979696"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:stroke-gray-50"
              />
            </svg>
          </button>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ marginLeft: "3rem", marginTop: "2rem" }}>
            <h1 className="text-lg">Filters</h1>
            <hr
              style={{
                width: "15rem",
                marginTop: "0.1rem",
                // marginBottom: "0.1rem",
              }}
            ></hr>
            <fieldset>
              {interests.map((interest) => (
                <label
                  className="text-base"
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
                    name="checkbox"
                    key={`${interest} checkbox`}
                    type="checkbox"
                  />
                  {interest}
                </label>
              ))}
            </fieldset>
            <hr
              style={{
                width: "15rem",
                marginTop: "0.2rem",
              }}
            ></hr>
            <fieldset>
              {titles.map((title) => (
                <label
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
                    name="checkbox"
                    key={`${title} checkbox`}
                    type="checkbox"
                  />
                  {title}
                </label>
              ))}
            </fieldset>
          </div>
          <div
            className="allpeople"
            style={{ marginTop: "2rem", marginLeft: "2rem" }}
          >
            <div className="flex flex-col gap-y-4">
              {datasets.map((person) => (
                <div
                  style={{ display: "flex", alignItems: "center" }}
                  className="personlist"
                  key={person._id}
                >
                  <div>
                    {" "}
                    <Image
                      alt="generic profile image"
                      src={urlFor(person.image).url()}
                      width={150}
                      height={150}
                    />
                  </div>
                  <div style={{ marginLeft: "1rem" }}>
                    <Link
                      className="hover:underline"
                      href={`/people/${person.slug.current}`}
                    >
                      <b className="text-lg">{person.fullname}</b>
                    </Link>

                    <p className="text-gray-500">
                      {person.jobtitles.join(", ")}
                    </p>
                    <p style={{ marginTop: "1rem" }}>
                      {person.interests.join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
