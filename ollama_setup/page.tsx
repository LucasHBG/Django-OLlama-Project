import { ChatWindow } from "@/components/pdf-upload/chat-window"

export default function Home() {
    return (
        <ChatWindow
            titleText="Converse sobre sobre o seu PDF"
            placeholder="O que está escrito neste documento?"
        ></ChatWindow>
    )
}
