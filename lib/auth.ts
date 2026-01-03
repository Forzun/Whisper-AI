import prisma from "@/lib/prisma"
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from '@auth/prisma-adapter'


export const { handlers, auth, signIn, signOut } = NextAuth({

  session: {
    strategy: "jwt",
},
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
      ],
      callbacks: { 
        async jwt({ token , user}){ 
          if(user){ 
            token.id = user.id;
          }
          return token
        },

        async session({ session , token}){ 
          if (session.user && token.id) {
            session.user.id = token.id as string; 
          }
          return session;
        }

      },
      secret: process.env.NEXTAUTH_SECRET, 
    adapter: PrismaAdapter(prisma),

}) 