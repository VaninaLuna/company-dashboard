import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { companyId: string } }) {
    try {
        const { userId } = await auth()
        const data = await req.json()

        if (!userId) {
            return new NextResponse("sin audorozacion", { status: 401 })
        }
        const company = await db.company.findUnique({
            where: {
                id: params.companyId,
            },
        });

        if (!company) {
            return new NextResponse("company no encontrada", { status: 404 })
        }

        const contact = await db.contact.create({
            data: {
                ...data,
                companyId: params.companyId,
            }
        })

        console.log(contact)
        return NextResponse.json(contact)

    } catch (error) {
        console.log("[CONTACT]", error)
        return new NextResponse("Internal Error", { status: 500 })
    }

}