import Logo from '@/components/Logo/Logo';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className='flex flex-col justify-center h-full items-center'>
            <Logo />
            <h1 className='text-2xl font-bold'>
                Welcome to my dashboard!
            </h1>

            <h2 className='text-1xl mb-3'>
                VaniDev Dashboard
            </h2>
            {children}
        </div>
    )
}