import { NextRequest, NextResponse } from "next/server"

// Access token for your WhatsApp business account app
const whatsapp_access_token = process.env.WHATSAPP_ACCESS_TOKEN

// Verify Token defined when configuring the webhook
const verify_token = process.env.WHATSAPP_VERIFY_TOKEN

export async function GET(req: NextRequest) {
    //Parse params from the webhook verification request
    const mode = req.nextUrl.searchParams.get("hub.mode")
    const token = req.nextUrl.searchParams.get("hub.verify_token")
    const challenge = req.nextUrl.searchParams.get("hub.challenge")

    try {
        if (mode && token) {
            // Check if the mode and token sent are correct
            if (mode === "subscribe" && token === verify_token) {
                console.log("Whats the token? IF", token)
                console.log(
                    "Whats the verify_token? IF",
                    process.env.WHATSAPP_VERIFY_TOKEN
                )

                // Respond with 200 OK and send challenge token from the request
                return NextResponse.json(challenge, { status: 200, statusText: "OK" })
            } else {
                console.log("Whats the token? ELSE", token)
                // Responds with '403 Forbidden' if verify tokens do not match
                return NextResponse.json({
                    error: "Forbidden - Token or Mode did not match",
                    status: 403,
                })
            }
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: "Not found" }, { status: 404 })
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    //? send the response as a WhatsApp message back to the user
    function sendWhatsappMessage(body: any) {
        const value = body.entry[0].changes[0].value
        const phone_number_id = value.metadata.phone_number_id
        const from_number = value.messages[0].from
        const user_text = value.messages[0].text.body
        console.log(from_number, user_text)

        fetch(
            `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}/${phone_number_id}/messages`,
            {
                method: "POST",
                body: JSON.stringify({
                    messaging_product: "whatsapp",
                    to: from_number,
                    text: { body: `Mensagem recebida: ${user_text}` },
                }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${whatsapp_access_token}`,
                },
            }
        )
    }

    //? handle WhatsApp messages of different type
    function handleWhatsappMessage(body: any) {
        const message = body.entry[0].changes[0].value.messages[0]
        // let message_body;
        if (message.type === "text") {
            // message_body = message.text.body
            sendWhatsappMessage(body)
        } else if (message.type === "audio") {
            console.log("Audio type messages are not implemented yet.")

            // const audio_id = message["audio"]["id"]
            // message_body = handleAudioMessage(audio_id)
        } else {
            console.log("Any other type of message here. Not implemented")
        }
    }

    //? handle incoming webhook messages
    try {
        const body = await new Response(req.body).json()
        console.log("What inside data? ", body)

        if (body.object) {
            if (
                body.entry[0] &&
                body.entry[0].changes[0] &&
                body.entry[0].changes[0].value &&
                body.entry[0].changes[0].value.messages &&
                body.entry[0].changes[0].value.messages[0]
            ) {
                handleWhatsappMessage(body)
            }

            return NextResponse.json("Success", { status: 200 })
        } else {
            // if the request is not a WhatsApp API event, return an error
            return NextResponse.json({
                status: 404,
                statusText: "Not a WhatsApp API event",
            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            statusText: `Unkown error: ${error}`,
        })
    }
}
