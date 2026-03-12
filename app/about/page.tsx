const teamMembers = [
  {
    id: 1,
    name: "Thomas",
    jobTitle: "Job",
    image: undefined,
  },
  {
    id: 2,
    name: "Person",
    jobTitle: "Job",
    image: undefined,
  },
  {
    id: 3,
    name: "Person",
    jobTitle: "Job",
    image: undefined,
  },
  {
    id: 4,
    name: "Person",
    jobTitle: "Job",
    image: undefined,
  },
  {
    id: 5,
    name: "Person",
    jobTitle: "Job",
    image: undefined,
  },
  {
    id: 6,
    name: "Person",
    jobTitle: "Job",
    image: undefined,
  },
  {
    id: 7,
    name: "Person",
    jobTitle: "Job",
    image: undefined,
  },
];

function TeamGrid() {
  return (
    <div className="grid grid-col1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
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
    </div>
  );
}

function NavBar() {
  return (
    <nav className="flex flex-col gap-4">
      <button
        className="text-lg text-zinc-700 hover:text-orange-400
            transition-all duration-200 ease-in-out"
      >
        People
      </button>
      <button
        className="text-lg text-zinc-700 hover:text-orange-400
            transition-all duration-200 ease-in-out"
      >
        Mission
      </button>
      <button
        className="text-lg text-zinc-700 hover:text-orange-400
            transition-all duration-200 ease-in-out"
      >
        Looking Ahead
      </button>
      <button
        className="text-lg text-zinc-700 hover:text-orange-400
            transition-all duration-200 ease-in-out"
      >
        Timeline
      </button>
    </nav>
  );
}
export default function AboutPage() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-10 min-h-screen">
      <div className="hidden md:block md:col-span-3 bg-white p-10 sticky top-0 h-screen overflow-y-auto">
        <NavBar />
      </div>
      <div className="md:col-span-7 bg-white">
        <TeamGrid />
      </div>
    </div>
  );
}
