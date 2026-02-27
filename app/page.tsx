export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      {/* Top header / logo area */}
      <header className="mx-auto w-full max-w-6xl px-6 pt-10">
        <div className="rounded-2xl border border-zinc-300 p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-5xl tracking-tight sm:text-6xl">
                CRSS LAB
              </h1>
              <p className="mt-2 text-xl text-zinc-700">
                Conflict Research and Security Studies
              </p>
            </div>

            {/* placeholder "mark" area, text only */}
            <div className="text-right text-sm text-zinc-500">
              <div className="font-medium text-zinc-600">Lab Updates</div>
              <div>Research • Events • Opportunities</div>
            </div>
          </div>
        </div>

        {/* Nav row */}
        <nav className="mt-6 flex flex-wrap items-center justify-center gap-6 sm:justify-end">
          <button className="text-lg text-zinc-700 hover:text-zinc-900">
            About ▾
          </button>
          <button className="text-lg text-zinc-700 hover:text-zinc-900">
            Meet the Team ▾
          </button>
          <button className="text-lg text-zinc-700 hover:text-zinc-900">
            Current Projects
          </button>

          <button className="ml-2 rounded-md bg-black px-5 py-2 text-white hover:bg-zinc-800">
            Subscribe
          </button>
        </nav>
      </header>

      {/* Main content */}
      <main className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-10 px-6 pb-16 pt-10 md:grid-cols-2">
        {/* Left: big intro text */}
        <section className="md:pt-6">
          <p className="text-4xl leading-[3.2rem] tracking-tight text-sky-600">
            The Conflict Research and Security Studies (CRSS) Lab offers
            students hands-on experience in data collection, data analysis, and
            research methods.
          </p>
        </section>

        {/* Right: “cards” grid (text-only placeholders) */}
        <section className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <article className="rounded-lg border border-zinc-200 p-5">
            <div className="h-32 rounded-md border border-dashed border-zinc-300 p-4 text-sm text-zinc-500">
              Text-only placeholder (no image)
            </div>
            <h3 className="mt-4 text-xl font-medium">Open House Registration</h3>
            <p className="mt-1 text-sm text-zinc-500 underline">Uncategorized</p>
          </article>

          <article className="rounded-lg border border-zinc-200 p-5">
            <div className="h-32 rounded-md border border-dashed border-zinc-300 p-4 text-sm text-zinc-500">
              Text-only placeholder (no image)
            </div>
            <h3 className="mt-4 text-xl font-medium">Open Application Period!</h3>
            <p className="mt-1 text-sm text-zinc-500 underline">Team</p>
          </article>

          <article className="rounded-lg border border-zinc-200 p-5">
            <div className="h-32 rounded-md border border-dashed border-zinc-300 p-4 text-sm text-zinc-500">
              Text-only placeholder (no image)
            </div>
            <h3 className="mt-4 text-xl font-medium">Community Spotlight</h3>
            <p className="mt-1 text-sm text-zinc-500 underline">News</p>
          </article>

          <article className="rounded-lg border border-zinc-200 p-5">
            <div className="h-32 rounded-md border border-dashed border-zinc-300 p-4 text-sm text-zinc-500">
              Text-only placeholder (no image)
            </div>
            <h3 className="mt-4 text-xl font-medium">Summer Lab</h3>
            <p className="mt-1 text-sm text-zinc-500 underline">Programs</p>
          </article>
        </section>
      </main>
    </div>
  );
}