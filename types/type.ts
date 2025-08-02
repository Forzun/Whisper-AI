export type Message = {
    role?: "user" | "assistant";
    content: string;
  };

export interface AiResponseProps {
    message: Message[];
    role?: string;
    isAssistant?: boolean;
    loading?: boolean;
  }