"use client"

import { useState, useEffect } from 'react'
import multiMonthPlugin from "@fullcalendar/multimonth"
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import timeGridPlugin from "@fullcalendar/timegrid"
import interactionPlugin from "@fullcalendar/interaction"
import listPlugin from "@fullcalendar/list"
import { DateSelectArg, EventContentArg } from "@fullcalendar/core/index.js"

import axios from 'axios'
import { formatDate } from "@/lib/formatDate"



import { CalendarProps } from './Calendar.types'
import { useRouter } from 'next/navigation'
import ModalAddEvent from '../ModalAddEvent/ModalAddEvent'


export default function Calendar(props: CalendarProps) {
    const { companies, events } = props
    const router = useRouter()
    const [open, SetOpen] = useState(false)
    const [onSaveNewEvent, setOnSaveNewEvent] = useState(false)
    const [selectedItem, setSelectedItem] = useState<DateSelectArg>()
    const [newEvent, setNewEvent] = useState({
        eventName: "",
        companieSelected: {
            name: "",
            id: ""
        }
    })

    const handleDateClick = async (selected: DateSelectArg) => {
        SetOpen(true)
        setSelectedItem(selected)
    }


    useEffect(() => {
        if (onSaveNewEvent && selectedItem?.view.calendar) {
            const calendarApi = selectedItem.view.calendar
            calendarApi.unselect()

            const newEventPrisma = {
                companyId: newEvent.companieSelected.id,
                title: newEvent.eventName,
                start: new Date(selectedItem.start),
                allDay: false,
                timeFormar: 'H(:mm)'
            }

            axios.post(`/api/company/${newEvent.companieSelected.id}/event`, newEventPrisma).then(() => {
                alert("Evento creado");
                router.refresh();
            })
                .catch(error => alert("Error al crear el evento" + error))

            setNewEvent({
                eventName: "",
                companieSelected: {
                    name: "",
                    id: ""
                }
            })

            setOnSaveNewEvent(false)
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [onSaveNewEvent, selectedItem, event])

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEventClick = async (selected: any) => {
        if (window.confirm(
            `Estas seguro que deseas eliminar este evento ${selected.event.title}`
        )) {
            try {
                await axios.delete(`/api/event/${selected.event._def.publicId}`)
                alert("Evento eliminado")
                router.refresh()

            } catch (error) {
                alert("algo salio mal" + error)
            }

        }


    }


    return (
        <div>
            <div className='md:flex gap-x-3'>
                <div className='w-[200px] relative'>
                    <div className='overflow-auto absolute left-0 top-0 h-full w-full'>
                        <p className='mb-3 text-xl'>Listado de tareas</p>
                        {events.map((currentEvent) => (
                            <div key={currentEvent.id} className='p-4 rounded-lg shadow-md md-2 bg-slate-200 dark:bg-background'>
                                <p className='font-bold'>{currentEvent.title}</p>
                                <p>{formatDate(currentEvent.start)}</p>
                            </div>
                        ))}

                    </div>

                </div>
                <div className='flex-1 calendar-container'>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin, multiMonthPlugin]}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "timeGridDay,timeGridWeek,dayGridMonth,multiMonthYear,listMonth"
                        }}

                        height="80vh"
                        initialView='dayGridMonth'
                        weekends={false}
                        events={events}
                        eventContent={renderEventContent}
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        select={handleDateClick}
                        eventClick={handleEventClick}

                    />

                </div>

            </div>
            <ModalAddEvent
                open={open}
                setOpen={SetOpen}
                setOnSaveNewEvent={setOnSaveNewEvent}
                companies={companies}
                setNewEvent={setNewEvent}
            />
        </div>
    )
}

function renderEventContent(eventInfo: EventContentArg) {
    return (
        <div className='bg-slate-200 dark:bg-background w.full p-1'>
            <i>{eventInfo.event.title}</i>
        </div>
    )
}