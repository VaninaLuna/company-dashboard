import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { db } from "@/lib/db"
import Calendar from "./components/Calendar/Calendar"

export default async function TasksPage() {
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

    console.log(events)

    return (
        <div>
            <Calendar companies={companies} events={events} />
        </div>
    )
}
