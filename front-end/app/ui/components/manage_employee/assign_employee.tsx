'use client'

import { useRef } from "react"
import { ArrowRightIcon, PlusIcon, XMarkIcon } from "@heroicons/react/16/solid"
import clsx from "clsx"
import Modal, { ModalRef } from "../universal/modal"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { AssignEmployeeFormValues, assignEmployeeSchema } from "@/app/lib/schemas/schemas"

export default function AssignEmployee() {
    const { handleSubmit, register, setValue, reset, getValues, formState: { errors } } = useForm<AssignEmployeeFormValues>({
        resolver: zodResolver(assignEmployeeSchema)
    })
    const modalRef = useRef<ModalRef>(null)

    const handleOpenModal = () => {
        modalRef.current?.openModal()
    }

    const onSubmit = () => {
        console.log(`Assign this username to be employee: ${getValues("username")}`)

        modalRef.current?.closeModal()
    }

    const handleCancel = () => {
        modalRef.current?.closeModal()
    }
    
    return (
        <>
            <button onClick={handleOpenModal} className="flex items-center justify-center gap-2 rounded-md px-3 py-2 bg-blue-600 text-blue-50 text-sm font-medium hover:bg-blue-700 transition-colors duration-300">
                <PlusIcon className="w-4"/>
                <p className="hidden md:block">Assign</p>
            </button>

            <Modal ref={modalRef} size="md" heading="Assign a new employee" onClose={() => reset()}>
                <form className="flex flex-col gap-y-4">
                    <p className="text-gray-500 text-xs">Fill in the below form and submit to assign a new employee</p>
                    <div className="relative flex flex-col">
                        <input {...register("username")} type="text" id="username" className="block w-full py-2 px-0.5 text-sm text-gray-950 bg-transparent border-1 border-l-0 border-r-0 border-t-0 border-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors duration-300 peer" placeholder=" "/>
                        <label htmlFor="username" className="absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Employee's username</label>
                        {errors.username && <p className="text-red-500 text-xs mt-2">{errors.username.message}</p>}
                    </div>
                    <div className="flex flex-col-reverse gap-y-2 md:flex-row md:justify-end md:items-center md:gap-y-0 md:gap-x-2">
                        <button type="button" onClick={handleCancel} className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-slate-200 text-gray-950 text-sm font-medium hover:bg-slate-300 transition-colors duration-300">
                            <XMarkIcon className="w-4"/>
                            <p>Cancel</p>
                        </button>
                        <button type="submit" onClick={handleSubmit(onSubmit)} className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-blue-600 text-blue-50 text-sm font-medium hover:bg-blue-700 transition-colors duration-300">
                            <ArrowRightIcon className="w-4"/>
                            <p>Submit</p>
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    )
}