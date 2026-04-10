import Link from "next/link";
import { Linkedin, Github, Twitter } from "lucide-react";

function SlashLogo({ size = 1 }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      {/* slash */}
      <span
        style={{
          width: `${3 * size}px`,
          height: `${28 * size}px`,
          backgroundColor: "#fff",
          transform: "rotate(20deg)",
          marginRight: `${6 * size}px`,
        }}
      />
      {/* rectangle */}
      <span
        style={{
          width: `${10 * size}px`,
          height: `${28 * size}px`,
          backgroundColor: "#fff",
        }}
      />
    </span>
  );
}

export default function Footer() {
  return (
    <footer className="w-full border-t bg-primary pt-20">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Left */}
          <div className="">
            <div className="text-3xl pb-2 text-background font-serif">CRSS LAB <SlashLogo size={0.8} /></div>
            <div className="text-sm text-background">
              © {new Date().getFullYear()} CRSS Lab. All rights reserved.
            </div>
          </div>

          {/* Social Icons */}
          <div>
            <div className="flex space-x-6 pb-5 justify-end">
              <Link
                href="https://linkedin.com"
                target="_blank"
                className="text-background hover:text-black transition"
              >
                <Linkedin size={20} />
              </Link>

              <Link
                href="https://github.com"
                target="_blank"
                className="text-background hover:text-black transition"
              >
                <Github size={20} />
              </Link>

              <Link
                href="https://twitter.com"
                target="_blank"
                className="text-background hover:text-black transition"
              >
                <Twitter size={20} />
              </Link>
            </div>

            <div className="text-sm text-background">
              Developed by Full Stack @ Brown.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}