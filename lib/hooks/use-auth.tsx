import { useCallback } from "react"
import { useRouter } from "next/navigation"
import { routeDashboard } from "@/utils/client-routes"

import axios from "../axios"

export type UserLogin = { email: string; password: string }

export const useAuth = () => {
    const router = useRouter()

    const login = useCallback(async (formData: UserLogin) => {
        try {
            const response = await axios.post("api/login", formData)

            return response
        } catch (error) {
            console.log("Erro ao logar: ", error)
        }

        // await fetch("api/login", {
        //     method: "POST",
        //     headers: {
        //         'Content-type': 'application/json',
        //     },
        //     body: JSON.stringify(formData),
        // }).then((res) => console.log("Resultado req use-auth: ", res))
    }, [])

    return {
        login,
    }
}
