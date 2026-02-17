import { Message , model as ModelConfig } from "@/types/type";
import { fetchFromOpenRouter } from "./container"

export async function summarizeText({ message }: { message: Message[] }){
    try{ 
        console.log("header inside:", message)
        let model:ModelConfig = "google/gemma-3n-e2b-it:free"
        const response = await fetchFromOpenRouter(message, model);
        console.log("header response:", response)

        if(response?.choices?.[0]?.message?.content){
            return response.choices[0].message.content;
        }

        if(response?.message){
            return response.message;
        }

    }catch(error){
        console.error(error)        
    }
}

