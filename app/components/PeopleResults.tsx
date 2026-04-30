import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import createImageUrlBuilder from "@sanity/image-url";
import type SanityImageSource from "@sanity/image-url";

// Create an image URL builder using the client
const builder = createImageUrlBuilder(client);

// Export a function that can be used to get image URLs
export function urlFor(source: typeof SanityImageSource) {
  return builder.image(source);
}

export type Person = {
  _id: string;
  fullname: string;
  image: typeof SanityImageSource;
  email: string;
  recentwork: string;
  jobtitles: string[];
  interests: string[];
  slug: { current: string };
};

type PeopleResultsProps = {
  people: Person[];
};

export default function PeopleResults({ people }: PeopleResultsProps) {
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
        {people.map((person) => (
          <div
            style={{ display: "flex", alignItems: "center" }}
            className="personlist"
            key={person._id}
          >
            <div>
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
