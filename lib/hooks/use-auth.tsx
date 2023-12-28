import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { client } from "@/utils/api-client"
import { routeDashboard } from "@/utils/client-routes"

export type UserLogin = { email: string; password: string }

export const useAuth = () => {
    const router = useRouter()

    const login = useCallback(async (userLogin: UserLogin) => {
        // await fetch('',{ })

        client("api/login", {
            method: "POST",
            body: JSON.stringify(userLogin),
        })

        router.replace(routeDashboard)
    }, [])

    return {
        login,
    }
}
