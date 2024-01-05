import { ChatWindow } from "@/components/pdf-upload/chat-window"

export default function Home() {
    return (
        <ChatWindow
            emoji="🏠"
            titleText="Fully Client-Side Chat Over Documents"
            placeholder="Try asking something about the document you just uploaded!"
        ></ChatWindow>
    )
}
