import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import { db } from "./db";
import credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    credentials({
      credentials: {
        email: {},
        name: {},
        id: {},
      },
      authorize: async (credentials) => {
        const data = {
          email: credentials.email as string,
          id: credentials.id as string,
          name: credentials.name as string,
        };

        console.log(data);
        return data;
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      session.user.id = token.sub!;
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
});
