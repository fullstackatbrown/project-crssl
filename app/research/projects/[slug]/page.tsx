// This is a component to render each page of research
import { type SanityDocument } from 'next-sanity';
import { client } from '@/sanity/lib/client';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';

function getContent(project: any) {
  const margin = 'my-2';

  /**
   * Object { _key: "e039d8a92786", _type: "block", style: "h2", … }
_key: "e039d8a92786"
_type: "block"
children: Array [ {…} ]
    0: Object { _key: "61ab0d04dfa4", _type: "span", text: "Maintaining secure, accurate, and accessible voter registration rolls is an ongoing challenge that has come under increased political scrutiny in recent years.", … }
length: 1
<prototype>: Array []
markDefs: Array []
style: "h2"
   */
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
          className="text-gray-600 underline hover:text-blue-600"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
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

  return (
    <div>
      <div className="block relative w-full h-full overflow-hidden max-h-100">
        <img className="w-full h-100 object-cover" src={project.coverImage} />
        <div
          className="absolute inset-0 bg-gradient-to-t from-black to-transparent"
          aria-hidden="true"
        />
        <div className="absolute inset-0 left-1/4 top-1/2 right-1/8">
          <h1 className="text-white text-4xl font-serif">{project.title}</h1>
          <p className="mt-2 text-white text-s">{project.description}</p>
          <div>
            {project.relevantLinks?.map((link: string, i: number) => {
              return <a key={i} href={link}></a>;
            })}
          </div>
        </div>
      </div>

      <div className="flex relative z-10">
        {/* navigation sidebar */}
        <aside className="-mt-24 bg-white h-100 w-80 sticky left-0 self-start top-[10vh]">
          {/*should dynamically generate the side navbar from the headers in the content */}
          <div className="pl-10 pt-15">
            <Link
              href="/research/projects"
              className="text-gray-500 hover:text-gray-700"
            >
              {'< Research'}
            </Link>
          </div>
        </aside>

        {/* main content */}
        <div className="flex-1 min-w-0 pl-10 pr-25 pt-10">
          <div className="col-start-2 col-span-2">{getContent(project)}</div>
        </div>
      </div>
    </div>
  );
}
