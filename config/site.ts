export type SiteConfig = typeof siteConfig

export const siteConfig = {
    name: "West Chat",
    description:
        "Fast and precise communication is key for your client. Don't lose a potential lead. West Side Company is what you're looking for.",
    mainNavAuthenticated: [
        {
            title: "Início",
            href: "/auth/dashboard",
        },
        {
            title: "Carregar PDF",
            href: "/auth/pdf-upload",
        },
    ],
    mainNavGuest: [
        {
            title: "Quem somos",
            href: "/",
        },
        {
            title: "Login",
            href: "/login",
        },
    ],
    links: {
        whatsapp: "https://wa.me/5562982560169",
        email: "mailto:westsidecompany@gmail.com",
        instagram: "https://www.instagram.com/wscompany/",
    },
}
