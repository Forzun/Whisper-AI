import { fetchFromOpenRouter } from "@/lib/llm/container";
import { summarizeText } from "@/lib/llm/header";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest ) { 
    try{ 
        const messages = await req.json();  
        const response = await summarizeText(messages.messages);
        
        return NextResponse.json({
            data:response
        })
    }catch(error){ 
        return NextResponse.json({
            error:error
        })
    }

} 