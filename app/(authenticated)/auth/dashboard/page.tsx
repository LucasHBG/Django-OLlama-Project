"use client"

import { Button } from "@/components/ui/button"

export default function DashboardPage() {
    return (
        <main className="container space-y-4 p-10">
            <h2 className="text-lg font-medium">
                Aqui você visualiza as conversas do seu WhatsApp
            </h2>

            <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                Você pode escolher a data de início e fim para filtrar as
                conversas.
            </p>

            <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                Logo abaixo sairá o resultado da pergunta no WhatsApp:
            </p>

            <Button
                onClick={() => {
                    fetch(
                        `https://graph.facebook.com/${process.env.WHATSAPP_API_VERSION}/108612608761986/messages`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${process.env.WHATSAPP_ACCESS_TOKEN}`,
                            },
                            body: JSON.stringify({
                                messaging_product: "whatsapp",
                                preview_url: false,
                                recipient_type: "individual",
                                to: "5562982560169",
                                type: "text",
                                text: {
                                    body: "Olá, tudo bem?",
                                },
                            }),
                        }
                    )
                }}
            >
                Enviar pergunta para WhatsApp
            </Button>
        </main>
    )
}
