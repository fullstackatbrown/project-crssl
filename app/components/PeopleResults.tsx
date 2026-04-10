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
]|order(fullname asc){_id, fullname, image, email, recentwork, jobtitles, interests, slug}`;

export default async function PeopleResults() {
  const options = { next: { revalidate: 30 } };

  const datasets = await client.fetch<SanityDocument[]>(
    DEFAULT_QUERY,
    {},
    options,
  );

  // console.log("Fetched datasets:", datasets);

  const interestsall = [datasets.map((person) => person.interests)];
  const interestsflat = interestsall.flat(Infinity);
  const interests = Array.from(new Set(interestsflat));
  interests.sort();

  const titlesall = [datasets.map((person) => person.jobtitles)];
  const titlesflat = titlesall.flat(Infinity);
  const titles = Array.from(new Set(titlesflat));
  titles.sort();
  return (
    <div
      className="allpeople"
      style={{
        marginTop: "2rem",
        marginLeft: "2rem",
        marginBottom: "2rem",
      }}
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
                <b className="text-lg text-gray-900">{person.fullname}</b>
              </Link>

              <p className="text-gray-500">{person.jobtitles.join(", ")}</p>
              <p className="text-gray-900" style={{ marginTop: "1rem" }}>
                {person.interests.join(", ")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
