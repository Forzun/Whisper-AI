import { Message } from "@/types/type";
import { useState } from "react";

interface limitProps { 
    status: boolean, 
    message?:string
}

export function useResponse(){  
    const [response , setResponse] = useState<Message[]>([]);
    const [loading , setLoading] = useState(false);
    const [limit , setLimit] = useState<limitProps>({ 
        status: true, 
        message: ""
    });

    async function handleResponse(message:Message[]){  
        try{
            setLoading(true);
            const res = await fetch("/api/llm/chat" , { 
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({message: message})
        })

        if (res.status === 403) {
            setLoading(false);
            try {
                const errorData = await res.json();
                console.log("Error response:", errorData);
                if (errorData.error === "LIMIT_EXCEEDED") {
                    setLimit({
                        status: false,
                        message: errorData.message || "Free limit exceeded. Login to continue."
                    });
                }
            } catch (parseError) {
                console.error("Failed to parse error response:", parseError);
            }
            return;
        }

        const data = await res.json();
        console.log("hook data" , data);

        if(data.error ===  "LIMIT_EXCEEDED"){ 
            return setLimit({ 
                status:false, 
                message: data.message
            });
        }

        if(data){ 
            setResponse(m => [...message , {role: "assistant" , content: data.data} as Message]);
        }
        setLoading(false); 
        return data.data

        }catch(error){
            console.log(error)
            setLoading(false);
        }
    }

    return {response , loading , handleResponse , limit};

}

