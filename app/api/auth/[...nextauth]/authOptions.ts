import GoogleProvider from "next-auth/providers/google";
import prisma from "@/prisma/client";
import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { Ultra } from "next/font/google";

const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
};

export default authOptions;
