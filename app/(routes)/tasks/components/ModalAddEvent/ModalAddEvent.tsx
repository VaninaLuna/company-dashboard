"use client"

import { Dialog, DialogHeader, DialogTitle, DialogContent } from '@/components/ui/dialog'

import React from 'react'
import { ModalAddEventProps } from './ModalAddEvent.types'
import FormEvent from '../FormEvent/FormEvent'

export default function ModalAddEvent(props: ModalAddEventProps) {
    const { open, companies, setNewEvent, setOnSaveNewEvent, setOpen } = props


    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className='sm:max-w-[425px]'>
                <DialogHeader>
                    <DialogTitle>Agregar nuevo evento</DialogTitle>
                </DialogHeader>
                <FormEvent setOnSaveNewEvent={setOnSaveNewEvent} companies={companies} setNewEvent={setNewEvent} setOpen={setOpen} />
            </DialogContent>

        </Dialog>
    )
}
