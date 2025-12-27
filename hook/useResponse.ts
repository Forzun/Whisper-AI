import { Message } from "@/types/type";
import { useState } from "react";


export function useResponse(){  
    const [response , setResponse] = useState<Message[]>([]);
    const [loading , setLoading] = useState(false);

    async function handleResponse(message:Message[]){  
        try{
            setLoading(true);
            const res = await fetch("api/chat" , { 
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({messages: message})
        })

        const data = await res.json();
        console.log(data);

        if(data){ 
            setResponse(m => [...message , {role: "assistant" , content: data.data} as Message]);
        }
        setLoading(false); 
        return data.data

        }catch(error){
            console.log(error)
        }
    }

    return {response , loading , handleResponse};

}

