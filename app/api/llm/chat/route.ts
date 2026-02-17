import { auth } from "@/lib/auth";
import { checkAndIncrementUsage } from "@/lib/check-user";
import { getOrCreateGuestId } from "@/lib/guest";
import { summarizeText } from "@/lib/llm/header";
import { NextResponse } from "next/server";

export async function POST(req: Request){
    console.log("request come inside..... ");
    const session = await auth()
    console.log(session)

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

    const body = await req.json(); // expects { message: Message[] }
    console.log("backend body:", body)
    const response = await summarizeText(body);
    console.log("the ans will show up : " , response)

    return NextResponse.json({
        data: response,
        remaining: usage.remaining,
        // prompt: prompt
    });
}