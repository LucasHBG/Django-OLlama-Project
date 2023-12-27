import { auth } from "@/auth"
import LoginForm from "@/components/login-form"
import { redirect } from "next/navigation"

export default async function LoginPage() {
    const session = await auth()
    // redirect to home if user is already logged in
    if (session?.user) {
        redirect("/")
    }

    return (
        <main className="flex min-h-screen items-start justify-center bg-gradient-to-b from-white to-gray-900 px-4 pb-8 pt-6 dark:from-gray-900 dark:to-white md:py-10">
            <LoginForm />
        </main>
    )
}
