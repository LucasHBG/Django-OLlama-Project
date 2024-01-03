import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"

import { wscAuthCookie } from "./utils/cookies"

export const middleware = (req: NextRequest) => {
    const token = cookies().get(wscAuthCookie)?.value

    if (!token) return NextResponse.redirect(new URL("/login", req.url))
    
    req.headers.set("Authorization", `Bearer ${token}`)
    /**
     * If there is an Authorization header on the request
     * then compare to the token
     * */
    // const isValid = (req.headers.get("Authorization") ?? "") === wscAuthCookie

    // if (!isValid) return NextResponse.redirect(new URL("/login", req.url))
}

export const config = {
    // Every other route except the ones listed here won't run with the middleware.
    //! Dont forget to get a rule that accepts requests outside
    //! authenticated layers like /api/login, /api/signup etc
    matcher: ["/auth/:path*", "/api/auth/:path*"],
}
