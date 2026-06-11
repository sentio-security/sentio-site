"use client";

import Link from "next/link";

export function Hero() {
  return (
    <section className="flex flex-col items-center justify-center px-6 pt-36 pb-20 text-center">
      {/* Logo */}
      <div className="mb-8">
        <span
          className="text-4xl sm:text-5xl font-bold tracking-tight select-none"
          style={{ color: "#2C1810" }}
        >
          sentio
          <span style={{ color: "#C4531A" }}>.</span>
        </span>
      </div>

      {/* Tagline */}
      <h1
        className="max-w-2xl text-3xl sm:text-4xl font-semibold leading-tight tracking-tight mb-4"
        style={{ color: "#2C1810" }}
      >
        Security scanner for{" "}
        <span style={{ color: "#C4531A" }}>Solana programs</span>
      </h1>

      <p
        className="max-w-lg text-base sm:text-lg leading-relaxed mb-10"
        style={{ color: "#6B4C3B" }}
      >
        sentio scans your Anchor programs for critical vulnerabilities — missing
        owner checks, unsafe account patterns, and more. Zero config. CLI-first.
      </p>

      {/* Install command */}
      <div
        className="flex items-center gap-3 px-4 sm:px-5 py-3 rounded-md mb-8 font-mono text-xs sm:text-sm w-full max-w-xs sm:max-w-fit"
        style={{
          background: "#2C1810",
          color: "#FBF0E4",
          letterSpacing: "0.01em",
        }}
      >
        <span style={{ color: "#C4531A" }}>$</span>
        <span className="flex-1 text-left">cargo install sentio-cli</span>
        <CopyButton text="cargo install sentio-cli" />
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-xs sm:max-w-fit">
        <Link
          href="https://github.com/sentio-security/sentio-rs"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto text-center px-5 py-2.5 rounded-md text-sm font-medium transition-opacity hover:opacity-80"
          style={{ background: "#C4531A", color: "#FBF0E4" }}
        >
          View on GitHub
        </Link>
        <Link
          href="#demo"
          className="w-full sm:w-auto text-center px-5 py-2.5 rounded-md text-sm font-medium transition-colors"
          style={{ border: "1px solid #C4A882", color: "#2C1810" }}
        >
          See it in action ↓
        </Link>
      </div>
    </section>
  );
}

function CopyButton({ text }: { text: string }) {
  return (
    <button
      onClick={() => navigator.clipboard.writeText(text)}
      className="ml-1 opacity-40 hover:opacity-100 transition-opacity cursor-pointer shrink-0"
      title="Copy"
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
      </svg>
    </button>
  );
}
