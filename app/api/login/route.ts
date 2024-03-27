import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { wscAuthCookie } from "@/lib/cookies"

import { loginFormSchema } from "@/lib/validations/form"

// Notice the funciton definiton:
export async function GET(req: NextRequest) {
    return NextResponse.json(
        { error: "Method not allowed" },
        {
            status: 405,
        }
    )
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const data = await new Response(req.body).json()
        const email = data["email"]
        const password = data["password"]

        const parsedLogin = loginFormSchema.safeParse({
            email: email,
            password: password,
        })

        if (!parsedLogin.success) {
            return NextResponse.json(parsedLogin.error, { status: 422 })
        }

        cookies().set(wscAuthCookie, `S2$212345s12`)

        return NextResponse.json(
            { message: "Logado com sucesso", authKey: "S2$212345s12" },
            { status: 200 }
        )
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to get credentials" },
            {
                status: 400,
            }
        )
    }
}
