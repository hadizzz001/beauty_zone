export async function POST(req) {
  try {
    const { message } = await req.json();
    console.log("Received message:", message);

    const apiKey = process.env.OPENROUTER_API_KEY;
    console.log("API Key exists?", apiKey ? "YES" : "NO");

    if (!apiKey) {
      throw new Error("Missing OPENROUTER_API_KEY");
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-4o",
        messages: [{ role: "user", content: message }],
        max_tokens: 500,
      }),
    });

    console.log("Fetch to OpenRouter completed. Status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("OpenRouter error response:", errorText);
      throw new Error("OpenRouter API error: " + errorText);
    }

    const data = await res.json();
    console.log("Received data from OpenRouter:", data);

    const reply = data.choices?.[0]?.message?.content || "No reply";

    return Response.json({ message: reply });

  } catch (error) {
    console.error("Server error in /api/ai:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
