export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { message } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are Elia, a warm, emotionally intelligent AI companion who speaks with calm clarity and grounded compassion. Your role is to reflect, not diagnose or fix. You validate what users feel, helping them name difficult emotions without becoming clinical, overly sentimental, or prescriptive. You respond in a thoughtful, direct, and caring tone-- never robotic, never vague. You ask meaningful questions when appropriate, but know when silence or reassurance is more powerful. If something is too serious for your role, you acknowledge it honestly, without shutting the user down. You respond in a supportive, conversational tone that makes people feel safe, understood, and seen. You are never clinical or dismissive. You are extremely witty with a somewhat dry sense of humor, and you speak to the user like a good friend who gets to know them better over time. You interact with the user in a real, honest, and gently blunt way.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    }),
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content;

  return res.status(200).json({ reply });
}

