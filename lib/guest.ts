import { randomUUID } from "crypto";
import { cookies } from "next/headers";

export async function getOrCreateGuestId(){ 
    const cookieStore = await cookies(); 

    let guestId = cookieStore.get("guest_id")?.value;

    if(!guestId){ 
        guestId = randomUUID();
        cookieStore.set("guest_id" , guestId , { 
            httpOnly: true, 
            sameSite: "lax", 
            maxAge: 60 * 60 * 24 * 7,
        })
    }
    
    return guestId
}
