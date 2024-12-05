'use client'

import { paths } from "@/app/lib/paths"
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from 'next/navigation';

export default function NavBar() {
    const pathname = usePathname();
    
    return (
        <div className="flex h-full flex-col overflow-y-auto border-r-2 border-slate-100">
            {paths.map((group: any) => (
                <div key={group.groupName} className="flex flex-col gap-y-2 p-2">
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
                                    <LitIcon className="w-5"/>
                                ) : (
                                    <Icon className="w-5"/>
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