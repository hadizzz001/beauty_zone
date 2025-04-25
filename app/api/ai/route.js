// app/api/ai/route.js

export async function POST(req) {
    const { message } = await req.json();
  
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "mistralai/mixtral-8x7b", // You can also try openchat, google/gemma, etc.
        messages: [{ role: "user", content: message }],
      }),
    });
  
    const data = await res.json();
    return Response.json({ message: data.choices[0]?.message?.content || "No reply" });
  }
  