import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { v4 as uuidv4 } from "uuid";

const EMAIL = process.env.EMAIL as string;
const PASSWORD = process.env.PASSWORD as string;

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing credentials");
        }

        if (credentials.email === EMAIL && credentials.password === PASSWORD) {
          return {
            id: uuidv4(),
            email: EMAIL,
            name: "Quản trị viên",
          };
        }

        throw new Error("Invalid email or password");
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/signin",
  },
};
