import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { companyId: string } }) {
    try {
        const { userId } = await auth()
        const { companyId } = params
        const values = await req.json()

        if (!userId) {
            return new NextResponse("Sin autorizacion", { status: 401 })
        }

        const Company = await db.company.update({
            where: {
                id: companyId,
                userId,

            },
            data: {
                ...values,
            },
        });

        return NextResponse.json(Company);

    } catch (error) {
        console.log("[Company id]", error)
        return new NextResponse("error interno", { status: 500 })
    }
}

export async function DELETE(req: Request, { params }: { params: { companyId: string } }) {
    try {

        const { userId } = await auth()
        const { companyId } = params

        if (!userId) {
            return new NextResponse("Sin autorizacion", { status: 401 })
        }

        const deletedCompany = await db.company.delete({
            where: {
                id: companyId

            }
        })

        return NextResponse.json(deletedCompany);

    } catch (error) {
        console.log("[DELETE COMPANY ID]", error)
    }
}