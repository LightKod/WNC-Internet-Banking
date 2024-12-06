import { SparklesIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function Logo() {
    return (
        <Link href="/dashboard" className="group p-2 border-r-2 border-slate-100 hidden md:block">
            <div className="rounded-md bg-gradient-to-tr bg-[length:200%_200%] bg-[0%_100%] from-blue-600 via-blue-800 to-blue-600 w-full h-full relative group-hover:bg-[100%_0%] transition-all duration-300 overflow-hidden">
                <span className="absolute top-1/2 left-0 translate-x-4 -translate-y-1/2 opacity-50 font-extrabold text-xl text-blue-50 group-hover:opacity-20 group-hover:translate-x-5 group-hover:-translate-y-2.5 transition-all duration-500">Bankit!</span>
                <span className="absolute top-1/2 left-0 -translate-x-2 -translate-y-1/2 opacity-0 font-extrabold text-xl text-blue-50 group-hover:opacity-100 group-hover:translate-x-4 transition-all duration-300">Bankit!</span>
                <SparklesIcon className="w-16 absolute origin-bottom top-1/2 right-0 translate-x-9 -translate-y-1/2 rotate-[60deg] opacity-0 text-blue-50 group-hover:opacity-25 group-hover:translate-x-7 group-hover:-translate-y-4 group-hover:rotate-0 transition-all duration-500"/>
                <SparklesIcon className="w-16 absolute origin-bottom top-1/2 right-0 translate-x-6 -translate-y-1/2 rotate-45 opacity-0 text-blue-50 group-hover:opacity-100 group-hover:translate-x-4 group-hover:rotate-0 transition-all duration-300"/>
            </div>
        </Link>
    )
}