'use client'

import { adminPaths, employeePaths, otherPaths, paths } from "@/app/lib/paths"
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function NavBar({
    userRole
} : {
    userRole: string
}) {
    const pathname = usePathname();
    
    return (
        <div className="h-full flex-col overflow-y-auto border-r-2 p-2 gap-y-4 border-slate-100 hidden md:flex">
            {paths.map((group: any) => (
                <div key={group.groupName} className="flex flex-col gap-y-2">
                    <div className="text-gray-950 text-sm">{group.groupName}</div>
                    {group.paths.map((path: any) => {
                        const Icon = path.icon
                        const LitIcon = path.litIcon
                        return (
                            <Link key={`${group.groupName}_${path.name}`} href={path.href} className={clsx(
                                "px-3 py-2 flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-950 transition-all duration-300", {
                                    "border-2 rounded-md border-slate-100 bg-slate-50 text-gray-950 font-semibold": pathname.includes(path.href)
                                }
                            )}>
                                {pathname.includes(path.href) ? (
                                    <LitIcon className="w-5 flex-none"/>
                                ) : (
                                    <Icon className="w-5 flex-none"/>
                                )}
                                <p>{path.name}</p>
                            </Link>
                        )
                    })}
                </div>
            ))}
            {(userRole === "admin" || userRole === "employee") && employeePaths.map((group: any) => (
                <div key={group.groupName} className="flex flex-col gap-y-2">
                    <div className="text-gray-950 text-sm">{group.groupName}</div>
                    {group.paths.map((path: any) => {
                        const Icon = path.icon
                        const LitIcon = path.litIcon
                        return (
                            <Link key={`${group.groupName}_${path.name}`} href={path.href} className={clsx(
                                "px-3 py-2 flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-950 transition-all duration-300", {
                                    "border-2 rounded-md border-slate-100 bg-slate-50 text-gray-950 font-semibold": pathname.includes(path.href)
                                }
                            )}>
                                {pathname.includes(path.href) ? (
                                    <LitIcon className="w-5 flex-none"/>
                                ) : (
                                    <Icon className="w-5 flex-none"/>
                                )}
                                <p>{path.name}</p>
                            </Link>
                        )
                    })}
                </div>
            ))}
            {userRole === "admin" && adminPaths.map((group: any) => (
                <div key={group.groupName} className="flex flex-col gap-y-2">
                    <div className="text-gray-950 text-sm">{group.groupName}</div>
                    {group.paths.map((path: any) => {
                        const Icon = path.icon
                        const LitIcon = path.litIcon
                        return (
                            <Link key={`${group.groupName}_${path.name}`} href={path.href} className={clsx(
                                "px-3 py-2 flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-950 transition-all duration-300", {
                                    "border-2 rounded-md border-slate-100 bg-slate-50 text-gray-950 font-semibold": pathname.includes(path.href)
                                }
                            )}>
                                {pathname.includes(path.href) ? (
                                    <LitIcon className="w-5 flex-none"/>
                                ) : (
                                    <Icon className="w-5 flex-none"/>
                                )}
                                <p>{path.name}</p>
                            </Link>
                        )
                    })}
                </div>
            ))}
            {otherPaths.map((group: any) => (
                <div key={group.groupName} className="flex flex-col gap-y-2">
                    <div className="text-gray-950 text-sm">{group.groupName}</div>
                    {group.paths.map((path: any) => {
                        const Icon = path.icon
                        const LitIcon = path.litIcon
                        return (
                            <Link key={`${group.groupName}_${path.name}`} href={path.href} className={clsx(
                                "px-3 py-2 flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-950 transition-all duration-300", {
                                    "border-2 rounded-md border-slate-100 bg-slate-50 text-gray-950 font-semibold": pathname.includes(path.href)
                                }
                            )}>
                                {pathname.includes(path.href) ? (
                                    <LitIcon className="w-5 flex-none"/>
                                ) : (
                                    <Icon className="w-5 flex-none"/>
                                )}
                                <p>{path.name}</p>
                            </Link>
                        )
                    })}
                </div>
            ))}
        </div>
    )
}