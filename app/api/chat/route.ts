import { fetchFromOpenRouter } from "@/lib/llm/container";
import { summarizeText } from "@/lib/llm/header";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest ) { 
    try{ 
        const body = await req.json();  // expects { messages: Message[] }
        const response = await summarizeText({ message: body.messages });
        
        return NextResponse.json({
            data:response
        })
    }catch(error){ 
        return NextResponse.json({
            error:error
        })
    }

} 