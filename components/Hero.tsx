"use client";
import Image from "next/image";
import { Button } from "./ui/Button";
import { ArrowRight } from "lucide-react";
import { BorderBeam } from "./beam";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import axios from "axios";
import { Session } from "next-auth";

export default function Hero() {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("/api/auth/session").then((data) => {
      if (Object.keys(data).length != 0) {
        setSession(data.data);
      }
      setLoading(false);
    });
  }, []);

  const UserHandler = async () => {
    if (loading) return;

    if (session?.user) {
      router.push("/home");
    } else {
      signIn();
    }
  };

  return (
    <div className="relative flex flex-col items-center mt-24 px-6 md:px-8">
      <div className="">
        <BeamButton />
      </div>
      <div className="max-w-3xl flex flex-col text-center">
        <h1 className="md:text-5xl lg:text-7xl text-2xl font-bold tracking-tighter bg-gradient-to-tl from-white to-neutral-400 bg-clip-text text-transparent md:mt-12 mt-4">
          Transform Your Content with AI
        </h1>
        <p className="text-muted-foreground text-center max-w-xl mx-auto text-lg">
          Whether it's a tweet, summary, or article, our AI turns good into
          great.
        </p>
      </div>
      <div className="flex justify-center max-w-2xl mt-10 gap-3">
        <Button onClick={() => UserHandler()} className="cursor-pointer">
          Get Started for free
        </Button>
        <Button className="cursor-pointer" variant={"ghost"}>
          Request to demo
        </Button>
      </div>
      <div className="mt-20 mx-auto">
        <Image
          className="rounded-md border shadow-xl border-neutral-800/60 mask-b-from-20% mask-b-to-90%"
          alt="demo"
          src="/demo.webp"
          width={1100}
          priority={true}
          height={400}
        />
      </div>
    </div>
  );
}

function BeamButton() {
  return (
    <div>
      <button className="px-5 py-1 border relative border-neutral-700 rounded-full flex items-center gap-2 text-sm group bg-neutral-600/20 text-neutral-200">
        Whisper.Ai free to use{" "}
        <span>
          <ArrowRight className="w-4 h-5 transform group-hover:translate-x-1 transition-all duration-200 ease-in-out" />
        </span>
        <BorderBeam className="absolute inset-0 rounded-full from-transparent via-neutral-300 to-transparent" />
      </button>
    </div>
  );
}
