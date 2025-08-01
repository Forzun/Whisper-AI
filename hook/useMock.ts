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
                content:"Hello my how can i help you"
            }] 

            await new Promise((res) => setTimeout(res, 1000));
            
            setResponse([...message, ...metaData]);

            setLoading(false)
            return metaData;
        }

    return { loading , handleResponse}
}