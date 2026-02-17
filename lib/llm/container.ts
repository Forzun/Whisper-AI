import { model as ModelType, ModelConfig } from "@/types/type";
import { getApiKey } from "./get-api-key";

export async function fetchFromOpenRouter(messages: { role: string; content: string }[], model: ModelType) {

    const modelName: Partial<Record<ModelType , ModelConfig>> = { 
      "google/gemma-3n-e2b-it:free": {key: process.env.OPENROUTER_API_KEY!},
      "arcee-ai/trinity-mini:free": {key:process.env.Arcee_AI!} 
    }
    
    const apiKey = getApiKey(model); 
    console.log("api key:", apiKey)

    console.log("user message :", messages)
    const userMessage = messages[messages.length -1].content;     
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: model,
        messages:[
          {
            role: "system", 
            content: `You are a creative and witty tweet title generator. When given an idea, your job is to transform it into 3 funny, engaging, and viral-worthy tweet titles.

            Follow these rules:
            - Keep each title under 280 characters
            - Make them punchy, humorous, and scroll-stopping
            - Use wordplay, irony, or relatable humor when possible
            - Add relevant emojis to boost engagement
            - Avoid being offensive or inappropriate
            - Output ONLY the 3 tweet titles, numbered 1 to 3, nothing else`
          },
          {
            role: messages[messages.length - 1].role,
            content: `${userMessage}`
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
  
    return data;
  }