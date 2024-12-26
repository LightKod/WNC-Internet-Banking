import { toggleBanEmployee } from "@/app/lib/actions/admin_actions";
import { NoSymbolIcon, UserMinusIcon } from "@heroicons/react/16/solid";
import EmployeeListAction from "./employee_list_action";

export default function EmployeeList() {
    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-[3fr_1fr_1fr] gap-4 items-center pb-2 border-b-2 border-slate-100">
                <span className="text-gray-500 text-sm">Name</span>
                <span className="text-gray-500 text-sm place-self-center hidden md:block">Status</span>
                <span className="text-gray-500 text-sm text-end">Action</span>
            </div>

            {/* EMPLOYEE LIST */}
            <div className="flex flex-col gap-y-4 divide-y-2 divide-slate-100">
                <div className="grid grid-cols-[3fr_1fr_1fr] gap-4 items-center pt-4">
                    <div className="flex gap-x-2 items-center">
                        <div className="flex-none w-10 h-10 rounded-full bg-slate-500"/>
                        <div className="flex flex-col gap-y-1">
                            <span className="text-gray-950 text-sm font-medium">Name</span>
                            <span className="text-gray-500 text-xs">a@a.com</span>
                        </div>
                    </div>
                    <div className="px-2.5 py-1 place-self-center text-xs text-center font-medium rounded-md bg-blue-100 text-blue-500 md:text-sm">
                        Active
                    </div>
                    <EmployeeListAction id={'1'}/>
                </div>
                <div className="grid grid-cols-[3fr_1fr_1fr] gap-4 items-center pt-4">
                    <div className="flex gap-x-2 items-center">
                        <div className="flex-none w-10 h-10 rounded-full bg-slate-500"/>
                        <div className="flex flex-col gap-y-1">
                            <span className="text-gray-950 text-sm font-medium">Name</span>
                            <span className="text-gray-500 text-xs">a@a.com</span>
                        </div>
                    </div>
                    <div className="px-2.5 py-1 place-self-center text-xs text-center font-medium rounded-md bg-red-100 text-red-500 md:text-sm">
                        Banned
                    </div>
                    <EmployeeListAction id={'2'}/>
                </div>
            </div>
        </div>
    )
}