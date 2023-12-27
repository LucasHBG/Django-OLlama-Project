import NextAuth, { type DefaultSession } from "next-auth"
import Google from "next-auth/providers/google"

declare module "next-auth" {
    interface Session {
        user: {
            /** The user's id */
            id: string
        } & DefaultSession["user"]
    }
}

export const {
    handlers: { GET, POST },
    auth,
} = NextAuth({
    providers: [Google],
    callbacks: {
        jwt({ token, profile }) {
            if (profile) {
                token.id = profile.id
                token.picture = profile.picture
            }
            return token
        },
        session: ({ session, token }) => {
            if (session?.user && token?.id) {
                session.user.id = String(token.id)
            }
            return session
        },
        authorized({ auth }) {
            // this ensures there is a logged in user for -every- request
            return !!auth?.user
        },
    }
})
