import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/lib/client";

// GROQ query to fetch dataset documents from Sanity
// ordered by published date in descending order
const DATASETS_QUERY = `*[
  _type == "exampleDataset"
]|order(publishedAt desc){_id, name, slug, publishedAt}`;

const options = { next: { revalidate: 30 } };

export default async function Data() {
    const datasets = await client.fetch<SanityDocument[]>(DATASETS_QUERY, {}, options);
    console.log("Fetched datasets:", datasets);

    return (
        <div>
            <h1>Data</h1>
            <p>This is the data page.</p>
            <ul className="flex flex-col gap-y-4">
                {datasets.map((post) => (
                    <li className="hover:underline" key={post._id}>
                        <Link href={`/sanity-example/${post.slug.current}`}>
                            <h2 className="font-semibold">{post.name}</h2>
                            <p>{new Date(post.publishedAt).toLocaleDateString()}</p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
