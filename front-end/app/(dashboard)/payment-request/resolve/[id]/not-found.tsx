import { ArrowLeftIcon } from "@heroicons/react/16/solid";
import { CubeTransparentIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="h-full flex flex-col p-16 gap-y-4 items-center justify-center text-gray-950 lg:px-48">
            <CubeTransparentIcon className="w-16"/>
            <div className="flex flex-col gap-y-1 items-center">
                <h2 className="font-semibold">Oops! Not found!</h2>
                <p className="text-xs text-gray-500 text-center">The page you are looking for does not exist.</p>
            </div>
            <Link href="/payment-request" className="flex items-center justify-center gap-2 rounded-md px-3 py-2 bg-blue-600 text-blue-50 text-sm font-medium hover:bg-blue-700 transition-colors duration-300">
                <ArrowLeftIcon className="w-4"/>
                <p className="hidden md:block">Go back</p>
            </Link>
        </div>
    )
}