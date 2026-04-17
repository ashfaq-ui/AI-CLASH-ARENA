import { useState } from "react";

export default function VoteScreen({ topic, onReset }) {
  const [voted, setVoted] = useState(null);

  return (
    <div style={{
      padding: "3rem 2rem",
      textAlign: "center",
      maxWidth: 480,
      margin: "0 auto",
    }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>⚔️</div>
      <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Debate Over!</h2>
      <p style={{ color: "var(--muted)", marginBottom: 32, fontSize: 14 }}>
        Who made the better argument on:<br />
        <strong style={{ color: "var(--text)" }}>"{topic}"</strong>
      </p>

      {!voted ? (
        <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
          <button
            onClick={() => setVoted("for")}
            style={{
              flex: 1,
              maxWidth: 180,
              padding: "16px",
              fontSize: 15,
              fontWeight: 600,
              borderRadius: 12,
              border: "2px solid var(--for-color)",
              background: "var(--for-light)",
              color: "var(--for-color)",
            }}
          >
            FOR wins
          </button>
          <button
            onClick={() => setVoted("against")}
            style={{
              flex: 1,
              maxWidth: 180,
              padding: "16px",
              fontSize: 15,
              fontWeight: 600,
              borderRadius: 12,
              border: "2px solid var(--against-color)",
              background: "var(--against-light)",
              color: "var(--against-color)",
            }}
          >
            AGAINST wins
          </button>
        </div>
      ) : (
        <div>
          <div style={{
            fontSize: 18,
            fontWeight: 700,
            marginBottom: 8,
            color: voted === "for" ? "var(--for-color)" : "var(--against-color)",
          }}>
            {voted === "for" ? "FOR" : "AGAINST"} wins the debate!
          </div>
          <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 24 }}>
            Great choice. The AI agents bow to your judgement.
          </p>
          <button
            onClick={onReset}
            style={{
              padding: "12px 28px",
              fontSize: 14,
              fontWeight: 600,
              borderRadius: 8,
              border: "none",
              background: "var(--text)",
              color: "#fff",
            }}
          >
            Start a new debate →
          </button>
        </div>
      )}
    </div>
  );
}