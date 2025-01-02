import { toggleBanEmployee } from "@/app/lib/actions/admin_actions";
import { NoSymbolIcon, UserMinusIcon } from "@heroicons/react/16/solid";
import EmployeeListAction from "./employee_list_action";
import { Employee } from "@/app/lib/definitions/definition";
import clsx from "clsx";

export default function EmployeeList({
    employees
} : {
    employees: Employee[]
}) {
    return (
        <div className="flex flex-col">
            <div className="grid grid-cols-[3fr_1fr_1fr] gap-4 items-center pb-2 border-b-2 border-slate-100">
                <span className="text-gray-500 text-sm">Name</span>
                <span className="text-gray-500 text-sm place-self-center hidden md:block">Status</span>
                <span className="text-gray-500 text-sm text-end">Action</span>
            </div>

            {/* EMPLOYEE LIST */}
            <div className="flex flex-col gap-y-4 divide-y-2 divide-slate-100">
                {employees.map((employee: Employee) => (
                    <div key={employee.id} className="grid grid-cols-[3fr_1fr_1fr] gap-4 items-center pt-4">
                        <div className="flex gap-x-2 items-center">
                            <div className="flex items-center justify-center flex-none w-10 h-10 rounded-full bg-slate-300 text-gray-950 font-semibold">
                                {employee.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col gap-y-1">
                                <span className="text-gray-950 text-sm font-medium">{employee.name}</span>
                                <span className="text-gray-500 text-xs">{employee.email}</span>
                            </div>
                        </div>
                        <div className={clsx(
                            "px-2.5 py-1 place-self-center text-xs text-center font-medium rounded-md md:text-sm",
                            {
                                "bg-blue-100 text-blue-500": employee.status === "active",
                                "bg-red-100 text-red-500": employee.status === "banned"
                            }
                        )}>
                            {employee.status === "active" ? "Active" : "Banned"}
                        </div>
                        <EmployeeListAction employee={employee}/>
                    </div>
                ))}
            </div>
        </div>
    )
}