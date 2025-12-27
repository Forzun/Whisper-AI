import { fetchFromOpenRouter } from "@/lib/openrouter";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest ) { 
    try{ 
        const messages = await req.json();  
        const response = await fetchFromOpenRouter(messages.messages);
        return NextResponse.json({
            data:response
        })
    }catch(error){ 
        return NextResponse.json({
            error:error
        })
    }

} 