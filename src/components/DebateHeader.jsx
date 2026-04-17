export default function DebateHeader({ topic, round, totalRounds, onReset }) {
  return (
    <div style={{
      background: "var(--card)",
      borderBottom: "1px solid var(--border)",
      padding: "14px 24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 10,
    }}>
      <div>
        <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 2 }}>
          AI Clash Arena
        </div>
        <div style={{ fontSize: 14, fontWeight: 600, maxWidth: 340, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {topic}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 11, color: "var(--muted)" }}>Round</div>
          <div style={{ fontSize: 18, fontWeight: 700 }}>{round}/{totalRounds}</div>
        </div>
        <button
          onClick={onReset}
          style={{
            fontSize: 13,
            padding: "7px 14px",
            borderRadius: 8,
            border: "1px solid var(--border)",
            background: "transparent",
            color: "var(--muted)",
          }}
        >
          New debate
        </button>
      </div>
    </div>
  );
}