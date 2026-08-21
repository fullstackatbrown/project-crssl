"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { AtSign, Github, Linkedin } from "lucide-react";
import { client } from "@/sanity/lib/client";
import { FOOTER_QUERY } from "@/app/lib/queries";

type FooterContent = {
  linkedinUrl?: string;
  blueskyUrl?: string;
  githubUrl?: string;
};

type SocialLink = {
  href: string;
  label: string;
  icon: ReactNode;
};

const FALLBACK_FOOTER: Required<FooterContent> = {
  linkedinUrl: "https://www.linkedin.com",
  blueskyUrl: "https://bsky.app",
  githubUrl: "https://github.com",
};

function SlashLogo({ size = 1 }: { size?: number }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center" }}>
      <span
        style={{
          width: `${3 * size}px`,
          height: `${28 * size}px`,
          backgroundColor: "#fff",
          transform: "rotate(20deg)",
          marginRight: `${6 * size}px`,
        }}
      />
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
  const [footerContent, setFooterContent] = useState<FooterContent | null>(null);

  useEffect(() => {
    let isMounted = true;

    client
      .fetch<FooterContent | null>(FOOTER_QUERY)
      .then((data) => {
        if (isMounted) {
          setFooterContent(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setFooterContent(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const footer = {
    ...FALLBACK_FOOTER,
    ...footerContent,
  };

  const socialLinks: SocialLink[] = [
    {
      href: footer.linkedinUrl,
      label: "LinkedIn",
      icon: <Linkedin size={20} />,
    },
    {
      href: footer.blueskyUrl,
      label: "Bluesky",
      icon: <AtSign size={20} />,
    },
    {
      href: footer.githubUrl,
      label: "GitHub",
      icon: <Github size={20} />,
    },
  ];

  return (
    <footer className="w-full border-t bg-primary pt-20">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div>
            <div className="pb-2 text-3xl font-serif text-background">
              CRSS LAB <SlashLogo size={0.8} />
            </div>
            <div className="text-sm text-background">
              © {new Date().getFullYear()} CRSS Lab. All rights reserved.
            </div>
          </div>

          <div>
            <div className="flex justify-end space-x-6 pb-5">
              {socialLinks.map((socialLink) => (
                <Link
                  key={socialLink.label}
                  href={socialLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={socialLink.label}
                  className="text-background transition hover:text-black"
                >
                  {socialLink.icon}
                </Link>
              ))}
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
