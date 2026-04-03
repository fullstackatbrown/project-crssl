"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { name: "About", href: "/about" },
  { name: "Experts", href: "/people" },
  { name: "Research", href: "/research" },
  { name: "Data", href: "/data" },
  { name: "Resources", href: "/resources" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Centered Logo + Description */}
        <div className="flex flex-col items-center pt-10 pb-2">
          <Link href="/">
            <Image
              src="/templogoblack.png"
              alt="CRSSL logo"
              width={250}
              height={125}
            />
          </Link>
          <p className="mt-2 mb-3 text-md text-gray-500 font-serif tracking-wide text-center">
            Placeholder for description
          </p>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex justify-center space-x-8 py-3 border-t border-gray-100">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-gray-900 hover:text-black transition"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile: hamburger button (top-right) */}
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
                className="text-sm font-medium text-gray-700 hover:text-black"
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