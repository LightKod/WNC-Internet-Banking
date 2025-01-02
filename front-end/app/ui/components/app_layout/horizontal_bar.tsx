'use client'

import { adminPaths, employeePaths, hiddenPaths, otherPaths, paths } from "@/app/lib/paths"
import { ArrowRightStartOnRectangleIcon, ChevronDownIcon, KeyIcon, UserIcon } from "@heroicons/react/16/solid";
import { BellAlertIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { usePathname } from 'next/navigation';
import MiniNavBar from "./mini_navbar";
import { Dropdown, DropdownContent, DropdownTrigger } from "../universal/dropdown";
import Link from "next/link";
import { handleLogout } from "@/app/lib/actions/actions";

// should be a client component
// fetch for user's info for avatar button
// TODO: make a dropdown menu
export default function HorizontalBar({
    userRole,
    userName
} : {
    userRole: string
    userName: string
}) {
    const pathname = usePathname();
    const currentPathName = [...paths, ...employeePaths, ...adminPaths, ...otherPaths, ...hiddenPaths].flatMap(group => group.paths).find(path => path.href === pathname)?.name || 'Define this path'

    return (
        <div className="flex p-4 justify-between items-center border-b-2 border-slate-100">
            <span className="font-bold text-gray-950 hidden md:block">{currentPathName}</span>
            <span className="font-extrabold text-2xl text-gray-950 md:hidden">Bankit!</span>
            <div className="hidden gap-x-3 items-center md:flex">
                <button type="button" className="group p-2.5 rounded-md border-2 border-slate-200 hover:border-blue-600 transition-colors duration-300">
                    <MagnifyingGlassIcon className="w-5 text-gray-500 group-hover:text-gray-950 transition-colors duration-300"/>
                </button>
                <button type="button" className="group p-2.5 rounded-md border-2 border-slate-200 hover:border-blue-600 transition-colors duration-300">
                    <BellAlertIcon className="w-5 text-gray-500 group-hover:text-gray-950 transition-colors duration-300"/>
                </button>
                <Dropdown>
                    <DropdownTrigger>
                        <button type="button" className="group flex items-center gap-x-1.5 px-1.5 py-1 rounded-md border-2 border-slate-200 hover:border-blue-600 transition-colors duration-300">
                            <div className="flex-none w-8 h-8 rounded-full bg-slate-100"/>
                            <div className="flex flex-col gap-y-0.5 justify-center items-start">
                                <span className="text-gray-950 font-bold text-[0.688rem] leading-3">{userName}</span>
                                <span className="text-gray-500 text-[0.688rem] leading-3">{userRole.charAt(0).toUpperCase() + userRole.slice(1)}</span>
                            </div>
                            <ChevronDownIcon className="w-4 text-gray-500 group-hover:text-gray-950 transition-colors duration-300"/>
                        </button>
                    </DropdownTrigger>
                    <DropdownContent anchor="br">
                        <div className="flex flex-col divide-y-2 divide-slate-100">
                            <button type="button" className="px-4 py-3 flex flex-row gap-2 items-center text-sm text-gray-500 font-medium bg-white hover:text-blue-600 hover:bg-blue-50 transition-all duration-300">
                                <UserIcon className="w-4"/>
                                <p>Profile</p>
                            </button>
                            <Link href="/change-password" type="button" className="px-4 py-3 flex flex-row gap-2 items-center text-sm text-gray-500 font-medium bg-white hover:text-blue-600 hover:bg-blue-50 transition-all duration-300">
                                <KeyIcon className="w-4"/>
                                <p>Change Password</p>
                            </Link>
                            <button onClick={() => handleLogout()} type="button" className="px-4 py-3 flex flex-row gap-2 items-center text-sm text-gray-500 font-medium bg-white hover:text-red-500 hover:bg-red-50 transition-all duration-300">
                                <ArrowRightStartOnRectangleIcon className="w-4"/>
                                <p>Log Out</p>
                            </button>
                        </div>
                    </DropdownContent>
                </Dropdown>
            </div>

            {/* NAVBAR (SMALL SCREEN) */}
            <MiniNavBar userRole={userRole}/>
        </div>
    )
}