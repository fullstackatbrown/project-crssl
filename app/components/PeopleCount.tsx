import { type SanityDocument } from "next-sanity";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";

const DEFAULT_QUERY = `*[
  _type == "peopleType"
]|order(fullname asc){_id, fullname, image, email, recentwork, jobtitles, interests, slug}`;

const counter = defineQuery(`count(*[_type == 'peopleType'])`);

export default async function PeopleCount() {
  const options = { next: { revalidate: 30 } };

  await client.fetch<SanityDocument[]>(DEFAULT_QUERY, {}, options);

  const peoplecount = await client.fetch(counter, {}, options);
  const plural = peoplecount > 1 ? "people" : "person";
  return (
    <div>
      <p
        className="text-lg text-gray-900"
        style={{ marginLeft: "3rem", marginTop: "2rem" }}
      >
        <b>{peoplecount}</b> {plural}{" "}
      </p>
    </div>
  );
}
