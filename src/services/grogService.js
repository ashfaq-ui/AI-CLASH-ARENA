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

async function fetchWithTimeout(url, options, timeoutMs = 15000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timer);
    return response;
  } catch (err) {
    clearTimeout(timer);
    throw err;
  }
}

async function fetchWithRetry(url, options, retries = 3, delayMs = 3000) {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetchWithTimeout(url, options);
      const data = await response.json();

      if (data.error) {
        console.warn(`Attempt ${i + 1} failed:`, data.error.message);
        if (i < retries - 1) {
          await new Promise(res => setTimeout(res, delayMs));
          continue;
        }
        throw new Error(data.error.message);
      }

      return data;
    } catch (err) {
      console.warn(`Attempt ${i + 1} error:`, err.message);
      if (i < retries - 1) {
        await new Promise(res => setTimeout(res, delayMs));
      } else {
        throw err;
      }
    }
  }
}

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

  const data = await fetchWithRetry(GROQ_URL, {
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

  return data.choices[0].message.content;
}