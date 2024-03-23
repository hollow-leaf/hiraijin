"use client";
import PayForm from '@/components/client/PayForm';
import { useEffect, useState } from 'react'

export default function page() {

    return (
        <main>
            <div className='flex flex-col justify-center items-center'>
                <div className='font-roboto text-3xl font-bold mb-4'>
                    <div className="mt-6 flex flex-col items-center">
                        <h1 className="mt-3 text-2xl font-bold">
                            Pay TWD
                        </h1>
                    </div>
                    <PayForm />
                </div>
            </div>
        </main>
    );
}
