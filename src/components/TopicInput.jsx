import { useState } from "react";

const SUGGESTIONS = [
  "Is AI more dangerous than beneficial?",
  "Should remote work replace office work?",
  "Is social media doing more harm than good?",
  "Should university education be free?",
  "Is cryptocurrency the future of money?",
];

export default function TopicInput({ onStart }) {
  const [topic, setTopic] = useState("");
  const [style, setStyle] = useState("formal");

  const handleStart = () => {
    if (topic.trim().length < 5) return;
    onStart({ topic: topic.trim(), style });
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
    }}>
      <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
        <div style={{ fontSize: 13, fontWeight: 500, letterSpacing: "0.1em", color: "var(--muted)", marginBottom: 12, textTransform: "uppercase" }}>
          Multi-Agent AI Debate
        </div>
        <h1 style={{ fontSize: 42, fontWeight: 700, letterSpacing: "-1px", marginBottom: 12 }}>
          AI Clash Arena
        </h1>
        <p style={{ fontSize: 16, color: "var(--muted)", maxWidth: 420 }}>
          Two AI agents take opposite sides and battle it out. You judge the winner.
        </p>
      </div>

      <div style={{
        background: "var(--card)",
        border: "0.5px solid var(--border)",
        borderRadius: "var(--radius)",
        padding: "2rem",
        width: "100%",
        maxWidth: 520,
      }}>
        <label style={{ fontSize: 13, fontWeight: 500, color: "var(--muted)", display: "block", marginBottom: 8 }}>
          Enter a debate topic
        </label>
        <input
          value={topic}
          onChange={e => setTopic(e.target.value)}
          onKeyDown={e => e.key === "Enter" && handleStart()}
          placeholder="e.g. Is AI dangerous?"
          style={{
            width: "100%",
            padding: "12px 14px",
            fontSize: 15,
            border: "1px solid var(--border)",
            borderRadius: 8,
            marginBottom: 12,
            outline: "none",
            background: "#fafaf8",
          }}
        />

        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 500, color: "var(--muted)", marginBottom: 8 }}>
            Debate style
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {["formal", "casual", "savage"].map(s => (
              <button
                key={s}
                onClick={() => setStyle(s)}
                style={{
                  flex: 1,
                  padding: "8px",
                  fontSize: 13,
                  fontWeight: style === s ? 600 : 400,
                  borderRadius: 8,
                  border: style === s ? "2px solid var(--text)" : "1px solid var(--border)",
                  background: style === s ? "var(--text)" : "transparent",
                  color: style === s ? "#fff" : "var(--muted)",
                  textTransform: "capitalize",
                  transition: "all 0.15s",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>Try a suggestion</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => setTopic(s)}
                style={{
                  fontSize: 12,
                  padding: "5px 10px",
                  borderRadius: 20,
                  border: "1px solid var(--border)",
                  background: "transparent",
                  color: "var(--muted)",
                  transition: "all 0.15s",
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleStart}
          disabled={topic.trim().length < 5}
          style={{
            width: "100%",
            padding: "13px",
            fontSize: 15,
            fontWeight: 600,
            borderRadius: 8,
            border: "none",
            background: topic.trim().length < 5 ? "#ccc" : "var(--text)",
            color: "#fff",
            transition: "all 0.15s",
          }}
        >
          Start the Debate →
        </button>
      </div>
    </div>
  );
}