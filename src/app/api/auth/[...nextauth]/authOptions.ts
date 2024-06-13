import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials) {
          return null;
        }

        const res = await fetch("https://bioaqualestari.hasura.app/api/rest/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-hasura-admin-secret": "uWyWA0nJbI0pnUA1jfwXlOUpLA5BYba1tb3sDtmTZg8uwRrtWG0gDxTPMn011TuH",
          },
        });

        const data = await res.json();

        // Periksa apakah ada pengguna dengan kredensial yang sesuai
        const user = data.users.find((user: any) => user.username === credentials.username && user.password === credentials.password);

        if (user) {
          return {
            id: user.id,
            name: user.username,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: undefined,
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name ?? ''; // Menambahkan nilai default
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.id = token.id;
        session.user = session.user || {};
        session.user.name = token.name ?? ''; // Menambahkan nilai default
      }
      return session;
    },
  },
};
