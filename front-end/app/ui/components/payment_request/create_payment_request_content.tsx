'use client'

import { createContext, RefObject, useEffect, useRef, useState } from "react"
import { StepIndicator, StepIndicatorRef } from "../universal/step_indicator"
import { Page, PageSlider, PageSliderRef } from "../universal/page_slider"
import Modal, { ModalRef } from "../universal/modal"
import { APIResponse, Contact } from "@/app/lib/definitions/definition"
import { PaymentRequestForm, PaymentRequestRef } from "./payment_request_form"
import { formatAccountNumber } from "@/app/lib/utilities/utilities"
import ConfirmPaymentRequest from "./confirm_payment_request"
import SuccessfulRequest from "./successful_request"
import FailedRequest from "./failed_request"

interface PageContentContextType {
    nextStep: () => void,
    prevStep: () => void,
    setIsFormValid: React.Dispatch<React.SetStateAction<boolean>>,
    isRequestSuccessful: APIResponse | null,
    setIsRequestSuccessful: React.Dispatch<React.SetStateAction<APIResponse | null>>,
    formRef: RefObject<PaymentRequestRef>,
    handleOpenModal: () => void
}

export const PageContentContext = createContext<PageContentContextType | null>(null)

export default function CreatePaymentRequestContent() {
    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const [isRequestSuccessful, setIsRequestSuccessful] = useState<APIResponse | null>(null)

    const stepIndicatorRef = useRef<StepIndicatorRef>(null)
    const pageSliderRef = useRef<PageSliderRef>(null)
    const formRef = useRef<PaymentRequestRef>(null)

    const nextStep = () => {
        stepIndicatorRef.current?.nextStep()
        pageSliderRef.current?.nextPage()
    }

    const prevStep = () => {
        stepIndicatorRef.current?.prevStep()
        pageSliderRef.current?.prevPage()
    }

    const modalRef = useRef<ModalRef>(null)
    const [isFetchingContactList, setIsFetchingContactList] = useState<boolean>(false)
    const [contactList, setContactList] = useState<Contact[]>([])

    const handleOpenModal = () => {
        setIsFetchingContactList(true)
        modalRef.current?.openModal()
    }

    const handleSelectReceiver = (accountNumber: string) => {
        formRef.current?.setValue("receiverAccountNumber", accountNumber)
        modalRef.current?.closeModal()
    }

    useEffect(() => {
        const fetchContactList = async () => {
            // Fetch internal contacts
            const result: Contact[] = [
                {
                    name: "Jerry B.",
                    bankName: "",
                    accountNumber: "123456789101"
                },
                {
                    name: "Andy R.",
                    bankName: "",
                    accountNumber: "987654321987"
                },
                {
                    name: "Meo meo",
                    bankName: "",
                    accountNumber: "486215793852"
                }
            ]

            setContactList(result)
            setIsFetchingContactList(false)
        }

        if(isFetchingContactList) {
            fetchContactList()
        }
    }, [isFetchingContactList])

    return (
        <>
            <div className="flex flex-col gap-y-8 bg-white rounded-md shadow-sm border-2 border-slate-100">
                <div className="px-12 md:px-24 pt-8">
                    <StepIndicator ref={stepIndicatorRef} steps={["Request Information", "Review"]}/>
                </div>
                <PageContentContext.Provider value={{
                    nextStep,
                    prevStep,
                    setIsFormValid,
                    isRequestSuccessful,
                    setIsRequestSuccessful,
                    formRef,
                    handleOpenModal
                }}>
                    <PageSlider ref={pageSliderRef}>
                        <Page>
                            <PaymentRequestForm ref={formRef}/>
                        </Page>
                        <Page>
                            {isFormValid && <ConfirmPaymentRequest/>}
                        </Page>
                        <Page>
                            {isRequestSuccessful?.isSuccessful ? <SuccessfulRequest/> : <FailedRequest/>}
                        </Page>
                    </PageSlider>
                </PageContentContext.Provider>
            </div>
            <Modal ref={modalRef} size="sm" heading="Choose a debtor">
                {isFetchingContactList ? (
                    <div>Loading...</div>
                ) : (
                    <div className="flex flex-col divide-y-2 divide-slate-100 overflow-y-auto">
                        {contactList.map((contact) => (
                            <button onClick={() => handleSelectReceiver(contact.accountNumber)} key={contact.accountNumber} className="group flex gap-x-4 items-center p-4 rounded-md hover:bg-slate-200 transition-all duration-300">
                                <div className="w-12 h-12 rounded-full bg-slate-500"/>
                                <div className="flex flex-col gap-y-0.5 items-start">
                                    <span className="text-gray-500 font-semibold group-hover:text-gray-950 transition-all duration-300">{contact.name}</span>
                                    <span className="text-gray-400 text-sm group-hover:text-gray-500 transition-all duration-300">{contact.bankName}</span>
                                    <span className="text-gray-400 text-sm group-hover:text-gray-500 transition-all duration-300">{formatAccountNumber(contact.accountNumber)}</span>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </Modal>
        </>
    )
}