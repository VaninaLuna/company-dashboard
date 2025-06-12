import { redirect } from 'next/navigation'
import { ListContactsProps } from './ListContacts.types'

import { Mail, Phone } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { auth } from '@clerk/nextjs/server'
import { db } from '@/lib/db'


export async function ListContacts(props: ListContactsProps) {
    const { company } = props
    const { userId } = await auth()

    if (!userId) {
        return redirect("/")
    }

    const contact = await db.contact.findMany({
        where: {
            company: {
                id: company.id
            }
        }
    })
    if (contact.length === 0) {
        return <p>No tienes ningun contacto</p>

    }
    return (
        <div>
            <div className='mt-4 mb-2 grid grid-cols-3 p.2 gap.x.3 items-center justify-between px-4 bg-slate-400/20 rounded-lg'>
                <p>Name</p>
                <p>Rol</p>
                <p className='text-right'>Contacto</p>
            </div>
            {contact.map((contact) => (
                <div key={contact.id}>
                    <div className='grid grid-cols-3 gap-x-3 items-center justify-between px-4'>
                        <p>{contact.name}</p>
                        <p>{contact.role}</p>
                        <div className='flex items-center gap-x-6 justify-end'>
                            <a href={`telto: ${contact.phone}`} target='_blank'><Phone className='w-4 h-4' /> </a>
                            <a href={`mailto: ${contact.email}`} target='_blank'>
                                <Mail className='w-4 h-4' />
                            </a>
                        </div>
                    </div>
                    <Separator className='my-3' />
                </div>
            ))}
        </div>
    )

}
