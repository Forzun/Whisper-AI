"use client"

import { SessionProvider, useSession } from "next-auth/react";
export default function Home() {

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
        <SessionProvider>
            <Provider />
        </SessionProvider>
    </div>
  );
}

function Provider() { 
  const {data: session} = useSession()
  console.log(session)

  return <div>

  </div>
}

