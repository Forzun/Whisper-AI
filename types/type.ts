export type Message = {
    role?: "user" | "assistant";
    content: string;
    model?:string;
  };

export interface AiResponseProps {
    message: Message[];
    role?: string;
    isAssistant?: boolean;
    loading?: boolean;
    limit: { 
      status: boolean,
      message?: string
    }
  }

export type model = "google/gemma-3n-e2b-it:free" | "arcee-ai/trinity-mini:free"
  
export type userMessageType = {
  message:{ 
    role: string, 
    content: string
  }[],
  type?: string; 
  model?: model
}


export interface ModelConfig { 
  key:string
}

