import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    //Parse params from the webhook verification request
    const mode = req.nextUrl.searchParams.get("hub.mode")
    const token = req.nextUrl.searchParams.get("hub.verify_token")
    const challenge = req.nextUrl.searchParams.get("hub.challenge")

    if (mode && token) {
        // Check if the mode and token sent are correct
        if (
            mode === "subscribe" &&
            token === process.env.WHATSAPP_VERIFY_TOKEN
        ) {
            cookies().set("webhook-wpp-west-chat", token)

            // Respond with 200 OK and send challenge token from the request
            return NextResponse.json({ challenge: challenge, status: 200 })
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            return NextResponse.json({
                error: "Token did not match",
                status: 403,
            })
        }
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const data = await new Response(req.body).json()
        const phone_number_id =
            data["entry"][0]["changes"][0]["value"].metadata.phone_number_id
        const message = data["entry"][0]["changes"][0]["value"]["messages"][0]
        const from = message["from"]
        const text = message["text"]["body"]
        console.log(from, text)

        const token = cookies().get("webhook-wpp-west-chat")
        if(!token) {
            console.log("Token not found");
            return NextResponse.json({ message: "Token not found" }, { status: 400 })
        }

        fetch(
            `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}/${phone_number_id}/messages?access_token=${token}`,
            {
                method: "POST",
                body: JSON.stringify({
                    messaging_product: "whatsapp",
                    to: from,
                    text: { body: `Mensagem recebida: ${text}` },
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
    } catch (error) {
        console.log(error)
    }

    return NextResponse.json({ message: "Success" }, { status: 200 })
}
