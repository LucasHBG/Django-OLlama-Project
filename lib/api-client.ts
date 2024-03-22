
import { wscAuthCookie } from "./cookies"
import { apiURL } from "./server-routes"
import { routeLogin } from "./client-routes"
import { cookies } from "next/headers"

type ClientProp = {
    body: string
    customConfig: {}
}

type RequestType = GetRequestType | PostRequestType

type GetRequestType = {
    endpoint: string,
    method: "GET",
}

type PostRequestType = {
    endpoint: string,
    method: "POST" | "PUT",
    body: string,
}

async function client<B>(
    endpoint: string,
    method: "GET" | "POST" | "PUT",
    body: B,
    ) {
    const token = cookies().get(wscAuthCookie)?.value

    const config = {
        body: method !== "GET" ? JSON.stringify(body) : undefined,
        headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : undefined,
        }
    }

    return window
        .fetch(`${apiURL}/${endpoint}`, {})
        .then(async (response) => {
            if (response.status === 401) {
                // queryCache.clear()
                // await logout()
                console.log("Logging out user");
                
                // refresh the page for them
                window.location.assign(new URL("/dashboard/outside"))
                return Promise.reject({ message: "Please re-authenticate." })
            }
            if (response.ok) {
                response.json()
            } else {
                const errorMessage = await response.text()
                return Promise.reject(new Error(errorMessage))
            }
        })
}

export {
    client,
}
