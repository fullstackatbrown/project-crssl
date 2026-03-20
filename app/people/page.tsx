// "use client";
import Image from "next/image";
import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";
import createImageUrlBuilder from "@sanity/image-url";
import type SanityImageSource from "@sanity/image-url";

// Create an image URL builder using the client
const builder = createImageUrlBuilder(client);

// Export a function that can be used to get image URLs
export function urlFor(source: typeof SanityImageSource) {
  return builder.image(source);
}

const DEFAULT_QUERY = `*[
  _type == "peopleType"
]|order(fullname desc){_id, fullname, image, recentwork, jobtitles, interests, slug}`;

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

  return (
    <div>
      <div>
        <p>BANNER PHOTO HERE</p>
        <h1>Experts</h1>
        <h2>
          The Conflict Research and Security Studies Lab brings together experts
          across the disciplines.
        </h2>
        <div>
          <fieldset>
            {interests.map((interest) => (
              <label key={`${interest} button label`}>
                <input
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
        </div>
        <p>
          {peoplecount} {plural}{" "}
        </p>
        <ul className="flex flex-col gap-y-4">
          {datasets.map((person) => (
            <li className="personlist" key={person._id}>
              <Link
                className="hover:underline"
                href={`/people/${person.slug.current}`}
              >
                <h2 className="font-semibold">{person.name}</h2>
                <p>{person.fullname}</p>
              </Link>
              <Image
                alt="generic profile image"
                src={urlFor(person.image).url()}
                width={100}
                height={100}
              />
              <p>{person.jobtitles.join(", ")}</p>
              <p>{person.interests.join(", ")}</p>

              <Link className="hover:underline" href={`${person.recentwork}`}>
                <p>Title of most recent work</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}