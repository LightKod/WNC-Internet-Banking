'use client'

import { useEffect, useRef, useState } from "react"
import Toast, { ToastRef } from "../universal/toast"
import { ArrowRightIcon } from "@heroicons/react/16/solid"
import Link from "next/link"
import { revalidatePaymentRequest } from "@/app/lib/actions/revalidation"
import { usePathname } from "next/navigation"
import { checkNewPaymentRequestNotification } from "@/app/lib/actions/actions"

export default function NotificationToast() {
    const pathname = usePathname();
    const toastRef = useRef<ToastRef>(null)
    const [toastMode, setToastMode] = useState<string>("")

    const openToast = () => {
        toastRef.current?.openToast()
    }

    const closeToast = () => {
        toastRef.current?.closeToast()
    }

    const checkNotif = async () => {
        if(!pathname.startsWith('/payment-request')) {
            const result = await checkNewPaymentRequestNotification()
            setToastMode(result as string)
            if(result === "UNREAD_PAID" || result === "NEW") {
                openToast()
            }
        }
    }

    useEffect(() => {
        const interval = setInterval(checkNotif, 15000);
    
        return () => clearInterval(interval);
    }, [pathname]);

    return (
        <Toast ref={toastRef} heading="Notification">
            <div className="flex flex-col gap-y-2">
                <p className="text-xs text-gray-950">
                    {toastMode === "NEW" && "You have a new payment request"}
                    {toastMode === "UNREAD_PAID" && "You have a payment request resolved by another user"}
                </p>
                <Link href="/payment-request" onClick={() => {closeToast(); revalidatePaymentRequest()}} className="flex items-center justify-center gap-2 rounded-md py-2 bg-blue-600 text-blue-50 text-xs font-medium hover:bg-blue-700 transition-colors duration-300">
                    <ArrowRightIcon className="w-3"/>
                    <p>Payment request</p>
                </Link>
            </div>
        </Toast>
    )
}