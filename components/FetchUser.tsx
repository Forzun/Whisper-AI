"use client";
import { SessionProvider, useSession } from "next-auth/react";
import { DrapLogo } from "./navbar";
import { Button } from "./ui/Button";

export default function UserNav() {
  return (
    <SessionProvider>
      <UserNavPrivider />
    </SessionProvider>
  );
}

function UserNavPrivider() {
  const { data: session, status } = useSession();
  let image;
  if (session) {
    image = session?.user?.image;
  }

  return (
    <div className="size-10 rounded-full p-1 border-1 border-dashed border-neutral-300 dark:border-neutral-700 ">
      {status != "unauthenticated" && image ? (
        <DrapLogo image={image} />
      ) : status != "unauthenticated" ? (
        <div className="w-8 h-8 bg-gray-300 rounded-full" />
      ) : (
        <Button
          variant={"default"}
          className="px-6 py-4 border-1 border-dashed border-neutral-700"
        >
          <a href="/api/auth/signin">Signin</a>
        </Button>
      )}
    </div>
  );
}
