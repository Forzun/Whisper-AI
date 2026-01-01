import { auth } from "@/lib/auth";
import { checkAndIncrementUsage } from "@/lib/check-user";
import { getOrCreateGuestId } from "@/lib/guest";
import { fetchFromOpenRouter } from "@/lib/openrouter";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    const session = await auth()
    console.log(session);

    const userId = session?.user?.id; 
    let guestId

    if(!userId){ 
        guestId = await getOrCreateGuestId();
    }

    const usage = await checkAndIncrementUsage({userId , guestId});

    if(!usage.allowed){ 
        return NextResponse.json(
            {
              error: "LIMIT_EXCEEDED",
              message: "Free limit exceeded. Login to continue.",
            },
            { status: 403 }
          );
    }

    const body = await req.json();
    const { prompt } = body;

    const message = { 
        role: "user", 
        content: "hi..."
    }
    const answer = await fetchFromOpenRouter([message])

    return NextResponse.json({
        answer,
        remaining: usage.remaining,
        prompt: prompt
    });

}
