// This is a component to render each page of research 
import mockData from '../mockData';

function getContent(project: any) {
    /** @type {string[]} */
    const content = project.content;
    const margin = "my-2";

    return (
        <div>
            {content.map((item: any, i: number) => {
                switch (item.type) {

                case "paragraph":
                    return <p key={i} className={margin}>{item.text}</p>;

                case "header":
                    return <div key={i} className={margin + " text-md font-bold"}>{item.text}</div>;

                case "list":
                    return (
                    <ul key={i} className={margin + " list-disc pl-5"}>
                        {item.items.map((subitem: string, j: number) => (
                            <li key={j}
                            className={margin}
                            >{subitem}</li>
                        ))}
                    </ul>
                    );

                default:
                    return null;
            }})}
        </div>
    )
}

export default async function ProjectPage({params}: {params: Promise<{article: string}>}) {
    const { article } = await params;

    const project = mockData.find((project) => project.slug === article);
        
    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <div>
            <div className="block relative w-full h-full overflow-hidden max-h-65">
                <img className="w-full h-64 object-cover" src={project.image}></img>
                <h1 className="absolute bottom-15 left-55 text-white text-4xl font-bold">{project.Title}</h1>
                <p className="absolute bottom-10 left-8 text-white text-xs">{project.description}</p>
            </div>

            <div className="grid grid-cols-4">
                <div className="col-start-2 col-span-2">
                    {getContent(project)}
                </div>
            </div>
        </div>
    );
}
