import { redirect } from "next/navigation"
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default async function ListCompanies() {
    const { userId } = await auth();
    if (!userId) {
        redirect("/");
    }
    const companies = await db.company.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    console.log("companies", companies);
    return (
        <DataTable columns={columns} data={companies} />
    )
}
