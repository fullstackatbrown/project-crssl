import { type SanityDocument } from "next-sanity";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/lib/client";

const DEFAULT_QUERY = `*[
  _type == "peopleType"
]|order(fullname asc){_id, fullname, image, email, recentwork, jobtitles, interests, slug}`;

const counter = defineQuery(`count(*[_type == 'peopleType'])`);

export default async function PeopleFilter() {
  const options = { next: { revalidate: 30 } };

  const datasets = await client.fetch<SanityDocument[]>(
    DEFAULT_QUERY,
    {},
    options,
  );
  //   console.log("Fetched datasets:", datasets);

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
      <fieldset>
        {interests.map((interest) => (
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
          {titles.map((title) => (
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
                className="checkboxes "
                id={`${title} checkbox`}
                name="title"
                key={`${title} checkbox`}
                type="checkbox"
              />
              {title}
            </label>
          ))}
        </fieldset>
      </form>
    </div>
  );
}
