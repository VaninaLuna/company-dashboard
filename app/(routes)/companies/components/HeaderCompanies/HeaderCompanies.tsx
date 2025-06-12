"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import FormCreateCustomer from "../FormCreateCustomer/FormCreateCustomer";

export function HeaderCompanies() {
    const [openModalCreate, openModalCreateSet] = useState(false);
    return (
        <div className="flex items-center justify-between">
            <h2 className="text-2xl">Lista de Compañias</h2>
            <Dialog open={openModalCreate} onOpenChange={openModalCreateSet}>
                <DialogTrigger asChild>
                    <Button>
                        <CirclePlus className="mr-2" />
                        Crear Compañia
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                        <DialogTitle>Crear CLiente</DialogTitle>
                        <DialogDescription>
                            Completa el formulario para crear un nueva cliente.
                        </DialogDescription>
                    </DialogHeader>

                    <FormCreateCustomer setOpenModalCreate={openModalCreateSet} />
                </DialogContent>
            </Dialog>
        </div>
    )
}
