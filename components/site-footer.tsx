import Link from "next/link"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"

import { IconEmail, IconInstagram, IconLogo, IconWhatsApp } from "./icons"
import { buttonVariants } from "./ui/button"

export default function SiteFooter() {
    return (
        <footer className="z-40 w-full border-t bg-background">
            <div className="container flex h-auto flex-col items-center justify-between space-y-4 px-4 py-4 sm:h-16 sm:flex-row sm:space-y-0 sm:py-0 md:px-6">
                <div className="flex items-center space-x-4">
                    <Link href="/" className="flex items-center space-x-2">
                        <IconLogo className="h-6 w-6" />
                        <span className="inline-block font-bold">
                            {siteConfig.name}
                        </span>
                    </Link>
                </div>

                {/* Footer layout for medium to large devices*/}
                <nav className="hidden items-center space-x-4 md:flex">
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
                    <Link
                        href="/privacy-policy"
                        target="_blank"
                        title="E-mail"
                        rel="noreferrer"
                        className={cn(
                            "flex items-center text-sm font-medium text-muted-foreground hover:text-black hover:dark:text-white"
                        )}
                    >
                        Política de Privacidade
                    </Link>
                    <Link
                        href="/terms-and-conditions"
                        target="_blank"
                        title="E-mail"
                        rel="noreferrer"
                        className={cn(
                            "flex items-center text-sm font-medium text-muted-foreground hover:text-black hover:dark:text-white"
                        )}
                    >
                        Termos e Condições
                    </Link>
                </nav>

                {/* Footer layout for small devices*/}
                <nav className="flex flex-col items-center md:hidden space-y-4 my-2">
                    <div className="flex items-center">
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
                    </div>
                    <div className="flex text-center items-center space-x-4">
                        <Link
                            href="/privacy-policy"
                            target="_blank"
                            title="E-mail"
                            rel="noreferrer"
                            className={cn(
                                "flex items-center text-xs font-medium text-muted-foreground hover:text-black hover:dark:text-white md:text-sm"
                            )}
                        >
                            Política de Privacidade
                        </Link>
                        <Link
                            href="/terms-and-conditions"
                            target="_blank"
                            title="E-mail"
                            rel="noreferrer"
                            className={cn(
                                "flex items-center text-xs font-medium text-muted-foreground hover:text-black hover:dark:text-white md:text-sm"
                            )}
                        >
                            Termos e Condições
                        </Link>
                    </div>
                </nav>
                <p className="text-xs text-[#9ca3af] sm:text-sm">
                    © 2023 West Side Company
                </p>
            </div>
        </footer>
    )
}
