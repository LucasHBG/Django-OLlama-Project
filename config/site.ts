export type SiteConfig = typeof siteConfig

export const siteConfig = {
    name: "West Chat",
    description:
        "Fast and precise communication is key for your client. Don't lose a potential lead. West Side Company is what you're looking for.",
    mainNavAuthenticated: [
        {
            title: "Home",
            href: "/auth/dashboard",
        },
        {
            title: "Analytics",
            href: "/auth/analytics",
        }
    ],
    mainNavGuest: [
        {
            title: "Who we are",
            href: "/",
        },
        {
            title: "Privacy Policy",
            href: "/privacy-policy",
        },
        {
            title: "Terms and Conditions",
            href: "/terms-and-conditions",
        },
    ],
    links: {
        whatsapp: "https://wa.me/5562982560169",
        email: "mailto:westsidecompany@gmail.com",
        instagram: "https://www.instagram.com/wscompany/",
    },
}
