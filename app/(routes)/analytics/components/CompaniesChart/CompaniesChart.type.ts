import { Company, Event } from "@/lib/generated/prisma"

export type CompaniesChartProps = {
    companies: Company[];
    events: Event[],
}