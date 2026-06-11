"use client";

import { Hero } from "@/components/hero";
import { TerminalDemo } from "@/components/terminal-demo";
import { RulesMarquee } from "@/components/rules-marquee";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <main className="flex flex-col items-center w-full">
      <div className="w-full max-w-4xl">
        <Hero />
        <TerminalDemo />
      </div>
      <RulesMarquee />
      <Footer />
    </main>
  );
}
