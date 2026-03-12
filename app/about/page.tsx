const teamMembers = [
  { id: 1, name: "Thomas", jobTitle: "Job", image: undefined },
  { id: 2, name: "Thomas", jobTitle: "Job", image: undefined },
  { id: 3, name: "Thomas", jobTitle: "Job", image: undefined },
  { id: 4, name: "Thomas", jobTitle: "Job", image: undefined },
  { id: 5, name: "Thomas", jobTitle: "Job", image: undefined },
  { id: 6, name: "Thomas", jobTitle: "Job", image: undefined },
  { id: 7, name: "Thomas", jobTitle: "Job", image: undefined },
];

function TeamGrid() {
  return (
    <section id="people" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
      {teamMembers.map((person) => (
        <div
          key={person.id}
          className="bg-white rounded-xl overflow-hidden border border-slate-200"
        >
          <div className="h-48 bg-white flex items-center justify-center">
            {person.image ? (
              <img
                src={person.image}
                alt={person.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="bg-white text-4xl">👤</span>
            )}
          </div>
          <div className="p-4 text-center">
            <h2 className="text-xl font-bold text-slate-800">{person.name}</h2>
            <p className="text-slate-500 font-medium">{person.jobTitle}</p>
          </div>
        </div>
      ))}
    </section>
  );
}

function NavBar() {
  return (
    <nav className="flex flex-col gap-4">
      <a
        href="#people"
        className="text-lg text-zinc-700 transition-all duration-200 ease-in-out hover:text-orange-400"
      >
        Leadership
      </a>
      <a
        href="#mission"
        className="text-lg text-zinc-700 transition-all duration-200 ease-in-out hover:text-orange-400"
      >
        Mission
      </a>
      <a
        href="#looking-ahead"
        className="text-lg text-zinc-700 transition-all duration-200 ease-in-out hover:text-orange-400"
      >
        Looking Ahead
      </a>
      <a
        href="#timeline"
        className="text-lg text-zinc-700 transition-all duration-200 ease-in-out hover:text-orange-400"
      >
        Timeline
      </a>
    </nav>
  );
}

function AboutHero() {
  return (
    <section className="bg-white px-6 py-16 md:px-20 md:py-40">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 md:text-5xl">
            About
          </h1>

          <p className="mt-6 text-lg leading-8 text-zinc-700">
            Our lab conducts research projects on topics of political and electoral violence and conflict, social movements and mass demonstrations, democratic backsliding, and research methodology.
          </p>
        </div>

        <div className="min-h-full">
          <img
            src="/about-hero.jpg"
            alt="Team or lab overview"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <div className="grid grid-cols-1 md:grid-cols-10 min-h-screen">
        <div className="hidden md:block md:col-span-3 bg-white p-20 sticky top-0 h-screen overflow-y-auto">
          <NavBar />
        </div>
        <div className="md:col-span-7 bg-white">
          <TeamGrid />
        </div>
      </div>
    </main>

  );
}
