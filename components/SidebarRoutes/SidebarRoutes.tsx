'use client';

import React from 'react'
import { dataGeneralSidebar, dataSupportSidebar, dataToolsSidebar } from './SidebarRoutes.data'
import SidebarItem from '../SidebarItem/SidebarItem'
import { Separator } from "@/components/ui/separator";
import { Button } from '../ui/button';


export default function SidebarRoutes() {
    return (
        <div className='flex flex-col justify-between h-full'>
            <div>
                <div className='p-2 md:p-6'>
                    <p className='text-slate-500 mb-2'>General</p>
                    {dataGeneralSidebar.map((item) => (
                        <SidebarItem key={item.label} item={item} />
                    ))}
                </div>

                <Separator />

                <div className='p-2 md:p-6'>
                    <p className='text-slate-500 mb-2'>Tools</p>
                    {dataToolsSidebar.map((item) => (
                        <SidebarItem key={item.label} item={item} />
                    ))}
                </div>
                <Separator />
                <div className='p-2 md:p-4'>
                    <p className='text-slate-500 mb-2'>Support</p>
                    {dataSupportSidebar.map((item) => (
                        <SidebarItem key={item.label} item={item} />
                    ))}
                </div>
            </div>
            <div>
                <div className='text-center p-6'>
                    <Button variant='outline' className='w-full'>
                        Actualizar Plan
                    </Button>
                </div>
                <Separator />
                <footer className='mt-3 p-3 text-center'>
                    2025. All rights reserved Con ❤️ por <a href="https://portfolio-vanina-luna.vercel.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-600">V.L.</a>
                </footer>
            </div>
        </div>
    )
}
