import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const personList = [
    {
        nameInitials: "OM",
        name: "Olivia Martin",
        email: "olivia.martin@email.com",
        bought: "$99.99",
    },
    {
        nameInitials: "JL",
        name: "Jackson Lee",
        email: "jackson.lee@email.com",
        bought: "$1,000.79",
    },
    {
        nameInitials: "IN",
        name: "Isabella Nguyen",
        email: "isabella.nguyen@email.com",
        bought: "$300.00",
    },
    {
        nameInitials: "WK",
        name: "William Knight",
        email: "wknightok@email.com",
        bought: "$191.00",
    },
    {
        nameInitials: "SB",
        name: "Serjão Berranteiro",
        email: "serjao_berranteiro@hotmail.com",
        bought: "$33.42",
    },
]

export function RecentSales() {
    return (
        <div className="space-y-8">
            {personList.map((person, index) => (
                <div key={index} className="group flex items-center">
                    <Avatar className="h-9 w-9 group-hover:border-2">
                        <AvatarImage src="/avatars/01.png" alt="Avatar" />
                        <AvatarFallback>{person.nameInitials}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {person.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {person.email}
                        </p>
                    </div>
                    <div className="ml-auto font-medium">+{person.bought}</div>
                </div>
            ))}
        </div>
    )
}
