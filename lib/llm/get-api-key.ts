import { ModelConfig , model as ModelType } from "@/types/type";


export function getApiKey(model:ModelType){

    const modelMap: Partial<Record<ModelType, ModelConfig>> = { 
        "google/gemma-3n-e2b-it:free": {key: process.env.OPENROUTER_API_KEY!},
        "arcee-ai/trinity-mini:free": {key:process.env.Arcee_AI!} 
      }
    
    const config = modelMap[model]

    if(!config){
        throw new Error("mode not found");
    }

    return config
}

