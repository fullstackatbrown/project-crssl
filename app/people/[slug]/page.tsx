import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/lib/client";
import Image from "next/image";
import createImageUrlBuilder from "@sanity/image-url";
import type SanityImageSource from "@sanity/image-url";
import Link from "next/link";
import { notFound } from "next/navigation";

// Create an image URL builder using the client
const builder = createImageUrlBuilder(client);

// Export a function that can be used to get image URLs
export function urlFor(source: typeof SanityImageSource) {
  return builder.image(source);
}

const DATASET_QUERY = `*[_type == "peopleType" && slug.current == $slug][0]
  {_id, fullname, email, bio, image, recentwork, jobtitles, interests, slug}`;

const options = { next: { revalidate: 30 } };

export default async function SanityExampleDataset({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dataset = await client.fetch<SanityDocument | null>(
    DATASET_QUERY,
    { slug },
    options,
  );

  if (!dataset) notFound();

  return (
    <div className="">
      <div className="flex bg-gray-100">
        <div className="max-w-1/2">
          <h1 className="text-7xl mt-[5rem] ml-[6rem]">{dataset.fullname}</h1>
          <p className="text-gray-500 mt-[0.6rem] ml-[6rem]">
            {dataset.jobtitles.join(", ")}
          </p>
          <p className="mt-[0.5rem] mt-[1.5rem] ml-[6rem]">
            {" "}
            Email:{" "}
            <a className="hover:underline" href={`mailto:${dataset.email}`}>
              {dataset.email}
            </a>
          </p>
        </div>
        <div className=" mb-[5rem] mt-[5rem] ml-auto mr-[5rem]">
          <Image
            alt="generic profile image"
            src={urlFor(dataset.image).url()}
            width={400}
            height={400}
          />
        </div>
      </div>
      <div className="flex">
        <div>
          <hr
            style={{
              width: "20rem",
              marginTop: "6rem",
              marginLeft: "6rem",
              marginBottom: "0.5rem",
            }}
          ></hr>
          <p className="text-lg mt-[1rem] ml-[6rem]">
            {dataset.interests.join(", ")}
          </p>
        </div>
        <div>
          <p className="text-lg mt-[6rem] mb-[1rem] ml-[6rem] mr-[5rem]">
            {dataset.bio}
          </p>
          <a
            className="font-bold text-lg ml-[6rem] hover:underline"
            href={`${dataset.recentwork}`}
          >
            Their most recent work
          </a>
        </div>
      </div>
    </div>
  );
}
