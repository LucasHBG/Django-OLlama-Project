"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import { toast } from "react-hot-toast"

import { ChatWindowMessage } from "@/types/chat-window-message"

import { ChatInterfaceComponent } from "./chat-interface"
import { ChoosePDFComponent } from "./choose-pdf"

type Props = {
    placeholder?: string
    titleText?: string
}

export function ChatWindow(props: Props) {
    const { placeholder, titleText = "An LLM" } = props

    const [messages, setMessages] = useState<ChatWindowMessage[]>([])
    const [input, setInput] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [selectedPDF, setSelectedPDF] = useState<File | null>(null)
    const [readyToChat, setReadyToChat] = useState(false)

    // Worker is a web api that runs in the background
    const worker = useRef<Worker | null>(null)

    async function queryStore(messages: ChatWindowMessage[]) {
        if (!worker.current) {
            throw new Error("Worker is not ready")
        }

        return new ReadableStream({
            start(controller) {
                // Wont start the ReadableStream if the worker is not ready
                if (!worker.current) {
                    controller.close()
                    return
                }
                worker.current?.postMessage({ messages })

                const onMessageReceived = (e: any) => {
                    switch (e.data.type) {
                        case "log":
                            console.log(e.data)
                            break

                        case "chunk":
                            controller.enqueue(e.data.data)
                            break

                        case "error":
                            worker.current?.removeEventListener(
                                "message",
                                onMessageReceived
                            )
                            console.log(e.data.error)
                            const error = new Error(e.data.error)
                            controller.error(error)
                            break

                        case "complete":
                            worker.current?.removeEventListener(
                                "message",
                                onMessageReceived
                            )
                            controller.close()
                            break
                    }
                }

                worker.current?.addEventListener("message", onMessageReceived)
            },
        })
    }

    async function sendMessage(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        if (isLoading || !input) return

        const initialInput = input
        const initialMessages = [...messages]
        const newMessages = [
            ...initialMessages,
            { role: "human" as const, content: input },
        ]

        setMessages(newMessages)
        setIsLoading(true)
        setInput("")

        try {
            const stream = await queryStore(newMessages)
            const reader = stream.getReader()

            let chunk = await reader.read()

            const aiResponseMessage: ChatWindowMessage = {
                content: "",
                role: "ai" as const,
            }

            setMessages([...newMessages, aiResponseMessage])

            while (!chunk.done) {
                aiResponseMessage.content =
                    aiResponseMessage.content + chunk.value
                setMessages([...newMessages, aiResponseMessage])
                chunk = await reader.read()
            }

            setIsLoading(false)
        } catch (e: any) {
            setMessages(initialMessages)
            setIsLoading(false)
            setInput(initialInput)
            toast.error(
                `Ocorreu um erro ao adicionar seu PDF na fila: ${e.message}`
            )
        }
    }

    // We use the `useEffect` hook to set up the worker as soon as the `App` component is mounted.
    useEffect(() => {
        if (!worker.current) {
            // Create the worker if it does not yet exist.
            worker.current = new Worker(
                new URL("../../lib/worker.ts", import.meta.url),
                {
                    type: "module",
                }
            )
            setIsLoading(false)
        }
    }, [])

    async function embedPDF(e: FormEvent<HTMLFormElement>) {
        console.log(e)
        console.log(selectedPDF)
        e.preventDefault()
        // const reader = new FileReader();
        if (selectedPDF === null) {
            toast(`Você precisa selecionar um arquivo para embutir.`)
            return
        }
        setIsLoading(true)
        worker.current?.postMessage({ pdf: selectedPDF })
        const onMessageReceived = (e: any) => {
            switch (e.data.type) {
                case "log":
                    console.log(e.data)
                    break
                case "error":
                    worker.current?.removeEventListener(
                        "message",
                        onMessageReceived
                    )
                    setIsLoading(false)
                    console.log(e.data.error)
                    toast.error(
                        `Ocorreu um erro ao incorporar(embedding) seu PDF: ${e.data.error}`
                    )
                    break
                case "complete":
                    worker.current?.removeEventListener(
                        "message",
                        onMessageReceived
                    )
                    setIsLoading(false)
                    setReadyToChat(true)
                    toast.success(
                        `Incorporação feita c/ sucesso! Já pode fazer perguntas sobre seu PDF.`
                    )
                    break
            }
        }
        worker.current?.addEventListener("message", onMessageReceived)
    }

    return (
        <div
            className={`container flex grow flex-col items-center overflow-hidden rounded ${
                readyToChat ? "border" : ""
            }`}
        >
            {readyToChat && <h2 className={`text-2xl`}>🌎 {titleText}</h2>}
            {readyToChat ? (
                <ChatInterfaceComponent
                    isLoading={isLoading}
                    messages={messages}
                    sendMessage={sendMessage}
                    placeholder={placeholder}
                    input={input}
                    setInput={setInput}
                />
            ) : (
                <ChoosePDFComponent
                    isLoading={isLoading}
                    setSelectedPDF={setSelectedPDF}
                    embedPDF={embedPDF}
                />
            )}
        </div>
    )
}
