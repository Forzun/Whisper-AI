import { auth } from "@/lib/auth";

export default async function getUser(){ 
    const session = await auth();
    const user = session?.user;

    if(user){ 
        return true;
    }else{ 
        return false;
    }
}






