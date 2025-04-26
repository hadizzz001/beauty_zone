export async function POST(req) {
  try {
    const { message } = await req.json();
    console.log("Received message:", message);

    const apiKey = process.env.OPENAI_API_KEY;
    console.log("API Key exists?", apiKey ? "YES" : "NO");

    if (!apiKey) {
      throw new Error("Missing OPENAI_API_KEY");
    }

    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo", // You can use gpt-4 if you want, but gpt-3.5-turbo is a free version
        messages: [{ role: "user", content: message }],
        max_tokens: 500,
      }),
    });

    console.log("Fetch to OpenAI completed. Status:", res.status);

    if (!res.ok) {
      const errorText = await res.text();
      console.error("OpenAI error response:", errorText);
      throw new Error("OpenAI API error: " + errorText);
    }

    const data = await res.json();
    console.log("Received data from OpenAI:", data);

    const reply = data.choices?.[0]?.message?.content || "No reply";

    return Response.json({ message: reply });

  } catch (error) {
    console.error("Server error in /api/ai:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
