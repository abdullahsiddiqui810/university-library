import NextAuth, {  User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { eq } from "drizzle-orm";
import { users } from "@/database/schema";
import { db } from "@/database/drizzle";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.BETTER_AUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const result = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email.toString()))
          .limit(1);

        if (result.length === 0) return null;

        const isPasswordValid = await compare(
          credentials.password.toString(),
          result[0].password,
        );

        if (!isPasswordValid) return null;

        return {
          id: result[0].id.toString(),
          email: result[0].email,
          name: result[0].fullName,
        } as User;
      },
    }),
  ],

  pages: {
    signIn: "/sign-in",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name;
      }

      return session;
    },
  },
});
