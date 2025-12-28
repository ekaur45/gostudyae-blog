import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GoStudy.ae | Blog",
  description: "Premium stories for UAE students & parents — AI tutoring, study hacks, exam strategy and success playbooks.",
  icons: {
    icon: "/blog/gostudylogo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-[#0B1A2A]">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header className="sticky top-0 w-full px-2 lg:px-12 py-3 pt-4 text-sm flex items-center justify-between text-white bg-[#0B1A2A]/80 backdrop-blur-md z-[500]"><a href="https://gostudy.ae/" className="flex items-center gap-2 cursor-pointer">
          <img src="/blog/logowithtext.svg" className="xl:w-[12rem] w-[11rem] max-lg:w-[8rem]" alt="Logo" /></a>
          <div className="flex items-center gap-2 max-lg:gap-0 ml-auto max-lg:text-xs">
          </div>
        </header>
        {children}
        <Footer />
      </body>
    </html>
  );
}
