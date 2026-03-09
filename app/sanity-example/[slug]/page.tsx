import { type SanityDocument } from "next-sanity";
import { client } from "@/sanity/lib/client";
import { notFound } from "next/navigation";

const DATASET_QUERY = `*[_type == "exampleDataset" && slug.current == $slug][0]{
  _id, name, slug, publishedAt, description,
  "files": files[]{_key, _type, "url": asset->url, "filename": asset->originalFilename},
  links
}`;

const options = { next: { revalidate: 30 } };

export async function generateStaticParams() {
    const slugs = await client.fetch<{ slug: { current: string } }[]>(
        `*[_type == "dataset"]{ slug }`,
        {},
        options
    );
    return slugs.map(({ slug }) => ({ slug: slug.current }));
}

export default async function DatasetPage({
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

    console.log("Fetched dataset:", dataset);
    const files = dataset?.files || [];
    for (const file of files) {
        console.log(`File: ${file._key} - ${file._type}`);
        if (file.asset) {
            console.log(file.asset);
        }
    }

    if (!dataset) notFound();

    return (
        <div>
            <h2>Name</h2>
            <p>{dataset.name}</p>
            <h2>publishedAt</h2>
            <p>{new Date(dataset.publishedAt).toLocaleDateString()}</p>
            {dataset.description && <p>description: {dataset.description}</p>}
            {dataset.files && (
                <div>
                    <h2>Files:</h2>
                    <ul>
                        {dataset.files.map((file) => (
                            <li key={file._key}>
                                <a href={`${file.url}?dl=`} download className="hover:underline">
                                    {file.filename ?? file._key}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <div>
                <h2>Links:</h2>
                {dataset.links && dataset.links.length > 0 ? (
                    <ul>
                        {dataset.links.map((link) => (
                            <li key={link._key}>
                                <a href={link.url} target="_blank" rel="noopener noreferrer">
                                    {link.title || link.url}
                                </a>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No links available.</p>
                )}
            </div>
        </div>
    );
}
