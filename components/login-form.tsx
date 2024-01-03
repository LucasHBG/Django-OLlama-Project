"use client"

import { FormEvent } from "react"

import { useAuth } from "@/lib/hooks/use-auth"

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
                if(response?.status === 200) {
                    window.location.href = "/auth/dashboard"
                }
            })
    }

    return (
        <form
            onSubmit={submitLogin}
            className="rounded-lg border bg-card text-card-foreground shadow-sm transition-colors duration-500 ease-in-out"
        >
            <div className="flex flex-col space-y-1.5 p-6">
                <h2 className="text-2xl font-semibold tracking-tight">Login</h2>
                <p className="text-sm text-muted-foreground">
                    Insira suas informações para ter acesso ao dashboard.
                </p>
            </div>
            <div className="space-y-4 p-6">
                <div className="space-y-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-base"
                        htmlFor="email"
                    >
                        E-mail
                    </label>
                    <input
                        autoFocus
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="email"
                        name="email"
                        placeholder="admin@westside.com"
                        required
                        type="email"
                    />
                </div>
                <div className="space-y-2">
                    <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sm:text-base"
                        htmlFor="password"
                    >
                        Senha
                    </label>
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id="password"
                        name="password"
                        placeholder="***************"
                        minLength={6}
                        maxLength={50}
                        required
                        type="password"
                    />
                </div>
            </div>
            <div className="flex items-center p-6">
                <button className="inline-flex h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 sm:text-base">
                    Entrar
                </button>
            </div>
        </form>
    )
}
