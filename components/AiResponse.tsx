import { Message } from "@/types/type";
import GetResponse from "./getResponse";
import useMock from "@/hook/useMock";
import { useEffect, useState } from "react";

export default function AiResponse({message} : any){
    const [response, setResponse] = useState<Message[]>([]);
    const { loading, handleResponse } = useMock();

    useEffect(() => {
        if (!message || message.length === 0) return;

        const userMessage = message[message.length - 1]; // get latest user message

        // Show the user message immediately
        setResponse((prev) => [...prev, userMessage]);

        const processMessage = async () => {
            const assistantMessage = await handleResponse(message);
            
            setResponse((prev) => [
                ...prev,
                ...assistantMessage   // One or more assistant messages
              ]);
        };

        processMessage();
    }, [message]);

    return <GetResponse message={response} loading={loading} />
}