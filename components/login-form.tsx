"use client"

import { FormEvent } from "react"

import { useAuth } from "@/lib/hooks/use-auth"

import { IconGithub, IconGoogle } from "./icons"
import { Button } from "./ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"

export default function LoginForm() {
    const { login } = useAuth()

    async function submitLogin(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        const user_email = (
            document.getElementById("email") as HTMLInputElement
        ).value
        const user_password = (
            document.getElementById("password") as HTMLInputElement
        ).value

        login({ email: user_email, password: user_password }).then(
            (response) => {
                if (response?.status === 200) {
                    window.location.href = "/auth/dashboard"
                }
            }
        )
    }

    return (
        <form onSubmit={submitLogin} className="block lg:w-1/3">
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your account information below
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-6">
                        <Button variant="outline">
                            <IconGithub className="mr-2 h-4 w-4" />
                            Github
                        </Button>
                        <Button variant="outline">
                            <IconGoogle className="mr-2 h-4 w-4" />
                            Google
                        </Button>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-background px-2 text-muted-foreground">
                                Or continue with
                            </span>
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                            autoFocus
                            id="email"
                            name="email"
                            className="peer/email"
                            placeholder="admin@westside.com"
                            required
                            type="email"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            placeholder="***************"
                            className="peer/password"
                            minLength={6}
                            maxLength={512}
                            required
                            type="password"
                        />

                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">Continue</Button>
                </CardFooter>
            </Card>
        </form>
    )
}
