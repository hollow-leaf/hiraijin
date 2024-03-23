"use client"
import { Card } from "@/components/ui/card"
import {
    DollarSign,
    LogOut,
    KeySquare,
    Flashlight
} from "lucide-react"
import { useState } from "react"
import { Spinner } from "@/components/Spinner"
import { shortenText } from "@/lib/utils"
import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"
import RegisterForm from "@/components/store/RegisterForm"
import { Input } from "@/components/ui/input"
import { getUserId } from "@/lib/account"
import axios from 'axios';

export default function page() {

    const [loadingStates, setLoadingStates] = useState({
        export: false,
        disconnect: false,
    });
    const [isSigned, setSinged] = useState(false)
    const [wallet, setWallet] = useState("TEST")
    const [balance, setBalance] = useState(1000)
    const [disconnectOpen, setDisconnectOpen] = useState(false)
    const [linkedOpen, setLinkedOpen] = useState(false);

    const config = {
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
        }
    }

    useEffect(() => {
        getUserId().then(id => {
            if (id) {
                axios.get(`http://localhost:8787/users/${id}`, config)
                    .then(function (response) {
                        console.log(response.data);
                        console.log(response.data.id);
                        if (response.data.id) {
                            console.log(response.data.walletAddress)
                            setWallet(response.data.walletAddress)
                            setSinged(true)
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            }
        })
    }, [])

    return (
        <main>
            <div className="mt-6 flex flex-col items-center">
                <h1 className="mt-3 text-2xl font-bold">
                    {isSigned ? shortenText(wallet, 10) : "WELCOME HIRAIJIN"}
                </h1>
            </div>
            {
                isSigned ?
                    (
                        <>
                            <Card className="mt-8 flex w-full flex-col border px-5  py-1 shadow">
                                <div className="flex items-center justify-between py-3">
                                    <div className="flex items-center ">
                                        <div className="mr-3 w-fit rounded-lg p-1.5 ">
                                            <DollarSign size={22} color="white" strokeWidth={2} />
                                        </div>
                                        <span>Balance : {balance}</span>
                                    </div>
                                </div>
                            </Card>
                        </>)
                    :
                    (
                        <div className="flex flex-col items-center justify-center mt-12">
                            <RegisterForm setSigned={setSinged} setWallet={setWallet} />
                        </div>
                    )
            }
        </main>
    )
}
