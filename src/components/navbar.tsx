"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [installs, setInstalls] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    fetch("/api/installs")
      .then((r) => r.json())
      .then((d) => typeof d.count === "number" && setInstalls(d.count))
      .catch(() => {});
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
      style={{
        background: scrolled ? "rgba(251,240,228,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
        borderBottom: scrolled ? "1px solid #E2CCBA" : "1px solid transparent",
      }}
    >
      <div className="max-w-4xl mx-auto flex items-center justify-between px-6 h-14">
        {/* Logo */}
        <Link href="/" className="select-none">
          <span
            className="text-xl font-bold tracking-tight"
            style={{ color: "#2C1810" }}
          >
            sentio
            <span style={{ color: "#C4531A" }}>.</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-4 sm:gap-6">
          <Link
            href="#demo"
            className="hidden sm:block text-sm transition-colors hover:opacity-70"
            style={{ color: "#6B4C3B" }}
          >
            Demo
          </Link>
          <Link
            href="#rules"
            className="hidden sm:block text-sm transition-colors hover:opacity-70"
            style={{ color: "#6B4C3B" }}
          >
            Rules
          </Link>
          {/* {installs !== null && (
            <span
              className="hidden sm:flex items-center gap-1 text-xs tabular-nums"
              style={{ color: "#9B7B6B" }}
              title="unique installs"
            >
              <span style={{ color: "#C4531A", fontSize: "7px" }}>●</span>
              {installs} installs
            </span>
          )} */}
          <Link
            href="https://github.com/sentio-security/sentio-rs"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium px-3 sm:px-3.5 py-1.5 rounded-md transition-opacity hover:opacity-80"
            style={{ background: "#2C1810", color: "#FBF0E4" }}
          >
            <GitHubIcon />
            <span>GitHub</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
