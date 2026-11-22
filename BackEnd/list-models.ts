import "dotenv/config";

const res = await fetch("https://api.groq.com/openai/v1/models", {
  headers: { Authorization: `Bearer ${process.env.GROQ_API_KEY}` },
});

const data = await res.json();
console.log(res.status);
console.log(data.data?.map((m: { id: string }) => m.id).join("\n") ?? data);