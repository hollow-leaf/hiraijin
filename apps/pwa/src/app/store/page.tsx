"use client";
import {
    Card,
    CardContent,
} from "@/components/ui/card"
import { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button";
import QRCode from "react-qr-code";
import { getUserId } from "@/lib/account";
import axios from "axios";
import {
    DollarSign,
} from "lucide-react"
export default function page() {
    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
        }
    }
    const [wallet, setWallet] = useState("TEST")
    const [isSigned, setIsSigned] = useState(false)
    const [qrCode, setQRCode] = useState(false)
    const [balance, setBalance] = useState(0)

    useEffect(() => {
        getUserId().then(id => {
            if (id) {
                axios.get(`http://localhost:8787/users/${id}`, config)
                    .then(function (response) {
                        if (response.data.id) {
                            console.log(response.data.walletAddress)
                            setWallet(response.data.walletAddress)
                            setIsSigned(true)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        })
    }, [isSigned])

    return (
        <main>
            <div className='flex flex-col justify-center items-center'>
                <div className='font-roboto text-3xl font-bold mb-4'>
                    Store Code
                </div>
                {isSigned ? (
                    <Card className="mt-8 flex w-full flex-col border px-5  py-1 shadow mb-6">
                        <div className="flex items-center justify-between py-3">
                            <div className="flex items-center ">
                                <div className="mr-3 w-fit rounded-lg p-1.5 ">
                                    <DollarSign size={22} color="white" strokeWidth={2} />
                                </div>
                                <span>Balance : {balance}</span>
                            </div>
                        </div>
                    </Card>
                ) : null
                }
                {qrCode ? (
                    <Card className="mb-12">
                        <CardContent className="p-6 space-y-4">
                            <QRCode
                                size={256}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={wallet}
                                viewBox={`0 0 256 256`}
                            />
                        </CardContent>
                    </Card>
                ) : null}
                <Button
                    disabled={!isSigned}
                    onClick={() =>
                        getUserId().then(id => {
                            if (id) {
                                axios.get(`http://localhost:8787/users/${id}`, config)
                                    .then(function (response) {
                                        console.log(response.data.data);
                                        if (response.data.data) {
                                            setWallet(response.data.walletID)
                                            setQRCode(true)
                                        }
                                    })
                                    .catch(function (error) {
                                        console.log(error);
                                    });
                            }
                        })
                    }>
                    {isSigned ? "Generate Code" : "Register Account"}
                </Button>
            </div>
        </main>
    );
}
