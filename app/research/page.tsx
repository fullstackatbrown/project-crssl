import Link from "next/link";

export default async function ResearchPage() {
	return (
		<div className="bg-white text-black">
      <section className="bg-black px-6 py-14 text-white md:px-10 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h1 className="font-serif text-4xl md:text-5xl">Research</h1>
          <p className="mt-2 max-w-xl text-sm text-zinc-300">
            CRSSL conducts research in conflict, elections, and institutions.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-x border-zinc-300 bg-white">
        <div className="grid grid-cols-3 border-b border-zinc-300 text-center text-sm font-semibold uppercase tracking-wide">
          <Link
            href="/research/projects"
            className="border-r border-zinc-300 px-4 py-4 hover:bg-zinc-50 hover:text-[#a51c30]"
          >
            Projects
          </Link>
          <Link
            href="/research/papers"
            className="border-r border-zinc-300 px-4 py-4 hover:bg-zinc-50 hover:text-[#a51c30]"
          >
            Papers
          </Link>
          <Link
            href="/research/explainers"
            className="border-r border-zinc-300 px-4 py-4 hover:bg-zinc-50 hover:text-[#a51c30]"
          >
            Explainers
          </Link>
        </div>
      </section>
    </div>
	);
}