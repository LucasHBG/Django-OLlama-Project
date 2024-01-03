import { useCallback } from "react"
import { redirect, useRouter } from "next/navigation"
import { routeDashboard } from "@/utils/client-routes"

import axios from "../axios"

export type UserLogin = { email: string; password: string }

export const useAuth = () => {
    const router = useRouter()

    const login = useCallback(async (formData: UserLogin) => {

        await axios
            .post("api/login", formData)
            .then((res) => console.log("Resultado req use-auth: ", res))

        // await fetch("api/login", {
        //     method: "POST",
        //     headers: {
        //         'Content-type': 'application/json',
        //     },
        //     body: JSON.stringify(formData),
        // }).then((res) => console.log("Resultado req use-auth: ", res))

        redirect(routeDashboard)
    }, [])

    return {
        login,
    }
}
