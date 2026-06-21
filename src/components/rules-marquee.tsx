"use client";

import { useRef, useState } from "react";

const rules = [
  {
    id: "SW001",
    name: "Missing signer check",
    severity: "critical" as const,
    description: "Authority-like accounts lacking signer validation.",
  },
  {
    id: "SW002",
    name: "Missing owner check",
    severity: "critical" as const,
    description: "Accounts without owner or address constraints.",
  },
  {
    id: "SW003",
    name: "Arbitrary CPI target",
    severity: "critical" as const,
    description: "Raw CPI calls missing program ID verification.",
  },
  {
    id: "SW005",
    name: "Unchecked arithmetic",
    severity: "high" as const,
    description: "Unprotected math operations on account fields.",
  },
  {
    id: "SW006",
    name: "Type cosplay",
    severity: "critical" as const,
    description: "Deserialization without discriminator validation.",
  },
  {
    id: "SW008",
    name: "Missing post-CPI reload",
    severity: "high" as const,
    description: "Account writes after CPI without reload().",
  },
  {
    id: "SW009",
    name: "Missing token mint check",
    severity: "high" as const,
    description: "Mutable token accounts lacking mint constraints.",
  },
  {
    id: "SW010",
    name: "Missing token owner check",
    severity: "high" as const,
    description: "Token accounts without authority validation.",
  },
  {
    id: "SW011",
    name: "AccountInfo as data account",
    severity: "medium" as const,
    description: "Untyped AccountInfo where typed Account is needed.",
  },
  {
    id: "SW012",
    name: "Missing seeds + bump on PDA",
    severity: "high" as const,
    description: "PDAs with seeds but no bump verification.",
  },
  {
    id: "SW013",
    name: "PDA seed unvalidated account",
    severity: "high" as const,
    description: "PDA seeds referencing unconstrained accounts.",
  },
  {
    id: "SW014",
    name: "PDA bump not canonical",
    severity: "medium" as const,
    description: "Caller-supplied bumps instead of canonical derivation.",
  },
  {
    id: "SW016",
    name: "init_if_needed usage",
    severity: "medium" as const,
    description: "Accounts risking silent reinitialization.",
  },
  {
    id: "SW018",
    name: "Missing realloc::zero",
    severity: "medium" as const,
    description: "Realloc operations leaving stale data in memory.",
  },
  {
    id: "SW020",
    name: "AccountInfo as CPI program",
    severity: "medium" as const,
    description: "Untyped program accounts in CPI contexts.",
  },
  {
    id: "SW021",
    name: "PDA seed collision risk",
    severity: "high" as const,
    description:
      "In a seed where two or more adjacent elements are both with no fixed-length",
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
          maxHeight: "36px",
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
          16 rules targeting real Solana exploit patterns. No generic noise.
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
          style={{
            background: "linear-gradient(to right, #FBF0E4, transparent)",
          }}
        />
        {/* Right fade */}
        <div
          className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 pointer-events-none"
          style={{
            background: "linear-gradient(to left, #FBF0E4, transparent)",
          }}
        />

        <div
          className="flex items-start py-4"
          style={{
            animation: "marquee-scroll 25s linear infinite",
            animationPlayState: paused ? "paused" : "running",
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
