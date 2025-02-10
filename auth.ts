import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    jwt: async ({ token, account }) => {
      if (account?.provider === 'google') {
        token.id = account.providerAccountId; // Google user ID
      }

      return token;
    },
    session: async ({ session, token }) => {
      session.user.id = token.id as string;

      return session;
    },
  },
});
