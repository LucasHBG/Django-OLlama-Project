import { atom, useAtom } from "jotai"
import { ChatModel, chats } from "../mocks/chats-data"

type Config = {
  selected: ChatModel["id"] | null
}

const configAtom = atom<Config>({
  selected: chats[0].id,
})

export function useChat() {
  return useAtom(configAtom)
}