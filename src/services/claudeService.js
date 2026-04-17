const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

const AGENT_PERSONAS = {
  for: {
    name: "Agent FOR",
    side: "FOR",
    style: "You are a confident, sharp debater arguing strongly IN FAVOUR of the topic. Use facts, logic, and passion. Always directly counter your opponent's last point first, then build your own argument.",
  },
  against: {
    name: "Agent AGAINST", 
    side: "AGAINST",
    style: "You are a fierce, witty debater arguing strongly AGAINST the topic. Use facts, logic, and sarcasm. Always directly counter your opponent's last point first, then build your own argument.",
  },
};

export async function getAgentArgument({ topic, side, history, round, totalRounds, isClosing }) {
  const persona = AGENT_PERSONAS[side];

  const systemPrompt = `${persona.style}

Topic: "${topic}"
Your side: ${persona.side}
Current round: ${round} of ${totalRounds}
${isClosing ? "This is your CLOSING STATEMENT. Make it powerful and conclusive." : ""}

Rules:
- Keep your argument to 3-4 sentences max
- Be direct, sharp, and engaging
- Never break character
- Do NOT use bullet points, just natural speech`;

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": ANTHROPIC_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      system: systemPrompt,
      messages: history.length > 0 ? history : [
        { role: "user", content: `The debate topic is: "${topic}". Make your opening argument.` }
      ],
    }),
  });

  const data = await response.json();
  return data.content[0].text;
}