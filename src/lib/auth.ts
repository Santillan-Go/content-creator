// lib/auth/nextauth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// import { verify } from "bcrypt"; // or bcryptjs
// import { getUserByUsername } from "@/db/user"; // your DB helper

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "your username",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          return null;
        }
        const { username, password } = credentials;

        // Fetch user from database by username
        // const user = await getUserByUsername(username);
        // if (!user) {
        //   return null;
        // }

        // Compare password hash
        //const isValid = await verify(password, user.passwordHash)
        // ;
        const isValid = password === "adminxyz" && username === "admin";
        if (!isValid) {
          return null;
        }

        // You can return whatever user info you want exposed in session
        return {
          id: "admin-id",
          name: "admin",
          username: "admin",
          // email, image, etc if you have
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token, user }) => {
      // On sign in, user will be passed.
      if (user) {
        token.id = user.id;
        token.username = (user as any).username;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token && session.user) {
        // session.user.id! = token.id as string;
        session.user.name = token.username as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login", // optional: custom page
    // error: "/auth/error", etc.
  },
};
