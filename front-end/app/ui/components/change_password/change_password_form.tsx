'use client'

import { ChangePasswordFormValues, changePasswordSchema } from "@/app/lib/schemas/schemas"
import { ArrowRightIcon } from "@heroicons/react/16/solid"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

export default function ChangePasswordForm() {
    const { handleSubmit, register, watch, formState: { errors } } = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema)
    })

    const onSubmit = (data: ChangePasswordFormValues) => {
        console.log(data)   
    }

    return (
        <div className="flex flex-col gap-y-8 bg-white rounded-md shadow-sm border-2 border-slate-100">
            <div className="flex flex-col gap-y-8 p-8">
                <div className="flex flex-col gap-y-1">
                    <div className="flex gap-x-2 items-baseline">
                        <span className="text-xs tracking-wider text-gray-500">ONLY STEP</span>
                        <p className="text-xl text-gray-950 font-bold">Request information</p>
                    </div>
                    <p className="text-sm text-gray-500">Fill in the form below to provide necessary information for the request</p>
                </div>
                <form className="grid grid-cols-1 divide-y-2 divide-slate-100 md:grid-cols-[2fr_1fr] md:divide-x-2 md:divide-y-0">
                    <div className="flex flex-col gap-y-4 pb-4 md:pr-4 md:pb-0">
                        <div className="relative mt-2 flex flex-col">
                            <input {...register("oldPassword")} type="password" id="oldPassword" className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors duration-300 peer" placeholder=" "/>
                            <label htmlFor="oldPassword" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Old password</label>
                            {errors.oldPassword && <p className="text-red-500 text-xs mt-2">{errors.oldPassword.message}</p>}
                        </div>
                        <div className="relative mt-2 flex flex-col">
                            <input {...register("newPassword")} type="password" id="newPassword" className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors duration-300 peer" placeholder=" "/>
                            <label htmlFor="newPassword" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">New password</label>
                            {errors.newPassword && <p className="text-red-500 text-xs mt-2">{errors.newPassword.message}</p>}
                        </div>
                    </div>
                    <div className="w-full h-full pt-4 md:pl-4 md:pt-0">
                        <div className="flex flex-col gap-y-2">
                            <button type="button" onClick={handleSubmit(onSubmit)} className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-blue-600 text-blue-50 text-sm font-medium hover:bg-blue-700 transition-colors duration-300">
                                <ArrowRightIcon className="w-4"/>
                                <p>Change password</p>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}