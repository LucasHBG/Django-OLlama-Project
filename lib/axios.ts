import { wscAuthCookie } from "@/utils/cookies"
import { apiURL } from "@/utils/server-routes"
import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios"
import Cookies from "js-cookie"

const axios = Axios.create({
    baseURL: apiURL,
    headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
})

// O interceptador de chamadas http chama essa função em todas as requisições.
const setAuthorizationHeader = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = Cookies.get(wscAuthCookie)

    config.headers = config.headers ?? {}

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }

    return config
}

axios.interceptors.request.use(setAuthorizationHeader)

axios.interceptors.response.use(
    (response: AxiosResponse) => {
        return response
    },
    (error: AxiosError) => {
        if (error.response && error.response.status === 401) {
            // Handle unauthorized error, e.g. clear cookies and redirect to the login page
            // window.location.assign(new URL(routeLogin))
            // return Promise.reject({ message: "Please re-authenticate." })
        }

        return Promise.reject(error)
    }
)

export default axios

export const isAxiosError = Axios.isAxiosError
