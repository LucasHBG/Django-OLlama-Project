import { NextApiRequest, NextApiResponse } from "next"
import { NextResponse } from "next/server"
import { wscAuthCookie } from "@/utils/cookies"
import Cookies from "js-cookie"

// Notice the funciton definiton:
export async function GET(req: NextApiRequest) {
    return NextResponse.json(
        { error: "Method not allowed" },
        {
            status: 405,
        }
    )
}

export async function POST(req: NextApiRequest, res: NextApiResponse) {
    try {
        const data = await new Response(req.body).json()
        const email = data["email"]
        const password = data["password"]

        Cookies.set(
            wscAuthCookie,
            `{email:${email},password:${password},token:12345}`
        )

        return NextResponse.json(
            { message: "Logado com sucesso" },
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
