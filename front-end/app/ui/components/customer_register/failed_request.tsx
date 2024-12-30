'use client'

import { useContext } from "react"
import { PageContentContext } from "./customer_register_page_content"
import { XCircleIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import { ArrowLeftIcon, ArrowPathIcon } from "@heroicons/react/16/solid"

export default function FailedRequest() {
    const context = useContext(PageContentContext)

    if(!context){
        throw new Error('Something went wrong')
    }

    return (
        <div className="flex flex-col gap-y-8 px-8 pb-8">
            <div className="flex flex-col gap-y-1 items-center p-8 bg-red-50 rounded-md border-2 border-red-100">
                    <XCircleIcon className="w-24 text-red-600"/>
                    <p className="text-gray-950 font-semibold">Request failed</p>
                    <p className="text-sm text-gray-500">{context.isRequestSuccessful?.error}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/dashboard" className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-slate-200 text-gray-950 text-sm font-medium hover:bg-slate-300 transition-colors duration-300">
                    <ArrowLeftIcon className="w-4"/>
                    <p>Dashboard</p>
                </Link>
                <button type="button" onClick={() => window.location.reload()} className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-blue-600 text-blue-50 text-sm font-medium hover:bg-blue-700 transition-colors duration-300">
                    <ArrowPathIcon className="w-4"/>
                    <p>Retry</p>
                </button>
            </div>
        </div>
    )
}