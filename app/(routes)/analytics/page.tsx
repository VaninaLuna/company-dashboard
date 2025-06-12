import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"
import CompaniesChart from "./components/CompaniesChart/CompaniesChart"

export default async function page() {
    const { userId } = await auth()

    if (!userId) {
        return redirect("/")
    }

    const companies = await db.company.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "desc"
        }
    })

    const events = await db.event.findMany({
        orderBy: {
            createdAt: "desc"
        }
    })

    return (
        <div className="p-4 bg-background shadow-md rounded-lg">
            <h2 className="text-2xl mb-4">Pagina de analiticas</h2>
            <div>
                <CompaniesChart companies={companies} events={events} />
            </div>
        </div>
    )
}
