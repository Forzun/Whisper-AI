import { getServerSession } from "next-auth";

export default async function getUser(){ 
    const server = await getServerSession();
    const user = server?.user;

    if(user){ 
        return true;
    }else{ 
        return false;
    }
}






