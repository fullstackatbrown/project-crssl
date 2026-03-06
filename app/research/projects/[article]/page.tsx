// This is a component to render each page of research 
import mockData from '../mockData';

export default async function ProjectPage({params}: {params: Promise<{article: string}>}) {
    const { article } = await params;

    const project = mockData.find((project) => project.slug === article);
        
    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <div>
            <img src={project.image}></img>
            <h1>{project.Title}</h1>
        </div>
    );
}
