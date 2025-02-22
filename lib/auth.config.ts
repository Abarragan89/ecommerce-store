import type { NextAuthConfig } from "next-auth"
import SendGrid from "next-auth/providers/sendgrid"
// import { PrismaAdapter } from "@auth/prisma-adapter"
// import { prisma } from "@/db/prisma"

// Notice this is only an object, not a full Auth.js instance
export default {
    providers: [SendGrid({
        apiKey: process.env.AUTH_SENDGRID_KEY,
        from: "customer.team@math-fact-missions.com"
    }),],
} satisfies NextAuthConfig