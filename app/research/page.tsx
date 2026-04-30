import ResearchBanner from "../components/ResearchBanner";

export default async function ResearchPage() {
  return (
    <div className="bg-white text-black">
      <ResearchBanner active="research" />
    </div>
  );
}