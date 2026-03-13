// This is a component to render each page of research
import mockData from '../mockData';
import { type SanityDocument } from 'next-sanity';
import { client } from '@/sanity/lib/client';

function getContent(project: any) {
  /** @type {string[]} */
  const content = project.content;
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
  return (
    <div>
      {content.map((item: any, i: number) => {
        return <div> {item.children[0].text}</div>;
        // switch (item.type) {
        //   case 'paragraph':
        //     return (
        //       <p key={i} className={margin}>
        //         {item.text}
        //       </p>
        //     );

        //   case 'header':
        //     return (
        //       <div key={i} className={margin + ' text-md font-bold'}>
        //         {item.text}
        //       </div>
        //     );

        //   case 'list':
        //     return (
        //       <ul key={i} className={margin + ' list-disc pl-5'}>
        //         {item.items.map((subitem: string, j: number) => (
        //           <li key={j} className={margin}>
        //             {subitem}
        //           </li>
        //         ))}
        //       </ul>
        //     );

        //   default:
        //     return ;
        // }
      })}
    </div>
  );
}

const PROJECTS_QUERY = `*[_type == "projectType" && slug.current == $slug][0]{
  _id, title, slug, publishedAt, description, relaventLinks, content, contributors, "coverImage": coverImage.asset->url
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

  console.log(project);

  if (!project) {
    return <div>Project not found</div>;
  }

  console.log(project);

  return (
    <div>
      <div className="block relative w-full h-full overflow-hidden max-h-65">
        <img
          className="w-full h-64 object-cover"
          src={project.coverImage}
        ></img>
        <h1 className="absolute bottom-15 left-55 text-white text-4xl font-bold">
          {project.title}
        </h1>
        <p className="absolute bottom-10 left-8 text-white text-xs">
          {project.description}
        </p>
        <div>
          {project.relaventLinks.map((link: string, i: number) => {
            return <a key={i} href={link}></a>;
          })}
        </div>
      </div>

      <div className="grid grid-cols-4">
        <div className="col-start-2 col-span-2">{getContent(project)}</div>
      </div>
    </div>
  );
}
