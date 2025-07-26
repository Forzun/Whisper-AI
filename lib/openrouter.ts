export async function fetchFromOpenRouter(messages: { role: string; content: string }[]) {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemma-3n-e2b-it:free",
        messages:messages
      }),
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch from OpenRouter");
    }
  
    const data = await response.json();
    return data.choices[0].message.content;
  }