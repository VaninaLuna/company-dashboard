import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { eventId: string } }) {
    try {
        const { userId } = await auth()

        if (!userId) {
            return new NextResponse("Sin autorizacion", { status: 401 })
        }

        const deletedEvent = await db.event.delete({
            where: {
                id: params.eventId
            }
        })

        return NextResponse.json(deletedEvent)
    } catch (error) {
        console.log("[DELETE_EVENT]", error)
        return new NextResponse("Error interno 500", { status: 500 })
    }
}