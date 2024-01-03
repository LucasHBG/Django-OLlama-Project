import { apiURL } from "@/utils/server-routes"
import Axios, { AxiosError, AxiosResponse } from "axios"

const axios = Axios.create({
    baseURL: apiURL,
    headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
    },
})

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
