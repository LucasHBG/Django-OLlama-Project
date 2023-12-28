import Cookies from "js-cookie"

import { wscAuthCookie } from "./cookies"
import { apiURL } from "./server-routes"
import { routeLogin } from "./client-routes"

type ClientProp = {
    body: string
    customConfig: {}
}

function client(
    endpoint: string,
    { data, headers: customHeaders, ...customConfig }: any
) {
    const token = Cookies.get(wscAuthCookie)

    const config = {
        method: data ? "POST" : "GET",
        body: data ? JSON.stringify(data) : undefined,
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            "Content-Type": data ? "application/json" : undefined,
            ...customHeaders,
        },
        ...customConfig,
    }

    return window
        .fetch(`${apiURL}/${endpoint}`, config)
        .then(async (response) => {
            if (response.status === 401) {
                // queryCache.clear()
                // await logout()
                console.log("Logging out user");
                
                // refresh the page for them
                window.location.assign(new URL(routeLogin))
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
