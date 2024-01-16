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
                        "https://graph.facebook.com/v18.0/108612608761986/messages",
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                                Authorization:
                                    "Bearer EABrPDcsE8h8BO2QvL71znjuhTM0X3HvyV7JEctBnyIS7QkVMqm9WmY0VTIIZBNybWvSovm1MvxZB0N8v5cwiiLo1IkMb5cfGbwyQvKyZBvWNbYfRefy69xZBLVHLHqR1zWihqfzkJBOnCCwwDQ5MORrVopUF3Umsj1MUZBBjGcNJOyvXCyWIbrZArXZBi0iCCumHwkB8G4OsxxZBpgxNXcwZD",
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
