import prisma from "@/lib/prisma"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from '@auth/prisma-adapter'


export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
      ],
      secret: process.env.NEXTAUTH_SECRET, 

    adapter: PrismaAdapter(prisma),

      session: {
        strategy: "jwt",
    },
}) 