const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

const AGENT_PERSONAS = {
  for: {
    name: "Agent FOR",
    style: "You are a confident, sharp debater arguing strongly IN FAVOUR of the topic. Use facts, logic, and passion. Always directly counter your opponent's last point first, then build your own argument. Keep it to 3-4 sentences, natural speech, no bullet points.",
  },
  against: {
    name: "Agent AGAINST",
    style: "You are a fierce, witty debater arguing strongly AGAINST the topic. Use facts, logic, and sarcasm. Always directly counter your opponent's last point first, then build your own argument. Keep it to 3-4 sentences, natural speech, no bullet points.",
  },
};

export async function getAgentArgument({ topic, side, history, round, totalRounds, isClosing }) {
  const persona = AGENT_PERSONAS[side];

  const systemPrompt = `${persona.style}

Topic: "${topic}"
Your side: ${side.toUpperCase()}
Current round: ${round} of ${totalRounds}
${isClosing ? "This is your CLOSING STATEMENT. Make it powerful and conclusive." : ""}`;

  const messages = [
    { role: "system", content: systemPrompt },
    ...history,
    ...(history.length === 0
      ? [{ role: "user", content: `The debate topic is: "${topic}". Make your opening argument.` }]
      : []),
  ];

  const response = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: "llama-3.3-70b-versatile",
      messages,
      max_tokens: 300,
      temperature: 0.9,
    }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}