"use client"

import { FooterCompanyProps } from "./FooterCompany.types";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";



export default function FooterCompany(props: FooterCompanyProps) {
    const { companyId } = props
    const router = useRouter()

    const onDeleteCompany = async () => {
        try {
            await axios.delete(`/api/company/${companyId}`)
            alert("Compañia eliminada correctamente")
            router.push("/companies")

        } catch (error) {
            alert("Algo salio mal" + error)
        }
    }

    return (
        <div className="flex justify-end mt-5">
            <Button variant="destructive" onClick={onDeleteCompany}>
                <Trash className="w-4 h-4 mr-2" />
                Eliminar compañia
            </Button>
        </div>
    )
}
