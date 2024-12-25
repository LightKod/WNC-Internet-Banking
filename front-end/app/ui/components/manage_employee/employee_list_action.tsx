'use client'

import { toggleBanEmployee, unassignEmployee } from "@/app/lib/actions/admin_actions";
import { NoSymbolIcon, UserMinusIcon } from "@heroicons/react/16/solid";

export default function EmployeeListAction({
    id
} : {
    id: string
}) {
    return (
        <div className="flex justify-end items-center gap-x-2">
            <form action={() => toggleBanEmployee(id)}>
                <button type="submit" className="text-gray-500 p-2 border-2 border-slate-300 rounded-md shrink-0 hover:text-gray-950 hover:border-red-600 transition-all duration-300">
                    <NoSymbolIcon className="w-4"/>
                </button>
            </form>
            <form action={() => unassignEmployee(id)}>
                <button type="submit" className="flex items-center justify-center gap-2 rounded-md px-2 py-2 bg-blue-600 text-blue-50 text-sm font-medium border-blue-600 hover:border-blue-700 hover:bg-blue-700 md:border-0 md:px-3 transition-colors duration-300">
                    <UserMinusIcon className="w-4"/>
                    <p className="hidden md:block">Unassign</p>
                </button>
            </form>
        </div>
    )
}