import prisma from "./prisma";

const GUEST_LIMIT = 2; 

export async function checkAndIncrementUsage(
    {
        userId, 
        guestId
    }: { 
        userId?: string, 
        guestId?: string
    }
){  
    const existingUser = await prisma.usage.findFirst({ 
        where: { 
            userId: userId ?? null, 
            guestId: guestId ?? null
        }
    })

    let user 
    
    if(existingUser){ 
        user = await prisma.usage.update({ 
            where: { 
                id: existingUser.id
            }, 
            data: { 
                count:{ 
                    increment: 1
                }
            }
        })
    }else{ 
        user = await prisma.usage.create({ 
            data:{ 
                userId: userId ?? null, 
                guestId: guestId ?? null, 
                count: 1
            }
        })
    }

    if(!userId && user.count > GUEST_LIMIT){ 
        return { 
            allowed: false, 
            remaining: 0
        }
    }

    return { 
        allowed: true, 
        remaining: userId ? Infinity : Math.max(0 , GUEST_LIMIT - user.count)
    }

}



