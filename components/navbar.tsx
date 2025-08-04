
import { MoonStar } from "lucide-react";
import { Button } from "./ui/Button";
import { getServerSession } from "next-auth";
import Image from "next/image";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/drop-down"
import { signOut } from "next-auth/react";
import UserNav from "./FetchUser";


export default function Navbar(){ 

    return <nav className="flex items-center justify-between p-5 overflow-hidden px-12">
         <div>
             <a href="/home" className="text-lg font-bold text-neutral-100">Whisper.Ai</a>
         </div>
         <div className="flex items-center gap-4 justify-center px-4">
            <MoonStar className="w-5 h-6 text-neutral-100 hover:text-neutral-200" />    
             <UserNav />
         </div>
    </nav>
}

// async function UserImg(){ 
//     const session = await getServerSession();
//     const url = session?.user?.image!
//     console.log(session)

// return<div className="size-10 rounded-full p-1 border-1 border-dashed border-neutral-700">
//         {session ? DrapLogo(): <Button variant={"default"} className="px-6 py-4 border-1 border-dashed border-neutral-700" ><a href="/api/auth/signin">Signin</a></Button> }
//     </div>
// }

export function DrapLogo({image} : {image: string}){

    return <DropdownMenu>
    <DropdownMenuTrigger asChild><Image src={`${image}`} className="rounded-full" alt="userImg" width={50} height={50} />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="start" className="bg-neutral-900 border-none w-16 mr-2" >
      <DropdownMenuItem className="text-neutral-100 ">
        <button onClick={( ) => signOut()}>Log out</button>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu> 
}