import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authorizeUser, AuthorizedUser } from "../../../../utils/userAPI";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: authorizeUser,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: undefined,
  },
  session: {
    maxAge: 1 * 60, 
    updateAge: 1 * 60, // 15 minutes
  },
  jwt: {
    maxAge: 1 * 60, 
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const authorizedUser = user as AuthorizedUser;
        token.id = authorizedUser.id;
        token.name = authorizedUser.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
        session.user = session.user || {};
        session.user.name = token.name ?? '';
      }
      return session;
    },
  },
};
