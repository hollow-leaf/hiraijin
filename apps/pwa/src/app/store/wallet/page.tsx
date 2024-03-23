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
import { delay, shortenText } from "@/lib/utils"
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
import { getUserId, setReceiver } from "@/lib/account"
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

    const disconnectAccount = async () => {
        setSinged(false)
    }

    useEffect(() => {
        getUserId().then(id => {
            if (id) {
                axios.get(`https://hiraijin.kidneyweakx.workers.dev/users/${id}`, config)
                    .then(function (response) {
                        console.log(response.data.data);
                        if (response.data.data) {
                            setReceiver(response.data.data)
                            setWallet(id)
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
                    {isSigned ? 'TEST' : "WELCOME HIRAIJIN"}
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
                            <Card className="mt-6 flex w-full flex-col border px-5 shadow">
                                <button
                                    disabled={loadingStates.disconnect}
                                    onClick={() => {
                                        setLoadingStates((prevState) => ({ ...prevState, disconnect: true }));

                                        // TODO: Disconnect (Mock Loading)
                                        delay(500).finally(() => {
                                            setLoadingStates((prevState) => ({ ...prevState, disconnect: false }));
                                            disconnectAccount()
                                            setDisconnectOpen(true)
                                        })
                                    }}
                                >
                                    <div className="flex items-center py-3">
                                        {!loadingStates.disconnect ? (
                                            <div className="flex items-center">
                                                <div className="mr-3 w-fit rounded-lg p-1.5 ">
                                                    <LogOut size={22} color="white" />
                                                </div>
                                                <span>Disconnect</span>
                                            </div>
                                        ) : (
                                            <div className="flex w-full justify-center">
                                                <Spinner />
                                            </div>
                                        )}
                                    </div>
                                </button>
                            </Card>

                        </>)
                    :
                    (
                        <div className="flex flex-col items-center justify-center mt-12">
                            <RegisterForm setSigned={setSinged} />
                        </div>
                    )
            }
            <Dialog open={disconnectOpen} onOpenChange={setDisconnectOpen}>
                <DialogContent className="max-w-[250px]">
                    <div>
                        <DialogHeader>
                            <div className="grid gap-4 py-4 items-center justify-center">
                                <div className="flex flex-row space-x-1">
                                    <>
                                        <div>Disconnected</div>
                                    </>
                                </div>
                            </div>
                        </DialogHeader>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button
                                    onClick={() => {
                                        console.log(`Remove localStorage`)
                                    }}>OK
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>
        </main>
    )
}
