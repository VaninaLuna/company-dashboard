"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import axios from "axios"
import { useParams, useRouter } from "next/navigation"
import { formSchema } from "./FormContact.form"
import { z } from "zod"
import { FormContactProps } from "./FormContact.types"


export default function FormContact(props: FormContactProps) {
    const { setOpen } = props
    const params = useParams<{ companyId: string }>()
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            role: "",
            email: "",
            phone: "",
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`/api/company/${params.companyId}/contact`, values)
            alert("Contacto creado")
            router.refresh()
            setOpen(false)


        } catch (error) {
            alert("Error al crear el contacto" + error)
        }
    }


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="md:grid-cols-2 grid gap-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>
                            <FormControl>
                                <Input placeholder="Juan Peres" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input placeholder="email@email.com" {...field} />
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
                                <Input placeholder="2365140" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rol</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione un rol" />

                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="comercial">Comercial</SelectItem>
                                    <SelectItem value="recursosHumanos">Recursos Humanos</SelectItem>
                                    <SelectItem value="it">Desarrollo</SelectItem>
                                    <SelectItem value="ventas">Vendedor</SelectItem>
                                    <SelectItem value="gerencia">Gerente</SelectItem>
                                </SelectContent>

                                <FormMessage />
                            </Select>
                        </FormItem>
                    )}
                />
                <Button type="submit">Guardar contacto</Button>
            </form>

        </Form>
    )
}
