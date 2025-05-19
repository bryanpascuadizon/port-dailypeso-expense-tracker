import NextAuth, { NextAuthConfig } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./db/prisma";

export const config = {
  pages: {
    signIn: "/sign-in",
    signOut: "/sign-in",
    error: "/sign-in",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_APP_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_APP_SECRET_KEY!,
    }),
  ],
  callbacks: {
    //When the session is accessed
    async session({ session, user, trigger, token }: any) {
      //Set user ID from token

      session.user.id = token.sub;
      session.user.name = token.name;

      //If there's a user profile update
      if (trigger === "update") {
        session.user.name = user.name;
        session.user.email = user.email;
      }

      return session;
    },
    //When the jwt is accessed
    async jwt({ session, user, trigger, token }: any) {
      //Assign user fields to token
      if (user) {
        token.id = user.id;

        //if user has no name, use email
        if (user.name === "User") {
          token.name = user.email!.split("@")[0];

          await prisma.user.update({
            where: {
              id: user.id,
            },
            data: {
              name: token.name,
            },
          });
        }
      }

      //If there's a user profile update
      if (session?.user.name && trigger === "update") {
        token.name = session.user.name;
        token.email = session.user.email;
      }

      return token;
    },
    authorized({ request, auth }: any) {
      const protectedPaths = [/\/transactions/, /\/accounts/];

      const { pathname } = request.nextUrl;

      if (!auth && protectedPaths.some((p) => p.test(pathname))) {
        return false;
      }

      return true; // ✅ always return something
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
