"use client";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import createImageUrlBuilder from "@sanity/image-url";
import type SanityImageSource from "@sanity/image-url";
import PeopleResults from "../components/PeopleResults";
import PeopleCount from "../components/PeopleCount";
import PeopleFilter from "../components/PeopleFilter";

// Create an image URL builder using the client
const builder = createImageUrlBuilder(client);

// Export a function that can be used to get image URLs
export function urlFor(source: typeof SanityImageSource) {
  return builder.image(source);
}

export default function People() {
  return (
    <div className="bg-white">
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
            className="text-4xl text-gray-900"
          >
            Experts
          </h1>
          <h2
            style={{
              position: "absolute",
              bottom: "1rem",
              marginLeft: "2rem",
            }}
            className="text-xl text-gray-900"
          >
            The Conflict Research and Security Studies Lab brings together
            experts across the disciplines.
          </h2>
        </div>
        <PeopleCount />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "2rem",
          }}
        >
          <form action={""}>
            <input
              style={{
                width: "88.5rem",
                height: "3rem",
                textIndent: "2rem",
              }}
              className="border-solid border bg-gray-50 text-gray-900"
              type="search"
              placeholder="Search"
              id="namesearch"
              name="search-term"
            />
            <button
              style={{ width: "3rem", height: "3rem" }}
              className="group absolute right-[3rem] bg-gray-50 hover:bg-[#a51c30] border-black border-r border-t border-b"
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
          </form>
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
            <PeopleFilter />
          </div>
          <PeopleResults />
        </div>
      </div>
    </div>
  );
}
