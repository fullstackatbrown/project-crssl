"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { client } from "../../sanity/lib/client";

type PeoplePageHero = {
  image?: { alt?: string; asset?: { url?: string } };
  heading?: string;
  subtext?: string;
};

async function getPeoplePageHero(): Promise<PeoplePageHero> {
  return client.fetch(
    `*[_type == "peoplePage"][0].hero{ heading, subtext, image{ alt, asset->{ url } } }`,
  );
}

export default function PeopleBanner() {
  const [hero, setHero] = useState<PeoplePageHero | null>(null);

  useEffect(() => {
    let isMounted = true;

    getPeoplePageHero()
      .then((data) => {
        if (isMounted) {
          setHero(data);
        }
      })
      .catch(() => {
        if (isMounted) {
          setHero(null);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const imageUrl = hero?.image?.asset?.url ?? "/meeting.jpg";

  return (
    <div className="relative h-[420px] w-full overflow-hidden bg-primary">
      <Image
        src={imageUrl}
        alt={hero?.image?.alt ?? "Experts banner"}
        fill
        className="object-cover"
        sizes="100vw"
        priority
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent" />

      <div className="absolute bottom-8 left-8 max-w-3xl text-white">
        <h1 className="font-main-serif text-4xl font-semibold tracking-tight md:text-5xl">
          {hero?.heading ?? "Experts"}
        </h1>
        <p className="font-main-sans mt-3 max-w-3xl text-sm font-light leading-6 md:text-base">
          {hero?.subtext ??
            "The Conflict Research and Security Studies Lab brings together experts across the disciplines."}
        </p>
      </div>
    </div>
  );
}
