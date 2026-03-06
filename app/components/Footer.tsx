import Link from "next/link";
import { Linkedin, Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t bg-gray-50 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left */}
          <div className="text-sm text-gray-600">
            © {new Date().getFullYear()} CRSSL Lab. All rights reserved.
          </div>

          {/* Social Icons */}
          <div className="flex space-x-6">
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="text-gray-600 hover:text-black transition"
            >
              <Linkedin size={20} />
            </Link>

            <Link
              href="https://github.com"
              target="_blank"
              className="text-gray-600 hover:text-black transition"
            >
              <Github size={20} />
            </Link>

            <Link
              href="https://twitter.com"
              target="_blank"
              className="text-gray-600 hover:text-black transition"
            >
              <Twitter size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}