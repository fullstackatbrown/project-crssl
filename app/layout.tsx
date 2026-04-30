import type { Metadata } from "next";
import { Baskervville, Manrope } from "next/font/google";
import "./globals.css";
import SiteWrapper from "@/app/components/SiteWrapper";


const mainSerif = Baskervville({
  variable: "--font-main-serif",
  subsets: ["latin"],
});

const mainSans = Manrope({
  variable: "--font-main-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CRSSL Lab",
  description: "CRSSL Lab Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mainSerif.variable} ${mainSans.variable} antialiased flex flex-col min-h-screen`}
      >
        <SiteWrapper>{children}</SiteWrapper>
      </body>
    </html>
  );
}