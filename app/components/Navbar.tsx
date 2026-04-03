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

function SlashLogo({ size = 1 }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      {/* slash */}
      <span
        style={{
          width: `${3 * size}px`,
          height: `${28 * size}px`,
          backgroundColor: "#7c0a0b",
          transform: "rotate(20deg)",
          marginRight: `${6 * size}px`,
        }}
      />
      {/* rectangle */}
      <span
        style={{
          width: `${10 * size}px`,
          height: `${28 * size}px`,
          backgroundColor: "#7c0a0b",
        }}
      />
    </span>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Centered Logo + Description */}
        <div className="flex flex-col items-center pt-10 pb-2">
          <Link href="/">
          <h1
          style={{
            fontFamily: "'Georgia', serif",
            fontSize: "2rem",
            fontWeight: "bold",
            letterSpacing: "0.05em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "6px",
          }}
        >
          CRSS LAB
          <span style={{ display: "inline-flex", alignItems: "center" }}>
            {/* slash */}
            <span
              style={{
                width: "3px",
                height: "28px",
                backgroundColor: "#7c0a0b",
                transform: "rotate(20deg)",
                marginRight: "6px",
                marginLeft: "3px",
              }}
            />
            {/* rectangle */}
            <span
              style={{
                width: "10px",
                height: "28px",
                backgroundColor: "#7c0a0b",
              }}
            />
          </span>
        </h1>
        </Link>

        <p style={{ fontFamily: "sans-serif", fontSize: "0.8rem", color: "#888", marginTop: "4px", letterSpacing: "0.05em" }}>
          Conflict Research and Security Studies
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