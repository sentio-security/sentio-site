const rules = [
  {
    id: "SW002",
    name: "Missing owner check",
    severity: "critical",
    description:
      "Detects AccountInfo or UncheckedAccount fields with no owner or address constraint, allowing an attacker to pass an account owned by any program.",
  },
  {
    id: "SW016",
    name: "init_if_needed usage",
    severity: "medium",
    description:
      "Flags Anchor account fields using init_if_needed because the pattern can permit unintended re-initialization or state reset.",
  },
  {
    id: "SW001",
    name: "Missing signer check",
    severity: "critical",
    description:
      "Detects instruction accounts that should require a signer constraint but are missing one, enabling unauthorized callers.",
  },
  {
    id: "SW008",
    name: "Arithmetic overflow risk",
    severity: "high",
    description:
      "Identifies unchecked arithmetic on account lamport or token amount fields that may overflow in release builds.",
  },
];

const severityStyle: Record<string, { color: string; bg: string }> = {
  critical: { color: "#E53E3E", bg: "rgba(229,62,62,0.08)" },
  high: { color: "#DD6B20", bg: "rgba(221,107,32,0.08)" },
  medium: { color: "#D69E2E", bg: "rgba(214,158,46,0.08)" },
};

export function RulesSection() {
  return (
    <section id="rules" className="px-6 pb-28 max-w-4xl mx-auto w-full scroll-mt-20">
      <div className="mb-10">
        <h2
          className="text-2xl font-semibold tracking-tight mb-2"
          style={{ color: "#2C1810" }}
        >
          What sentio catches
        </h2>
        <p style={{ color: "#6B4C3B" }} className="text-sm">
          Rules are written against real Solana exploit patterns. No generic
          linting noise.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {rules.map((rule) => (
          <div
            key={rule.id}
            className="rounded-md p-5"
            style={{
              background: "#F5E6D4",
              border: "1px solid #E2CCBA",
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <span
                className="font-mono text-xs font-semibold"
                style={{ color: "#8B6B5A" }}
              >
                {rule.id}
              </span>
              <span
                className="text-xs font-medium px-2 py-0.5 rounded-full"
                style={severityStyle[rule.severity]}
              >
                {rule.severity}
              </span>
            </div>
            <div
              className="text-sm font-semibold mb-2"
              style={{ color: "#2C1810" }}
            >
              {rule.name}
            </div>
            <p className="text-xs leading-relaxed" style={{ color: "#7A5A48" }}>
              {rule.description}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-6 text-xs" style={{ color: "#A07858" }}>
        More rules in progress. Contributions welcome via GitHub.
      </p>
    </section>
  );
}
