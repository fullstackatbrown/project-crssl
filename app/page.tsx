export default function Home() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] text-zinc-900 font-sans">
      {/* Top Utility Bar */}
      <div className="w-full bg-[#1a1a1a] py-2 px-6">
        <div className="mx-auto max-w-7xl flex justify-end gap-6 text-[11px] uppercase tracking-widest text-zinc-400">
          <span className="hover:text-white cursor-pointer">Brown University</span>
          <span className="hover:text-white cursor-pointer">Events</span>
          <span className="hover:text-white cursor-pointer">Contact</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-8">
          <div className="flex flex-col">
            <h1 className="font-serif text-4xl font-black tracking-tight text-[#1a1a1a] md:text-5xl">
              CRSS <span className="text-[#a51c30]">LAB</span>
            </h1>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
              Conflict Research and Security Studies
            </p>
          </div>
          
          <nav className="hidden space-x-8 text-sm font-bold uppercase tracking-wider md:flex">
            <a href="#" className="border-b-2 border-transparent hover:border-[#a51c30] pb-1">Research</a>
            <a href="#" className="border-b-2 border-transparent hover:border-[#a51c30] pb-1">Experts</a>
            <a href="#" className="border-b-2 border-transparent hover:border-[#a51c30] pb-1">Publications</a>
            <a href="#" className="border-b-2 border-transparent hover:border-[#a51c30] pb-1">About</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Featured Hero Section */}
        <section className="grid grid-cols-1 gap-0 border-b-4 border-black lg:grid-cols-12">
          <div className="relative col-span-1 bg-zinc-200 min-h-[400px] lg:col-span-8">
            <div className="absolute inset-0 flex items-center justify-center text-zinc-400 italic">
              Featured Image Placeholder
            </div>
          </div>
          <div className="col-span-1 flex flex-col justify-center bg-white p-8 lg:col-span-4">
            <span className="mb-4 inline-block text-xs font-bold uppercase tracking-widest text-[#a51c30]">
              Featured Analysis
            </span>
            <h2 className="mb-4 font-serif text-3xl font-bold leading-tight hover:underline cursor-pointer">
              The Evolution of Modern Conflict: A Multi-Domain Study on Security
            </h2>
            <p className="text-sm leading-relaxed text-zinc-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam at porttitor sem.  Aliquam erat volutpat. Donec varius.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-zinc-300"></div>
              <span className="text-xs font-bold uppercase">By Dr. Jane Doe</span>
            </div>
          </div>
        </section>

        {/* Modular Grid Below */}
        <section className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
          
          {/* Column 1 */}
          <div className="space-y-8">
            <h3 className="border-b-2 border-black pb-2 text-sm font-black uppercase tracking-tighter">
              Latest Updates
            </h3>
            {[1, 2, 3].map((i) => (
              <article key={i} className="group cursor-pointer">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#a51c30]">Program Update</span>
                <h4 className="mt-2 font-serif text-xl font-bold leading-snug group-hover:text-[#a51c30]">
                  Open House: Strategic Planning for the 2026 Academic Year
                </h4>
                <p className="mt-2 text-sm text-zinc-500 line-clamp-2">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                </p>
              </article>
            ))}
          </div>

          {/* Column 2 */}
          <div className="space-y-8">
            <h3 className="border-b-2 border-black pb-2 text-sm font-black uppercase tracking-tighter">
              In the Press
            </h3>
            <div className="aspect-video w-full bg-zinc-800 flex items-center justify-center text-zinc-500 text-xs">
              Video Placeholder
            </div>
            <article className="group cursor-pointer">
              <h4 className="font-serif text-xl font-bold leading-snug group-hover:text-[#a51c30]">
                Community Spotlight: Impact of Local Security Initiatives
              </h4>
              <p className="mt-2 text-sm text-zinc-500">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </p>
            </article>
          </div>

          {/* Column 3 - Newsletter Style */}
          <div className="bg-[#f2f2f2] p-6">
            <h3 className="text-sm font-black uppercase tracking-tighter text-zinc-900">
              Join the Lab
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600">
              Stay informed on our latest research, events, and opportunities in security studies.
            </p>
            <input 
              type="email" 
              placeholder="Email Address" 
              className="mt-6 w-full border border-zinc-300 p-3 text-sm focus:outline-[#a51c30]"
            />
            <button className="mt-3 w-full bg-[#a51c30] py-3 text-xs font-bold uppercase tracking-widest text-white hover:bg-black transition-colors">
              Subscribe
            </button>
          </div>

        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 bg-[#1a1a1a] py-16 text-white">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="col-span-1 md:col-span-2">
              <h2 className="font-serif text-3xl font-bold">CRSS LAB</h2>
              <p className="mt-4 max-w-xs text-sm text-zinc-400">
                The Conflict Research and Security Studies Lab provides hands-on experience in data collection and research methods.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Navigation</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#" className="hover:text-[#a51c30]">About Us</a></li>
                <li><a href="#" className="hover:text-[#a51c30]">Research Portfolio</a></li>
                <li><a href="#" className="hover:text-[#a51c30]">Our Team</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-500">Follow Us</h4>
              <div className="mt-4 flex gap-4">
                {/* Social icons would go here */}
                <div className="h-8 w-8 rounded bg-zinc-800"></div>
                <div className="h-8 w-8 rounded bg-zinc-800"></div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}