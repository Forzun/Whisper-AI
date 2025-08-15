"use client";
import { MoonStar, Sun } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/drop-down";
import { signOut } from "next-auth/react";
import UserNav from "./FetchUser";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [dark, setDart] = useState(true);

  useEffect(() => { 
     const saveTheme = localStorage.getItem("theme");
     if(saveTheme){ 
       const dark = saveTheme === "dark"; 
       setDart(dark);
       if(dark){ 
         document.documentElement.classList.add("dark");
       }else{ 
         document.documentElement.classList.remove("dark");
       }
     }
  }, [])

  function toggleDarkMode() { 
      const newDark = !dark; 
      setDart(newDark);

      if(newDark){ 
        localStorage.setItem("theme", "dark");
        document.documentElement.classList.add("dark");
      }else{
        localStorage.setItem("theme", "light");
        document.documentElement.classList.remove("dark");
      }
  }

  return (
    <nav className="flex items-center justify-between p-5 overflow-hidden md:px-12 px-2">
      <div>
        <a
          href="#"
          className="text-xl font-bold text-neutral-900 dark:text-neutral-100" 
        >
          Whisper.Ai
        </a>
      </div>
      <div className="flex items-center md:gap-4 gap-2 justify-center px-4">
        <button onClick={() => toggleDarkMode()}>
          {dark ? (
            <Sun className="w-8 h-7 text-neutral-900 dark:text-neutral-100 rounded-full p-1  border-1 border-neutral-300  border-dashed dark:border-neutral-700 " />
          ) : (
            <MoonStar className="w-8 h-7 text-neutral-900 dark:text-neutral-100 rounded-full p-1  border-1 border-neutral-300 border-dashed  dark:border-neutral-700 " />
          )}
        </button>
        <UserNav />
      </div>
    </nav>
  );
}

export function DrapLogo({ image }: { image: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Image
          src={`${image}`}
          className="rounded-full"
          alt="userImg"
          width={50}
          height={50}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        className="bg-neutral-900 border-none w-16 mr-2"
      >
        <DropdownMenuItem className="text-neutral-100 ">
          <button onClick={() => signOut()}>Log out</button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
