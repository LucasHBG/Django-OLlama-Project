import { atom, useAtom } from "jotai"
import { Chat, chats } from "../mocks/chats-data"

type Config = {
  selected: Chat["id"] | null
}

const configAtom = atom<Config>({
  selected: chats[0].id,
})

export function useChat() {
  return useAtom(configAtom)
}