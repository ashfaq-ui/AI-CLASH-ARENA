import { useState, useRef, useEffect } from "react";
import { getAgentArgument } from "./services/grogService";
import TopicInput from "./components/TopicInput";
import AgentBubble from "./components/AgentBubble";
import DebateHeader from "./components/DebateHeader";
import VoteScreen from "./components/VoteScreen";
import "./styles/global.css";

const TOTAL_ROUNDS = 3;

export default function App() {
  const [screen, setScreen] = useState("input");
  const [topic, setTopic] = useState("");
  const [debateStyle, setDebateStyle] = useState("formal");
  const [messages, setMessages] = useState([]);
  const [history, setHistory] = useState([]);
  const [round, setRound] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSide, setCurrentSide] = useState("for");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const startDebate = async ({ topic, style }) => {
    setTopic(topic);
    setDebateStyle(style);
    setScreen("debate");
    setMessages([]);
    setHistory([]);
    setRound(1);
    setCurrentSide("for");
    await runTurn("for", topic, [], 1, false);
  };

  const runTurn = async (side, currentTopic, currentHistory, currentRound, isClosing) => {
    setIsLoading(true);
    setCurrentSide(side);

    const loadingMsg = { id: Date.now(), side, round: currentRound, text: "", isLoading: true };
    setMessages(prev => [...prev, loadingMsg]);

    try {
      const text = await getAgentArgument({
        topic: currentTopic || topic,
        side,
        history: currentHistory,
        round: currentRound,
        totalRounds: TOTAL_ROUNDS,
        isClosing,
      });

      const newMessage = { role: "assistant", content: `[${side.toUpperCase()}]: ${text}` };
      const nextHistory = [...currentHistory, newMessage];

      setMessages(prev => prev.map(m => m.id === loadingMsg.id ? { ...m, text, isLoading: false } : m));
      setHistory(nextHistory);
      setIsLoading(false);

      const nextSide = side === "for" ? "against" : "for";
      const isLastTurn = side === "against" && currentRound === TOTAL_ROUNDS;

      if (isLastTurn) {
        setTimeout(() => setScreen("vote"), 5000);
        return;
      }

      const nextRound = side === "against" ? currentRound + 1 : currentRound;
      if (side === "against") setRound(nextRound);

      setTimeout(() => {
        runTurn(nextSide, currentTopic || topic, nextHistory, nextRound, nextRound === TOTAL_ROUNDS && nextSide === "against");
      }, 4000);

    } catch (err) {
      console.error(err);
      setIsLoading(false);
      setMessages(prev => prev.map(m => m.id === loadingMsg.id ? { ...m, text: "Error fetching response. Check your API key.", isLoading: false } : m));
    }
  };

  const reset = () => {
    setScreen("input");
    setMessages([]);
    setHistory([]);
    setRound(1);
  };

  if (screen === "input") return <TopicInput onStart={startDebate} />;

  if (screen === "vote") return (
    <div>
      <DebateHeader topic={topic} round={TOTAL_ROUNDS} totalRounds={TOTAL_ROUNDS} onReset={reset} />
      <VoteScreen topic={topic} onReset={reset} />
    </div>
  );

  return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <DebateHeader topic={topic} round={round} totalRounds={TOTAL_ROUNDS} onReset={reset} />
      <div style={{ padding: "24px 20px" }}>
        {messages.map((msg, i) => (
          <AgentBubble
            key={msg.id || i}
            side={msg.side}
            name={msg.side === "for" ? "Agent FOR" : "Agent AGAINST"}
            text={msg.text}
            round={msg.round}
            isLoading={msg.isLoading}
          />
        ))}
        <div ref={bottomRef} />
      </div>
    </div>
  );
}