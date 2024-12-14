'use client'

import Link from "next/link"
import { Page, PageSlider, PageSliderRef } from "../universal/page_slider"
import { PlusIcon, XMarkIcon } from "@heroicons/react/16/solid"
import { useRef, useState } from "react"
import clsx from "clsx"
import SelfPaymentRequestList from "./self_payment_request_list"
import OtherPaymentRequestList from "./other_payment_request_list"
import Modal, { ModalRef } from "../universal/modal"
import { useForm } from "react-hook-form"
import { cancelPaymentRequestSchema, CancelPaymentRequestFormValue } from "@/app/lib/schemas/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowRightIcon } from "@heroicons/react/16/solid"

export default function PaymentRequestPageContent() {
    const [currentPage, setCurrentPage] = useState<number>(0)
    const pageSliderRef = useRef<PageSliderRef>(null)

    const handleNextPage = () => {
        setCurrentPage(1)
        pageSliderRef.current?.nextPage()
    }

    const handlePrevPage = () => {
        setCurrentPage(0)
        pageSliderRef.current?.prevPage()
    }

    const { handleSubmit, register, setValue, reset, getValues, formState: { errors } } = useForm<CancelPaymentRequestFormValue>({
        resolver: zodResolver(cancelPaymentRequestSchema)
    })
    const modalRef = useRef<ModalRef>(null)

    const handleOpenModal = (requestId: string) => {
        setValue("paymentRequestId", requestId)
        modalRef.current?.openModal()
    }

    const onSubmit = () => {
        console.log(`Delete request with id: ${getValues("paymentRequestId")}`)

        modalRef.current?.closeModal()
    }

    const handleCancel = () => {
        modalRef.current?.closeModal()
    }

    return (
        <>
            <div className="flex flex-col gap-y-4 bg-white rounded-md shadow-sm border-2 border-slate-100 md:gap-y-8">
                <div className="flex gap-x-4 px-4 pt-4 justify-between items-center md:px-8 md:pt-8">
                    <div className="flex gap-x-4 items-center">
                        <button onClick={handlePrevPage} className={clsx(
                            "px-2 py-2 text-sm border-b-2 font-medium transition-all duration-300",
                            {
                                "text-gray-500 border-slate-300 hover:text-gray-950 hover:border-blue-600": currentPage === 1,
                                "text-gray-950 border-blue-600": currentPage === 0
                            }
                        )} disabled={currentPage === 0}>Created by you</button>
                        <button onClick={handleNextPage} className={clsx(
                            "px-2 py-2 text-sm border-b-2 font-medium transition-all duration-300",
                            {
                                "text-gray-500 border-slate-300 hover:text-gray-950 hover:border-blue-600": currentPage === 0,
                                "text-gray-950 border-blue-600": currentPage === 1
                            }
                        )} disabled={currentPage === 1}>Waiting for payment</button>
                    </div>
                    <Link href="/payment-request/create" className="flex items-center justify-center gap-2 rounded-md px-3 py-2 bg-blue-600 text-blue-50 text-sm font-medium hover:bg-blue-700 transition-colors duration-300">
                        <PlusIcon className="w-4"/>
                        <p className="hidden md:block">New</p>
                    </Link>
                </div>
                <div className="flex flex-col">
                    <div className="grid grid-cols-[2fr_1fr_1fr] gap-4 items-center mx-4 pb-2 border-b-2 border-slate-100 md:grid-cols-[2fr_1fr_1fr_1fr] md:mx-8">
                        <span className="text-gray-500 text-sm">Name</span>
                        <span className="text-gray-500 text-sm hidden md:block">Date</span>
                        <span className="text-gray-500 text-sm text-center">Amount</span>
                        <span className="text-gray-500 text-sm text-end">Action</span>
                    </div>
                    <PageSlider ref={pageSliderRef}>
                        <Page>
                            <SelfPaymentRequestList handleOpenModal={handleOpenModal}/>
                        </Page>
                        <Page>
                            <OtherPaymentRequestList handleOpenModal={handleOpenModal}/>
                        </Page>
                    </PageSlider>
                </div>
            </div>

            <Modal ref={modalRef} size="lg" heading="Cancel a payment request" onClose={() => reset()}>
                <form className="flex flex-col gap-y-4">
                    <p className="text-gray-500 text-xs">Fill in the below form and submit to cancel this payment request</p>
                    <div className="relative flex flex-col">
                        <textarea {...register("content")} id="content" maxLength={500} rows={8} className="resize-none block w-full p-2 text-sm text-gray-950 bg-transparent rounded-md border-1 border-gray-500 focus:outline-none focus:ring-0 focus:border-blue-600 transition-colors duration-300 peer" placeholder=" "/>
                        <label htmlFor="content" className="absolute bg-white px-2 rounded-full text-sm text-gray-500 transform -translate-y-6 scale-75 top-4 left-0.5 origin-top-left z-10 peer-focus:start-0 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-2 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:left-0.5 after:content-['*'] after:ml-0.5 after:text-red-500 duration-300">Note</label>
                        {errors.content && <p className="text-red-500 text-xs mt-2">{errors.content.message}</p>}
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