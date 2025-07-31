export type Message = {
    value: string;
  };

export interface AiResponseProps {
    message: Message[];
    role?: string;
    isAssistant?: boolean;
    loading?: boolean;
  }