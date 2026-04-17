export default function AgentBubble({ side, name, text, round, isLoading }) {
  const isFor = side === "for";

  return (
    <div style={{
      display: "flex",
      flexDirection: isFor ? "row" : "row-reverse",
      gap: 12,
      marginBottom: 24,
      alignItems: "flex-start",
    }}>
      <div style={{
        width: 42,
        height: 42,
        borderRadius: "50%",
        background: isFor ? "var(--for-color)" : "var(--against-color)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 13,
        fontWeight: 700,
        color: "#fff",
        flexShrink: 0,
        marginTop: 4,
      }}>
        {isFor ? "FOR" : "AGN"}
      </div>

      <div style={{ maxWidth: "75%" }}>
        <div style={{
          fontSize: 11,
          fontWeight: 600,
          color: isFor ? "var(--for-color)" : "var(--against-color)",
          marginBottom: 5,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
          textAlign: isFor ? "left" : "right",
        }}>
          {name} · Round {round}
        </div>
        <div style={{
          background: isFor ? "var(--for-light)" : "var(--against-light)",
          border: `1px solid ${isFor ? "var(--for-border)" : "var(--against-border)"}`,
          borderRadius: isFor ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
          padding: "14px 18px",
          fontSize: 14,
          lineHeight: 1.7,
          color: "var(--text)",
        }}>
          {isLoading ? (
            <span style={{ color: "var(--muted)" }}>Thinking<span className="dots">...</span></span>
          ) : text}
        </div>
      </div>
    </div>
  );
}