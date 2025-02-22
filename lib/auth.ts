import NextAuth from "next-auth"
import Sendgrid from "next-auth/providers/sendgrid"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/db/prisma"
import { Session, User } from "next-auth"

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        Sendgrid({
            apiKey: process.env.AUTH_SENDGRID_KEY,
            from: "customer.team@math-fact-missions.com"
        }),
    ],
    pages: {
        signIn: '/sign-in',
        error: '/sign-in'
    },
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60 // 30 days 
    },
    callbacks: {
        // @ts-ignore: let there be any here
        async session({ session, user, trigger, token }: any) {
            // Set the user ID from the token
            session.user.id = token.sub;
            
            // It there is an update, set the user name
            if (trigger === 'update') {
                session.user.name = user.name
            }
            return session
        }
    }
})