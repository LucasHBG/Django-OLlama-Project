import { NextApiRequest, NextApiResponse } from "next"
import { wscAuthCookie } from "@/utils/cookies"
import Cookies from "js-cookie"

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === "POST") {
        const username = req.body["username"]
        const password = req.body["password"]

        Cookies.set(
            wscAuthCookie,
            `{username:${username},password:${password},token:12345}`
        )

        return res.status(200).json({ status: 'Logado com sucesso' })
    }
   
    return res.status(400).json({ status: 'Não foi possível logar' })
}
