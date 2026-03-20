// This is a component to render each page of research
import { type SanityDocument } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

function getContent(project: any) {
  const components = {
    block: {
      h2: ({ children }: any) => (
        <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>
      ),
      h3: ({ children }: any) => (
        <h3 className="text-2xl font-bold mt-7 mb-3">{children}</h3>
      ),
      h4: ({ children }: any) => (
        <h4 className="text-xl font-semibold mt-6 mb-2">{children}</h4>
      ),
      normal: ({ children }: any) => (
        <p className="my-2 text-gray-800">{children}</p>
      ),
    },
    marks: {
      link: ({ value, children }: any) => (
        <a
          href={value.href}
          // TODO: change hover text to red/theme color
          className="text-gray-600 underline hover:text-blue-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
    list: {
      bullet: ({ children }: any) => (
        <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>
      ),
    },
    listItem: {
      bullet: ({ children }: any) => (
        <li className="text-gray-800">{children}</li>
      ),
    },
    types: {
      image: ({ value }: any) => (
        <img
          src={urlFor(value).width(800).url()}
          alt={value.alt || ''}
          className="my-6 rounded-lg"
        />
      ),
    },
  };

  return (
    <div className="max-w-none">
      <PortableText value={project.content} components={components} />
    </div>
  );
}

const PROJECTS_QUERY = `*[_type == "projectType" && slug.current == $slug][0]{
  _id, 
  title, 
  slug, 
  publishedAt, 
  description, 
  relevantLinks, 
  content, 
  contributors, 
  "coverImage": coverImage.asset->url
}`;

const options = { next: { revalidate: 30 } };

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = await client.fetch<SanityDocument | null>(
    PROJECTS_QUERY,
    { slug },
    options,
  );

  if (!project) {
    return <div>Project not found</div>;
  }
  console.log(project);

  return (
    <div>
      <div className="relative w-full h-[400px] overflow-hidden">
        <img className="w-full h-full object-cover" src={project.coverImage} />

        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

        <div className="absolute inset-0 grid grid-cols-[1fr_3fr] text-white">
          <div /> {/* empty column to align */}
          <div className="flex flex-col justify-end w-250 p-6">
            <h1 className="text-4xl font-serif">{project.title}</h1>
            <p className="mt-2">{project.description}</p>
            <div className="mt-2">
              {project.relevantLinks?.map(
                (item: {
                  _key: string;
                  _type: string;
                  title: string;
                  url: string;
                }) => {
                  return (
                    <a className="text-white p-2 underline hover:text-blue-500" key={item._key} href={item.url}>
                      {item.title}
                    </a>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-[1fr_3fr] relative z-10">
        {/* Sidebar */}
        <aside className="bg-white sticky top-[10vh] self-start p-6 -mt-24">
          <Link
            href="/research/projects"
            className="text-gray-500 hover:text-gray-700"
          >
            {'< Research'}
          </Link>
          <p className="font-bold pt-15">In this Group</p>
        </aside>

        {/* Main content */}
        <div className="w-250 p-6">{getContent(project)}</div>
      </div>
    </div>
  );
}
