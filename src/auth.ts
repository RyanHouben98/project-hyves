import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import { db } from "./db";
import credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    credentials({
      credentials: {
        emailAddress: {},
        password: {},
      },
      authorize: async (credentials) => {
        let user = null;

        return user;
      },
    }),
  ],
});
