import { Message } from "@/types/type";
import GetResponse from "./getResponse";
import useMock from "@/hook/useMock";
import { useEffect, useState } from "react";

export default function AiResponse({message} : any){
    const [response, setResponse] = useState<Message[]>([]);
    const { loading, handleResponse } = useMock();

    useEffect(() => {
        if (!message || message.length === 0) return;

        const processMessage = async () => {
            const assistantMessage = await handleResponse(message);
            
            setResponse(assistantMessage);
            console.log(response)
        };

        processMessage();
    }, [message]);

    return <GetResponse message={response} loading={loading} />
}