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
  {_id, fullname, image, recentwork, jobtitles, interests, slug}`;

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
        options
    );

    if (!dataset) notFound();

  return (
    <div>
      <h1>{dataset.fullname}</h1>
      <Image
        alt="generic profile image"
        src={urlFor(dataset.image).url()}
        width={100}
        height={100}
      />
      <p>{dataset.jobtitles.join(", ")}</p>
      <p>{dataset.interests.join(", ")}</p>

      <Link className="hover:underline" href={`${dataset.recentwork}`}>
        <p>Title of most recent work</p>
      </Link>
    </div>
  );
}
