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
  testimonial?: string;
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
            style={{ display: "flex", alignItems: "center", gap: "2rem" }}
            className="personlist"
            key={person._id}
          >
            <div style={{ display: "flex", alignItems: "center", flex: "0 0 auto" }}>
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
                <p className="text-md text-gray-500">{person.jobtitles.join(", ")}</p>
                <p className="text-md text-gray-900" style={{ marginTop: "1rem" }}>
                  {person.interests.join(", ")}
                </p>
              </div>
            </div>
            {person.testimonial && (
              <div
                style={{
                  flex: "1",
                  padding: "1.5rem",
                  marginLeft: "3rem"
                }}
              >
                <p
                  className="text-base text-gray-700 italic font-main-sans"
                  style={{
                    overflow: "hidden",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical"
                  }}
                >
                  "{person.testimonial}"
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
