'use client'

import { paths } from "@/app/lib/paths"
import { ChevronDownIcon } from "@heroicons/react/16/solid";
import { BellAlertIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname } from 'next/navigation';

// should be a client component
// fetch for user's info for avatar button
// TODO: make a dropdown menu
export default function HorizontalBar() {
    const pathname = usePathname();
    const currentPathName = paths.flatMap(group => group.paths).find(path => path.href === pathname)?.name || 'Define this path'

    return (
        <div className="flex p-4 justify-between items-center border-b-2 border-slate-100">
            <span className="font-bold text-gray-950">{currentPathName}</span>
            <div className="flex gap-x-3 items-center">
                <button type="button" className="group p-2 rounded-md border-2 border-gray-200 hover:border-blue-600 transition-colors duration-300">
                    <MagnifyingGlassIcon className="w-6 text-gray-500 group-hover:text-gray-950 transition-colors duration-300"/>
                </button>
                <button type="button" className="group p-2 rounded-md border-2 border-gray-200 hover:border-blue-600 transition-colors duration-300">
                    <BellAlertIcon className="w-6 text-gray-500 group-hover:text-gray-950 transition-colors duration-300"/>
                </button>
                <button type="button" className="group flex items-center gap-x-1.5 px-1.5 py-1 rounded-md border-2 border-gray-200 hover:border-blue-600 transition-colors duration-300">
                    <div className="flex-none w-8 h-8 rounded-full bg-gray-500"/>
                    <div className="flex flex-col gap-y-0.5 justify-center items-start">
                        <span className="text-gray-950 font-bold text-[0.688rem] leading-3">User's name</span>
                        <span className="text-gray-500 text-[0.688rem] leading-3">Role</span>
                    </div>
                    <ChevronDownIcon className="w-4 text-gray-500 group-hover:text-gray-950 transition-colors duration-300"/>
                </button>
            </div>
        </div>
    )
}