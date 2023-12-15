import Link from "next/link"

import { siteConfig } from "@/config/site"

import { IconEmail, IconInstagram, IconLogo, IconWhatsApp } from "./icons"
import { buttonVariants } from "./ui/button"

export default function SiteFooter() {
    return (
        <footer className="container  flex flex-col z-40 sm:flex-row h-auto sm:h-16 space-y-4 sm:space-y-0 py-4 sm:py-0 justify-between items-center border-t px-4 md:px-6 bg-background">
            <div className="flex space-x-4 items-center">
                <Link href="/" className="flex items-center space-x-2">
                    <IconLogo className="h-6 w-6" />
                    <span className="inline-block font-bold">
                        {siteConfig.name}
                    </span>
                </Link>
            </div>

            <nav className="flex space-x-4 items-center">
                <Link
                    href={siteConfig.links.whatsapp}
                    target="_blank"
                    title="WhatsApp"
                    rel="noreferrer"
                >
                    <div
                        className={buttonVariants({
                            size: "icon",
                            variant: "ghost",
                        })}
                    >
                        <IconWhatsApp className="h-5 w-5" />
                        <span className="sr-only">WhatsApp</span>
                    </div>
                </Link>
                <Link
                    href="#"
                    // href={siteConfig.links.instagram}
                    target="_blank"
                    title="Instagram"
                    rel="noreferrer"
                >
                    <div
                        className={buttonVariants({
                            size: "icon",
                            variant: "ghost",
                        })}
                    >
                        <IconInstagram className="h-5 w-5" />
                        <span className="sr-only">Instagram</span>
                    </div>
                </Link>
                <Link
                    href="#"
                    // href={siteConfig.links.email}
                    target="_blank"
                    title="E-mail"
                    rel="noreferrer"
                >
                    <div
                        className={buttonVariants({
                            size: "icon",
                            variant: "ghost",
                        })}
                    >
                        <IconEmail className="h-6 w-6" />
                        <span className="sr-only">E-mail</span>
                    </div>
                </Link>
            </nav>
            <p className="text-xs sm:text-sm text-[#9ca3af]">
                © 2023 West Side Company
            </p>
        </footer>
    )
}
