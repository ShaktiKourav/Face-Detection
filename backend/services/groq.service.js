import Groq from "groq-sdk";

console.log("GROQ KEY:", process.env.GROQ_API_KEY);

let groq = null;

if (process.env.GROQ_API_KEY) {
  groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
  });
}

export const recommendSong = async (mood) => {
  if (!groq) {
    throw new Error("GROQ_API_KEY is missing in .env");
  }

  const prompt = `
Recommend ONE song for mood "${mood}".

Return JSON only.

{
"title":"",
"artist":"",
"youtube":""
}
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  return JSON.parse(completion.choices[0].message.content);
};