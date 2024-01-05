import type { Metadata, Viewport } from "next"

import "@/styles/globals.css"

import { QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/lib/fonts"
import queryClientConfig from "@/lib/query-client-config"
import { cn } from "@/lib/utils"
import SiteFooter from "@/components/site-footer"
import { SiteHeaderAuthenticated } from "@/components/site-header-authenticated"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
    title: {
        default: siteConfig.name,
        template: `%s - ${siteConfig.name}`,
    },
    description: siteConfig.description,
    icons: {
        icon: "../favicon.ico",
        shortcut: "../favicon-32x32.png",
        apple: "../apple-touch-icon.png",
    },
}

export const viewport: Viewport = {
    themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f9f9f9" }],
}

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head />
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable
                )}
            >
                <Toaster />
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    {/* React Query Provider always on top */}
                    <QueryClientProvider client={queryClientConfig}>
                        <div className="relative flex min-h-screen flex-col">
                            <SiteHeaderAuthenticated />
                            <div className="flex-1">{children}</div>
                            <SiteFooter />
                        </div>
                        <TailwindIndicator />
                    </QueryClientProvider>
                </ThemeProvider>
            </body>
        </html>
    )
}
