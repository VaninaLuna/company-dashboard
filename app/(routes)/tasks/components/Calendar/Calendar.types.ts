import { Company, Event } from "@/lib/generated/prisma"

export type CalendarProps = ({
    companies: Company[],
    events: Event[]
})