export default function DashboardPage() {
    return (
        <main className="container p-10 space-y-4">
            <h2 className="text-lg font-medium">
                Aqui você visualiza as conversas do seu WhatsApp
            </h2>

            <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                Você pode escolher a data de início e fim para filtrar as
                conversas.
            </p>

            <p className="text-sm font-normal text-gray-700 dark:text-gray-400">
                Logo abaixo sairá o resultado da pergunta no WhatsApp:
            </p>
        </main>
    )
}
