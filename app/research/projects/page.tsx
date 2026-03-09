import Link from "next/link";
import mockData from './mockData';
import Elipsis from './project-extra';

/**
 *
 * @param param0
 * @returns a single grid containing information about each project
 */
function Tile({
  title,
  subtitle,
  description,
  image,
  slug
}: {
  title: string;
  subtitle?: string;
  description: string;
  image?: string; // FIXME: remove optionality
  slug: string;
}) {
  return (
    <div className="display-flex flex-direction-col border-solid border width-100 height-100 min-w-[200px] min-h-[200px]">
      <Link className="block relative w-full h-full overflow-hidden" href={`/research/projects/${slug}`}>
        <img className='absolute inset-0 w-full h-full object-cover' src={image}></img>
        <div className="absolute inset-0 flex flex-col justify-end p-4">
          <div className=" inline-block border-solid border-1 border-white rounded-[60px] text-white text-center text-xs w-fit px-2 py-1">
            <div className="flex flex-row gap-2 items-center">
              <Elipsis/>
              {subtitle}
            </div>
          </div>
          <div className="text-white px-1 py-1 font-serif text-xl">{title}</div>
        </div>
      </Link>
    </div>
  );
}

/**
 * 
 * @returns grid of all projects
 */
function TileGrid() {
  return (
    <div className="grid grid-cols-3 max-w-300 ">
      {mockData.map((project, ind) => {
        return (
          <Tile
            key={ind}
            title={project.Title}
            subtitle={project.subtitle}
            description={project.description}
            image={project.image}
            slug={project.slug}
          />
        );
      })}
    </div>
  );
}

/**Temporarily a placeholder for the side bar */
function SideBar() {

  return (
    <div className="w-1/4">
      <h1>Side Bar</h1>
    </div>
  );
}

export default function projects() {
  return (
    <div>
      <h1>Projects</h1>
      <div className="flex flex-row">
        <SideBar/>
        <TileGrid/>
      </div>
    </div>
  );
}
