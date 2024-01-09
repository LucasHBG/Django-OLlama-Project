"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import { toast } from "react-hot-toast"

import { ChatWindowMessage } from "@/types/chat-window-message"

import { Button } from "../ui/button"
import { ChatMessageBubble } from "./chat-message-bubble"

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

    const choosePDFComponent = (
        <>
            <div className="flex max-h-[85%] flex-col overflow-hidden rounded p-4 md:p-8">
                <h1 className="mb-2 ml-auto mr-auto text-3xl md:text-4xl">
                    🏠 Fully Client-Side Chat Over Documents 🏠
                </h1>
                <h3 className="mb-4 ml-auto mr-auto text-xl">
                    <a target="_blank" href="https://github.com/tantaraio/voy">
                        🦀 Voy
                    </a>{" "}
                    +{" "}
                    <a target="_blank" href="https://ollama.ai/">
                        🦙 Ollama
                    </a>{" "}
                    +{" "}
                    <a target="_blank" href="https://js.langchain.com">
                        🦜🔗 LangChain.js
                    </a>{" "}
                    +{" "}
                    <a
                        target="_blank"
                        href="https://huggingface.co/docs/transformers.js/index"
                    >
                        🤗 Transformers.js
                    </a>
                </h3>
                <ul>
                    <li className="text-l">
                        🏡
                        <span className="ml-2">
                            Yes, it&apos;s another chat over documents
                            implementation... but this one is entirely local!
                        </span>
                    </li>
                    <li className="text-l hidden md:block">
                        🌐
                        <span className="ml-2">
                            The vector store (
                            <a
                                target="_blank"
                                href="https://github.com/tantaraio/voy"
                            >
                                Voy
                            </a>
                            ) and embeddings (
                            <a
                                target="_blank"
                                href="https://huggingface.co/docs/transformers.js/index"
                            >
                                Transformers.js
                            </a>
                            ) are served via Vercel Edge function and run fully
                            in the browser with no setup required.
                        </span>
                    </li>
                    <li>
                        ⚙️
                        <span className="ml-2">
                            The default LLM is Llama 2 run locally by Ollama.
                            You&apos;ll need to install{" "}
                            <a target="_blank" href="https://ollama.ai">
                                the Ollama desktop app
                            </a>{" "}
                            and run the following commands to give this site
                            access to the locally running model:
                            <br />
                            <pre className="my-2 inline-flex rounded px-2 py-1 text-sm 2xl:text-base">
                                $
                                OLLAMA_ORIGINS=https://west-chat-company.vercel.app
                                OLLAMA_HOST=127.0.0.1:11435 ollama serve
                            </pre>
                            <br />
                            If you're running locally, use:
                            <br />
                            <pre className="my-2 inline-flex rounded px-2 py-1 text-sm 2xl:text-base">
                                $
                                OLLAMA_ORIGINS=http://localhost:3000/auth/pdf-upload
                                OLLAMA_HOST=127.0.0.1:11435 ollama serve
                            </pre>
                            <br />
                            Then, in another window:
                            <br />
                            <pre className="my-2 inline-flex rounded px-2 py-1 text-sm 2xl:text-base">
                                $ OLLAMA_HOST=127.0.0.1:11435 ollama pull
                                mistral
                            </pre>
                        </span>
                    </li>
                    <li className="text-l hidden md:block">
                        🦜
                        <span className="ml-2">
                            <a target="_blank" href="https://js.langchain.com">
                                LangChain.js
                            </a>{" "}
                            handles orchestration and ties everything together!
                        </span>
                    </li>
                    <li className="text-l">
                        🐙
                        <span className="ml-2">
                            This template is open source - you can see the
                            source code and deploy your own version{" "}
                            <a
                                href="https://github.com/jacoblee93/fully-local-pdf-chatbot"
                                target="_blank"
                            >
                                from the GitHub repo
                            </a>
                            !
                        </span>
                    </li>
                    <li className="text-l">
                        👇
                        <span className="ml-2">
                            Try embedding a PDF below, then asking questions!
                            You can even turn off your WiFi.
                        </span>
                    </li>
                </ul>
            </div>
            <form
                onSubmit={embedPDF}
                className="mt-4 flex w-full items-center justify-between"
            >
                <input
                    id="file_input"
                    type="file"
                    accept="pdf"
                    className="text-white"
                    onChange={(e) =>
                        e.target.files
                            ? setSelectedPDF(e.target.files[0])
                            : null
                    }
                ></input>
                <Button type="submit">
                    {isLoading && (
                        <div role="status" className={`flex justify-center`}>
                            <svg
                                aria-hidden="true"
                                className="h-6 w-6 animate-spin fill-sky-800 text-white dark:text-white"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    )}
                    <span className={isLoading ? "hidden" : ""}>Embed</span>
                </Button>
            </form>
        </>
    )

    const chatInterfaceComponent = (
        <>
            <div className="mb-4 flex w-full grow flex-col-reverse overflow-auto">
                {messages.length > 0
                    ? [...messages]
                          .reverse()
                          .map((msg, i) => (
                              <ChatMessageBubble
                                  key={i}
                                  message={msg}
                              ></ChatMessageBubble>
                          ))
                    : ""}
            </div>

            <form onSubmit={sendMessage} className="flex w-full flex-col">
                <div className="mt-4 flex w-full">
                    <input
                        className="mr-8 grow rounded p-4"
                        value={input}
                        placeholder={
                            placeholder ?? "Quais são os itens mais baratos?"
                        }
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <Button
                        type="submit"
                        className="w-28 shrink-0 rounded bg-sky-600 px-8 py-4"
                    >
                        {isLoading && (
                            <div
                                role="status"
                                className={`flex justify-center`}
                            >
                                <svg
                                    aria-hidden="true"
                                    className="h-6 w-6 animate-spin fill-sky-800 text-white dark:text-white"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        )}
                        {!isLoading && <span>Send</span>}
                    </Button>
                </div>
            </form>
        </>
    )

    return (
        <div
            className={`flex grow flex-col items-center overflow-hidden rounded p-4 md:p-8 ${
                readyToChat ? "border" : ""
            }`}
        >
            {readyToChat && <h2 className={`text-2xl`}>{titleText}</h2>}
            {readyToChat ? chatInterfaceComponent : choosePDFComponent}
        </div>
    )
}
