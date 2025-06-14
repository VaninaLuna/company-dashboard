
"use client"

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export default function Header() {
    const router = useRouter()

    return (
        <div className="flex items-center text-xl">
            <ArrowLeft className="mr-2 w-5 h-5 cursor-pointer" onClick={() => router.push("/companies")} />
            Editar Compañia
        </div>
    )
}
