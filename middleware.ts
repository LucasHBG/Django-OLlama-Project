import { NextResponse, type NextRequest } from "next/server"
import { wscAuthCookie } from "./utils/cookies"

export const middleware = (req: NextRequest) => {
    /**
     * If there is an Authorization header on the request
     * then compare to the token
     * */
    const isValid =
        (req.headers.get("Authorization") ?? "") === wscAuthCookie

    if (!isValid) return NextResponse.redirect(new URL("/login", req.url))
}

export const config = {
    // Every other route except the ones at /auth/* won't run with the middleware.
    matcher: ["/auth/:path*"],
}
