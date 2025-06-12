"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { CompanyFormProps } from "./CompanyForm.types"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Textarea } from "@/components/ui/textarea"
import { UploadButton } from "@uploadthing/react"
import { formSchema } from "./CompanyForm.form"
import { OurFileRouter } from "@/app/api/uploadthing/core"




export default function CompanyForm(props: CompanyFormProps) {
    const { company } = props
    const router = useRouter()
    const [photoUploaded, setPhotoUploaded] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: company.name,
            description: company.description,
            country: company.country ?? undefined,
            website: company.website ?? undefined,
            phone: company.phone ?? undefined,
            cif: company.cif,
            profile: company.profile ?? undefined
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`/api/company/${company.id}`, values)
            alert("Compañia actualizada")
            router.refresh()
        } catch {
            alert("Algo salio mal")
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-2 gap-3">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre de la compañia</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nombre de la compañia..." type="text" {...field} />
                                </FormControl>
                            </FormItem>)}
                    />

                    <FormField
                        control={form.control}
                        name="country"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Pais</FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                >
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccione pais" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="es">España</SelectItem>
                                        <SelectItem value="us">Estados Unidos</SelectItem>
                                        <SelectItem value="mx">México</SelectItem>
                                        <SelectItem value="ar">Argentina</SelectItem>
                                        <SelectItem value="co">Colombia</SelectItem>
                                        <SelectItem value="pe">Perú</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />

                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="website"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Sitio web</FormLabel>
                                <FormControl>
                                    <Input placeholder="www.vanidev.com" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Telefono</FormLabel>
                                <FormControl>
                                    <Input placeholder="+54 261654236" type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="cif"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>CIF / NIF</FormLabel>
                                <FormControl>
                                    <Input placeholder="B-123523" type="text" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="profile"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Logo Empresa</FormLabel>
                                <FormControl>
                                    <div>
                                        {photoUploaded ? (
                                            <p className="text-sm">Imagen subida con éxito</p>
                                        ) : (
                                            <UploadButton<OurFileRouter, "profile">
                                                endpoint="profile"
                                                className="bg-slate-600/20 text-slate-800 rounded-lg outline-dotted outline-3"
                                                onClientUploadComplete={(res) => {
                                                    const url = res?.[0]?.url
                                                    if (url) {
                                                        field.onChange(url)      // importante para mantener react-hook-form sincronizado
                                                        setPhotoUploaded(true)
                                                    }
                                                }}
                                                onUploadError={() => alert("Error al subir la foto")}
                                            />
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Descripción</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Descripcion ..."
                                        {...field}
                                        value={field.value ?? ""} // 🔥 Esto evita el error de tipo
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <Button type="submit">
                    Editar compañia
                </Button>
            </form>

        </Form>
    )
}
