import { Message } from "@/types/type";
import GetResponse from "./getResponse";
import { useEffect, useState } from "react";
import { useResponse } from "@/hook/useResponse";

export default function AiResponse({message} : any){
    const [response, setResponse] = useState<Message[]>([]);
    const { loading, handleResponse } = useResponse();

    useEffect(() => {
        if (!message || message.length === 0) return;

        const userMessage = message[message.length - 1]; // get latest user message

        // Show the user message immediately
        setResponse((prev) => [...prev, userMessage]);

        const processMessage = async () => {
            const assistantMessage = await handleResponse(message);
            
            setResponse((prev) => [
                ...prev,
                {role:"assistant" , content: assistantMessage}
              ]);
        };

        processMessage();
    }, [message]);

    return <GetResponse message={response} loading={loading} />
}