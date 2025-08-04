import { Message } from "@/types/type";
import { useEffect, useState } from "react";


export default function useMock(){
    const [response , setResponse] = useState<Message[]>([]); 
    const [loading , setLoading] = useState(false);

    // useEffect(() => {
    //     console.log("Response updated:", response);
    // }, [response]);

        async function handleResponse(message:Message[]){ 
            setLoading(true);
            const metaData:Message[] = [ {
                role:"assistant", 
                content:"Hi there! How can I help you today? Do you have any questions, need some information, want to chat, or anything else at all? Just let me know!"
            }] 

            await new Promise((res) => setTimeout(res, 2000));
            
            setResponse([...message, ...metaData]);

            setLoading(false)
            return metaData;
        }

    return { loading , handleResponse}
}