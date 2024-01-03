import Cookies from "js-cookie"

import { wscAuthCookie } from "./cookies"
import { apiURL } from "./server-routes"
import { routeLogin } from "./client-routes"

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

async function client(
    props: RequestType,
    headers: {
        "Content-Type": "application/json"
    },
    { data, headers: customHeaders, ...customConfig }: any
) {
    const token = Cookies.get(wscAuthCookie)

    const config = {
        body: props.method !== "GET" ? JSON.stringify(data) : undefined,
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            headers,
            ...customHeaders,
        },
        ...customConfig,
    }

    return window
        .fetch(`${apiURL}/${props.endpoint}`, config)
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
