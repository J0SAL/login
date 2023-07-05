import { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authOptions = {
    providers: [
      GithubProvider({
        clientId: process.env.GITHUB_ID!,
        clientSecret: process.env.GITHUB_SECRET!,
      }),
    ],
  };
  return await NextAuth(req, res, authOptions);
}

export { handler as GET, handler as POST };
