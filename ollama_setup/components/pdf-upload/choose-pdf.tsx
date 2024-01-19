import { Dispatch, FormEventHandler, SetStateAction } from "react"

import { Button } from "../ui/button"
import { IconCog6 } from "../icons"

type Props = {
    isLoading: boolean
    setSelectedPDF: Dispatch<SetStateAction<File | null>>
    embedPDF: FormEventHandler<HTMLFormElement>
}

export function ChoosePDFComponent(props: Props) {
    const { isLoading, setSelectedPDF, embedPDF } = props

    return (
        <>
            <div className="my-4 flex max-h-[85%] flex-col overflow-hidden rounded">
                <h1 className="mb-2 ml-auto mr-auto text-xl sm:text-3xl lg:text-4xl">
                    🏠 Fully Client-Side Chat Over Documents 🏠
                </h1>
                <h2 className="mb-4 ml-auto mr-auto text-base lg:text-xl">
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
                </h2>
                <ul>
                    <li className="text-l">
                        🏡
                        <span className="ml-2 text-sm lg:text-base">
                            Yes, it&apos;s another chat over documents
                            implementation... but this one is entirely local!
                        </span>
                    </li>
                    <li className="text-l hidden md:block">
                        🌐
                        <span className="ml-2 text-sm lg:text-base">
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
                    <li className="text-sm lg:text-base inline-flex">
                        <IconCog6/>
                        <span className="ml-2 text-sm lg:text-base">
                            The default LLM is Llama 2 run locally by Ollama.
                            You&apos;ll need to install{" "}
                            <a target="_blank" href="https://ollama.ai">
                                the Ollama desktop app
                            </a>{" "}
                            and run the following commands to give this site
                            access to the locally running model:
                            <br />
                            <pre className="my-2 inline-flex whitespace-pre-wrap break-words rounded px-2 py-1 text-sm 2xl:text-base">
                                $
                                OLLAMA_ORIGINS=https://west-chat-company.vercel.app
                                OLLAMA_HOST=127.0.0.1:11435 ollama serve
                            </pre>
                            <br />
                            If you're running locally, use:
                            <br />
                            <pre className="my-2 inline-flex whitespace-pre-wrap break-words rounded px-2 py-1 text-sm 2xl:text-base">
                                $
                                OLLAMA_ORIGINS=http://localhost:3000/auth/pdf-upload
                                OLLAMA_HOST=127.0.0.1:11435 ollama serve
                            </pre>
                            <br />
                            Then, in another window:
                            <br />
                            <pre className="my-2 inline-flex whitespace-pre-wrap break-words rounded px-2 py-1 text-sm 2xl:text-base">
                                $ OLLAMA_HOST=127.0.0.1:11435 ollama pull
                                mistral
                            </pre>
                        </span>
                    </li>
                    <li className="text-l hidden md:block">
                        🦜
                        <span className="ml-2 text-sm lg:text-base">
                            <a target="_blank" href="https://js.langchain.com">
                                LangChain.js
                            </a>{" "}
                            handles orchestration and ties everything together!
                        </span>
                    </li>
                    <li className="text-l">
                        🐙
                        <span className="ml-2 text-sm lg:text-base">
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
                        <span className="ml-2 text-sm lg:text-base">
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
                    {!isLoading && <span>Embed</span>}
                </Button>
            </form>
        </>
    )
}
