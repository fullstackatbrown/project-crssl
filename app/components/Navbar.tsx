"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Experts", href: "/people" },
  { name: "Research", href: "/research/projects" },
  { name: "Data", href: "/data" },
  { name: "Resources", href: "/resources" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Centered Logo + Description */}
        <div className="flex flex-col items-center pt-10 pb-2">
          <Link href="/">
            <h1 className="font-main-serif font-semibold tracking-[-0.02em] text-[2rem] flex justify-center items-center gap-[6px]">
              CRSS LAB
              <span className="inline-flex items-center">
                <span className="w-[3px] h-[28px] bg-primary rotate-[20deg] mr-[6px] ml-[3px]" />
                <span className="w-[10px] h-[28px] bg-primary" />
              </span>
            </h1>
          </Link>

          <p className="font-main-sans text-[0.8rem] text-[#888] mt-1 tracking-[0.05em]">
            Conflict Research and Security Studies
          </p>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex justify-center space-x-8 py-3 border-t border-gray-100">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-main-sans text-sm font-medium text-gray-900 relative
                after:absolute after:bottom-0 after:left-0 after:h-[1.5px] after:w-0
                after:bg-primary after:transition-all after:duration-200
                hover:text-primary hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile: hamburger button */}
        <div className="md:hidden flex justify-end py-3">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t bg-white">
          <div className="flex flex-col space-y-4 px-6 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="font-main-sans text-sm font-medium text-gray-700
                  hover:text-primary border-l-2 border-transparent
                  hover:border-primary pl-2 hover:pl-3
                  transition-all duration-150"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}