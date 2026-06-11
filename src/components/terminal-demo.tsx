"use client";

const findings = [
  {
    id: "FINDING 1",
    rule: "SW016 init_if_needed usage (manual review)",
    severity: "medium" as const,
    location:
      "./ralli-bet/programs/ralli-bet/src/instructions/create_lineV2.rs:27:1",
    matchedBecause:
      "Account `line_pointer` uses `init_if_needed`; review for re-initialization or state-reset risk.",
    lines: [
      { n: 25, text: "    pub player_line: Account<'info, PlayerLine>," },
      { n: 26, text: "" },
      { n: 27, text: "    #[account(", highlight: true },
      { n: 28, text: "        init_if_needed," },
      { n: 29, text: "        payer = admin," },
    ],
    guidance:
      "Prefer #[account(init, ...)] when possible. If init_if_needed is necessary, confirm the account cannot be abused to reset state.",
  },
  {
    id: "FINDING 2",
    rule: "SW002 Missing owner check",
    severity: "critical" as const,
    location:
      "./ralli-bet/programs/ralli-bet/src/instructions/resolve_game_batch.rs:40:1",
    matchedBecause:
      "Account `treasury` has no owner constraint and no owner guard in instruction logic; any program-owned account can be passed.",
    lines: [
      {
        n: 38,
        text: "    pub game_vault: Box<InterfaceAccount<'info, TokenAccount>>,",
      },
      { n: 39, text: "" },
      { n: 40, text: "    /// CHECK: Treasury account to receive fees", highlight: true },
      { n: 41, text: "    #[account(mut)]" },
      { n: 42, text: "    pub treasury: AccountInfo<'info>," },
    ],
    guidance:
      "Add #[account(owner = expected_program::ID)] or verify account.owner explicitly in the instruction handler.",
  },
];

const severityColors: Record<string, string> = {
  critical: "#E53E3E",
  high: "#DD6B20",
  medium: "#D69E2E",
  low: "#68D391",
};

export function TerminalDemo() {
  return (
    <section id="demo" className="px-6 pb-24 max-w-4xl mx-auto w-full scroll-mt-20">
      <div
        className="rounded-lg overflow-hidden shadow-2xl"
        style={{ background: "#1A0F0A", border: "1px solid #3D2418" }}
      >
        {/* Terminal chrome */}
        <div
          className="flex items-center gap-2 px-4 py-3"
          style={{ background: "#150C07", borderBottom: "1px solid #3D2418" }}
        >
          <span className="w-3 h-3 rounded-full" style={{ background: "#FF5F57" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#FFBD2E" }} />
          <span className="w-3 h-3 rounded-full" style={{ background: "#28C840" }} />
          <span
            className="ml-3 text-xs font-mono"
            style={{ color: "#6B4C3B" }}
          >
            sentio scan
          </span>
        </div>

        {/* Terminal body */}
        <div className="p-4 sm:p-6 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto">
          {/* prompt line */}
          <div className="mb-6" style={{ color: "#8B6B5A" }}>
            <span style={{ color: "#C4531A" }}>$</span> sentio scan
          </div>

          {findings.map((f, i) => (
            <div key={i} className="mb-8">
              {/* Finding header */}
              <div
                className="mb-3 text-xs font-bold tracking-widest uppercase"
                style={{ color: "#C4531A" }}
              >
                ══ {f.id}: {f.rule} ══
              </div>

              {/* Meta */}
              <div className="mb-3 space-y-1">
                <div>
                  <span style={{ color: "#6B4C3B" }}>Severity: </span>
                  <span
                    className="font-semibold"
                    style={{ color: severityColors[f.severity] }}
                  >
                    {f.severity}
                  </span>
                </div>
                <div className="break-all">
                  <span style={{ color: "#6B4C3B" }}>Location: </span>
                  <span style={{ color: "#E8D5C0" }}>{f.location}</span>
                </div>
              </div>

              {/* Matched because */}
              <div className="mb-3">
                <div style={{ color: "#6B4C3B" }} className="mb-1">
                  Matched Because:
                </div>
                <div style={{ color: "#C4A882" }} className="pl-2">
                  {f.matchedBecause}
                </div>
              </div>

              {/* Source block */}
              <div
                className="rounded p-3 mb-3"
                style={{ background: "#0F0805", border: "1px solid #2A1A10" }}
              >
                {f.lines.map((line, j) => (
                  <div
                    key={j}
                    className="flex gap-3"
                    style={{
                      color: line.highlight ? "#FBF0E4" : "#5A3A2A",
                    }}
                  >
                    <span className="select-none w-6 text-right shrink-0" style={{ color: "#3D2418" }}>
                      {line.n}
                    </span>
                    <span style={{ color: line.highlight ? "#C4531A" : undefined }}>
                      {line.highlight ? ">" : " "}
                    </span>
                    <span style={{ color: line.highlight ? "#FBF0E4" : "#7A5A48" }}>
                      {line.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* Guidance */}
              <div>
                <span style={{ color: "#6B4C3B" }}>Guidance: </span>
                <span style={{ color: "#A07858" }}>{f.guidance}</span>
              </div>
            </div>
          ))}

          {/* Summary */}
          <div
            className="mt-4 pt-4"
            style={{ borderTop: "1px solid #3D2418" }}
          >
            <div style={{ color: "#C4531A" }} className="font-bold mb-2">
              ── Summary ──
            </div>
            <div style={{ color: "#8B6B5A" }}>
              Total findings:{" "}
              <span style={{ color: "#FBF0E4" }}>3</span>
            </div>
            <div style={{ color: "#8B6B5A" }}>
              Critical:{" "}
              <span style={{ color: severityColors.critical }}>2</span>
            </div>
            <div style={{ color: "#8B6B5A" }}>
              Medium:{" "}
              <span style={{ color: severityColors.medium }}>1</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
