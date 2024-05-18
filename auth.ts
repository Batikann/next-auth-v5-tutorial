import { PrismaAdapter } from '@auth/prisma-adapter'
import { PrismaClient } from '@prisma/client'
import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Github from 'next-auth/providers/github'

const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  callbacks: {
    session({ session, user }) {
      session.user.role = user.role
      return session
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [Google, Github],
})
