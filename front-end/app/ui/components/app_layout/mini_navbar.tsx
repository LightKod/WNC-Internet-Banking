'use client'

import { usePathname } from "next/navigation";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { useRef } from "react";
import Sheet, { SheetRef } from "../universal/sheet";
import Link from "next/link";
import clsx from "clsx";
import { paths } from "@/app/lib/paths";

export default function MiniNavBar() {
    const pathname = usePathname();
    const sheetRef = useRef<SheetRef>(null)

    const openSheet = () => {
        sheetRef.current?.openSheet()
    }

    return (
        <>
            <button type="button" onClick={openSheet} className="group p-2.5 md:hidden">
                <Bars3Icon className="w-6 text-gray-950"/>
            </button>
            <Sheet ref={sheetRef} size="md" heading="Menu">
                <div className="flex flex-col gap-y-4 items-center">
                    {
                        paths.flatMap(group => group.paths).map((path: any) => (
                            <Link key={`${path.name}`} href={path.href} className={clsx(
                                "p-2 text-gray-500 text-2xl hover:text-gray-950 transition-all duration-300 relative",
                                {
                                    "text-gray-950 font-semibold": pathname.includes(path.href)
                                }
                            )}>
                                {path.name}
                                {pathname.includes(path.href) && (
                                    <div className="absolute bottom-0 inset-x-0 h-0.5 rounded-full bg-gray-950 transition-all duration-300"></div>
                                )}
                            </Link>
                        ))
                    }
                </div>
            </Sheet>
        </>
    )
}