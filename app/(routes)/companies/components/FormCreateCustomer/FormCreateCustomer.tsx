"use client"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { FormCreateCustomerProps } from "./FormCreateCustomer.type"
import { useState } from "react"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { UploadButton } from "@/utils/uploadthing"
import axios from "axios"
import { useRouter } from "next/navigation"


const formSchema = z.object({
    name: z.string(),
    country: z.string().min(2),
    website: z.string().min(2),
    phone: z.string().min(6),
    cif: z.string().min(6),
    profile: z.string(),
})

export default function FormCreateCustomer(props: FormCreateCustomerProps) {
    const { setOpenModalCreate } = props
    const router = useRouter();

    const [photoUploaded, setPhoneUploaded] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            country: "",
            website: "",
            phone: "",
            cif: "",
            profile: "",
        },
    })

    const { isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            axios.post("/api/company", values)
            alert("Compañia creada correctamente");
            router.refresh();
            setOpenModalCreate(false);
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            alert("Error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.");
        }
    }


    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-2 gap-3">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Compañia Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Compañia nombre ..." type='text'{...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Pais</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona un pais" />
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
                                    <FormLabel>Website</FormLabel>
                                    <FormControl>
                                        <Input placeholder="www.vaniDesa.com" type='text'{...field} />
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
                                    <FormLabel>phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+54 2616514342" type='number'{...field} />
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
                                    <FormLabel>Cif</FormLabel>
                                    <FormControl>
                                        <Input placeholder="B-1234567" type='text'{...field} />
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
                                    <FormLabel>Imagen de Perfil</FormLabel>
                                    <FormControl>
                                        {photoUploaded ? (
                                            <p className="text-sm">Imagen subida</p>
                                        ) : (<UploadButton className="bg-slate-600/20 text-slate-800 rounded-lg outline-dotted outline-3"
                                            {...field}
                                            endpoint="profile"
                                            onClientUploadComplete={(res) => {
                                                form.setValue("profile", res[0].url, { shouldValidate: true, shouldDirty: true });
                                                setPhoneUploaded(true);
                                            }}

                                            onUploadError={(error: Error) => {
                                                setUploadError(error.message);
                                            }}
                                        />
                                        )}
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" disabled={!isValid}>Crear</Button>
                </form>
            </Form >
        </>
    )
}
