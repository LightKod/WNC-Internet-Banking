'use client'

import { useEffect, useRef } from "react"
import Toast, { ToastRef } from "../universal/toast"
import { ArrowRightIcon } from "@heroicons/react/16/solid"
import Link from "next/link"
import { revalidatePaymentRequest } from "@/app/lib/actions/revalidation"
import { usePathname } from "next/navigation"

export default function NotificationToast() {
    const pathname = usePathname();
    const toastRef = useRef<ToastRef>(null)

    const openToast = () => {
        toastRef.current?.openToast()
    }

    const closeToast = () => {
        toastRef.current?.closeToast()
    }

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         if(pathname !== '/payment-request') {
    //             openToast()
    //         }
    //     }, 15000);
    
    //     return () => clearInterval(interval);
    //   }, [pathname]);

    return (
        <Toast ref={toastRef} heading="Notification">
            <div className="flex flex-col gap-y-2">
                <p className="text-xs text-gray-950">You have received a new payment request</p>
                <Link href="/payment-request" onClick={() => {closeToast(); revalidatePaymentRequest()}} className="flex items-center justify-center gap-2 rounded-md py-2 bg-blue-600 text-blue-50 text-xs font-medium hover:bg-blue-700 transition-colors duration-300">
                    <ArrowRightIcon className="w-3"/>
                    <p>Payment request</p>
                </Link>
            </div>
        </Toast>
    )
}