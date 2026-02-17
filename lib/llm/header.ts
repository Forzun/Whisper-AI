import { userMessageType , model as ModelConfig } from "@/types/type";
import { fetchFromOpenRouter } from "./container"

export async function summarizeText({message}: userMessageType){
    try{ 
        let model:ModelConfig = "google/gemma-3n-e2b-it:free"
        const response = await fetchFromOpenRouter(message, model);
        console.log("header response:", response)

        if(response){
            return response.choices[0].message.Content
        }

    }catch(error){
        console.error(error)        
    }
}

