"use client";
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";

export default function page() {

    return (
        <main>
            <div className='flex flex-col justify-center items-center'>
                <div className='font-roboto text-3xl font-bold mb-4'>
                    Store Code
                </div>
                <Card>
                    <CardContent className="p-6 space-y-4">
                        TODO: TWQR code

                    </CardContent>
                </Card>
                <Button>
                    Generate Code
                </Button>
            </div>
        </main>
    );
}
