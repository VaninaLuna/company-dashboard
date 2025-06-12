"use client"
import { Pencil, ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Company } from "@/lib/generated/prisma"

import {
    ColumnDef,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link
    from "next/link"
import Image from "next/image"




export const columns: ColumnDef<Company>[] = [
    {
        accessorKey: "profile",
        header: "Profile",
        cell: ({ row }) => {
            const image = row.getValue("profile")
            return (
                <div className="px-3">
                    <Image src={typeof image === "string" ? image : "/images/company-icon.png"} width={40} height={40} alt="Image" className="h-auto w-auto" />
                </div>
            )
        }
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Nombre de la Compañia
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "cif",
        header: "CIF",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "country",
        header: "Country",
    },
    {
        accessorKey: "website",
        header: "Website",
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const { id } = row.original
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                            <Link href={`/companies/${id}`}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Editar
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    }
]