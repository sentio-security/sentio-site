"use client";

import { useRef, useState } from "react";

const rules = [
  {
    id: "SW001",
    name: "Missing signer check",
    severity: "critical" as const,
    description:
      "AccountInfo or UncheckedAccount fields with authority-role names lacking signer constraints — allows attackers to pass unsigned accounts as authorities.",
  },
  {
    id: "SW002",
    name: "Missing owner check",
    severity: "critical" as const,
    description:
      "AccountInfo or UncheckedAccount fields with no owner or address constraint — attacker can pass an account owned by any program.",
  },
  {
    id: "SW003",
    name: "Arbitrary CPI target",
    severity: "critical" as const,
    description:
      "CPI calls via invoke, invoke_signed, or invoke_unchecked without prior program ID validation — allows substitution of a malicious program.",
  },
  {
    id: "SW008",
    name: "Missing post-CPI reload",
    severity: "high" as const,
    description:
      "Account data read after a CPI call without reload() — program operates on stale state that may have been modified by the called program.",
  },
  {
    id: "SW011",
    name: "AccountInfo as data account",
    severity: "high" as const,
    description:
      "Data-account fields declared as AccountInfo<'info> instead of Account<'info, T> — bypasses Anchor's owner and discriminator validation.",
  },
  {
    id: "SW012",
    name: "Missing seeds + bump on PDA",
    severity: "high" as const,
    description:
      "PDA-like account constraints missing both seeds and bump components — proper PDA derivation requires both tied to trusted inputs.",
  },
  {
    id: "SW016",
    name: "init_if_needed usage",
    severity: "medium" as const,
    description:
      "Anchor account fields using init_if_needed — pattern can permit unintended re-initialization or state reset.",
  },
  {
    id: "SW018",
    name: "Missing realloc::zero = true",
    severity: "medium" as const,
    description:
      "Account reallocation without realloc::zero = true — reallocated memory may contain stale data readable by the program or attackers.",
  },
  {
    id: "SW020",
    name: "AccountInfo as CPI target",
    severity: "critical" as const,
    description:
      "CPI target program typed as AccountInfo<'info> instead of Program<'info, T> — skips program ID validation, allowing any program substitution.",
  },
];

const severityConfig = {
  critical: {
    label: "critical",
    color: "#E53E3E",
    bg: "rgba(229,62,62,0.1)",
    border: "rgba(229,62,62,0.2)",
  },
  high: {
    label: "high",
    color: "#DD6B20",
    bg: "rgba(221,107,32,0.1)",
    border: "rgba(221,107,32,0.2)",
  },
  medium: {
    label: "medium",
    color: "#D69E2E",
    bg: "rgba(214,158,46,0.1)",
    border: "rgba(214,158,46,0.2)",
  },
};

function RuleCard({
  rule,
  onHover,
  isHovered,
}: {
  rule: (typeof rules)[0];
  onHover: (v: boolean) => void;
  isHovered: boolean;
}) {
  const cfg = severityConfig[rule.severity];
  return (
    <div
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className="shrink-0 mx-2 sm:mx-3 rounded-lg p-4 sm:p-5 cursor-default transition-all duration-300"
      style={{
        width: isHovered ? "300px" : "240px",
        background: isHovered ? "#F0E0CC" : "#F5E6D4",
        border: `1px solid ${isHovered ? "#C4A882" : "#E2CCBA"}`,
        boxShadow: isHovered ? "0 4px 24px rgba(44,24,16,0.10)" : "none",
        transform: isHovered ? "translateY(-2px)" : "translateY(0)",
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <span
          className="font-mono text-xs font-bold"
          style={{ color: "#8B6B5A" }}
        >
          {rule.id}
        </span>
        <span
          className="text-xs font-medium px-2 py-0.5 rounded-full"
          style={{
            color: cfg.color,
            background: cfg.bg,
            border: `1px solid ${cfg.border}`,
          }}
        >
          {cfg.label}
        </span>
      </div>
      <div
        className="text-sm mb-2 leading-snug"
        style={{
          color: "#2C1810",
          fontFamily: "var(--font-space-grotesk)",
          fontWeight: 500,
          letterSpacing: "-0.01em",
        }}
      >
        {rule.name}
      </div>
      <p
        className="text-xs leading-relaxed transition-all duration-300"
        style={{
          color: "#7A5A48",
          fontFamily: "var(--font-space-grotesk)",
          fontWeight: 300,
          letterSpacing: "0.01em",
          maxHeight: isHovered ? "80px" : "36px",
          overflow: "hidden",
        }}
      >
        {rule.description}
      </p>
    </div>
  );
}

export function RulesMarquee() {
  const [paused, setPaused] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const tripled = [...rules, ...rules, ...rules];

  return (
    <section id="rules" className="pb-28 scroll-mt-20">
      {/* Section header */}
      <div className="max-w-4xl mx-auto px-6 mb-10">
        <h2
          className="text-2xl font-semibold tracking-tight mb-2"
          style={{ color: "#2C1810" }}
        >
          What sentio catches
        </h2>
        <p style={{ color: "#6B4C3B" }} className="text-sm">
          Glimpse on Rules. More adding soon.
        </p>
      </div>

      {/* Marquee track */}
      <div
        className="relative"
        style={{
          overflow: "hidden",
          maxWidth: "100vw",
          contain: "paint",
        }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => {
          setPaused(false);
          setHoveredIdx(null);
        }}
      >
        {/* Left fade */}
        <div
          className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #FBF0E4, transparent)" }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #FBF0E4, transparent)" }}
        />

        <div
          className="flex items-start py-4"
          style={{
            animation: paused ? "none" : "marquee-scroll 40s linear infinite",
            width: "max-content",
          }}
        >
          {tripled.map((rule, i) => (
            <RuleCard
              key={i}
              rule={rule}
              isHovered={hoveredIdx === i}
              onHover={(v) => setHoveredIdx(v ? i : null)}
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
    </section>
  );
}
