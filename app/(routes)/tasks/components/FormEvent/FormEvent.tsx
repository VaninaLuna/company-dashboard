import React from 'react'
import { FormEventProps } from './FormEvent.types'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const formSchema = z.object({
    eventName: z.string().min(2),
    companieSelected: z.object({
        name: z.string().min(2),
        id: z.string()
    })
})

export default function FormEvent(props: FormEventProps) {
    const { companies, setNewEvent, setOnSaveNewEvent, setOpen } = props
    const [selectedCompany, setSelectedCompany] = useState({
        name: "",
        id: ""
    })


    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            eventName: "",
            companieSelected: {
                name: "",
                id: ""
            }
        }
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        setNewEvent(values)
        setOpen(false)
        setOnSaveNewEvent(true)

    }

    const handleCompanyChange = (newValue: string) => {
        const selectedCompany = companies.find(company => company.name === newValue)
        if (selectedCompany) {
            setSelectedCompany({
                name: selectedCompany.name,
                id: selectedCompany.id
            })
            form.setValue("companieSelected.name", selectedCompany.name)
            form.setValue("companieSelected.id", selectedCompany.id)
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name="eventName"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input placeholder='Meeting...' {...field} />
                            </FormControl>
                            <FormDescription>Este es el nombre de tu evento</FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="companieSelected.name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre de la compañia</FormLabel>
                            <Select onValueChange={(newValue) => { field.onChange(newValue); handleCompanyChange(newValue); }}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Seleccione la compañia " />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {companies.map((companie) => (
                                        <SelectItem key={companie.id} value={companie.name}>
                                            {companie.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type='submit'> Crear evento</Button>
            </form>

        </Form>
    )
}
