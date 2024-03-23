import { cookies } from "next/headers"
import Image from "next/image"

import { chats } from "@/lib/mocks/chats-data"
import { Chat } from "@/components/chats/chat"

export default function MailPage() {
    const layout = cookies().get("react-resizable-panels:layout")
    const collapsed = cookies().get("react-resizable-panels:collapsed")

    const defaultLayout = layout ? JSON.parse(layout.value) : undefined
    let defaultCollapsed = null
    if (collapsed?.value !== undefined)
        defaultCollapsed = collapsed ? JSON.parse(collapsed.value) : false

    return (
        <div className="hidden flex-col md:flex">
            <Chat
                chats={chats}
                defaultLayout={defaultLayout}
                defaultCollapsed={defaultCollapsed}
                navCollapsedSize={4}
            />
        </div>
    )
}
