export function Footer() {
  return (
    <footer
      className="mt-auto px-6 py-8 text-center text-xs font-mono"
      style={{ color: "#A07858", borderTop: "1px solid #E2CCBA" }}
    >
      <span style={{ color: "#2C1810", fontWeight: 600 }}>sentio</span>
      <span style={{ color: "#C4531A" }}>.</span>
      {" · "}
      <a
        href="https://github.com/sentio-security/sentio-rs"
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
        style={{ color: "#A07858" }}
      >
        GitHub
      </a>
      {" · MIT License"}
    </footer>
  );
}
