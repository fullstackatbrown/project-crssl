"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function SiteWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSanity = pathname.startsWith("/studio");
  if (isSanity) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />

      <main className="flex-1">
        {children}
      </main>

      <Footer />
    </>
  );
}
