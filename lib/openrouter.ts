export async function fetchFromOpenRouter(messages: { role: string; content: string }[]) {
    console.log(messages, "routerMessage");
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemma-3n-e2b-it:free",
        messages:[
          {
            role: messages[messages.length - 1].role,
            content: `Rewrite the following in a formal and professional tone:\n\n${messages[messages.length - 1].content}`
          }
        ]
      }),
    });
  
    const data = await response.json();
    if (!response.ok) {
      const errorMsg = data.error?.message || "Fetch to failed from ai"; 
      console.error("Response through from ai" , { 
        status: response.status, 
        error: data.error,
      })
      return {
        sucess: false, message: errorMsg,
      }
    }

    if(!data.choices?.[0]?.message?.content){ 
      console.error("Response through from ai" , { 
        status: response.status, 
        error: data.error,
      })
      return {
        sucess: false, message: "No response from AI",
      }
    }
  
    return data.choices[0].message.content;
  }