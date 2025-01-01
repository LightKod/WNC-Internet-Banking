'use client'

import { createContext, RefObject, useEffect, useRef, useState } from "react"
import { StepIndicator, StepIndicatorRef } from "../universal/step_indicator"
import { Page, PageSlider, PageSliderRef } from "../universal/page_slider"
import { BuildingLibraryIcon, BuildingOffice2Icon } from "@heroicons/react/24/outline"
import { InternalTransferForm, InternalTransferRef } from "./internal_transfer_form"
import ConfirmTransfer from "./confirm_transfer"
import VerifyOTP from "./verify_otp"
import SuccessfulTransfer from "./successful_transfer"
import FailedTransfer from "./failed_transfer"
import Modal, { ModalRef } from "../universal/modal"
import { APIResponse, Contact } from "@/app/lib/definitions/definition"
import { formatAccountNumber } from "@/app/lib/utilities/utilities"
import { InterbankTransferForm, InterbankTransferRef } from "./interbank_transfer_form"
import { getInternalContacts } from "@/app/lib/actions/actions"
import ContactModalLoading from "../universal/contact_modal_loading"

interface PageContentContextType {
    nextStep: () => void,
    prevStep: () => void,
    transferType: string | null,
    setTransferType: React.Dispatch<React.SetStateAction<string | null>>,
    setIsFormValid: React.Dispatch<React.SetStateAction<boolean>>,
    transactionId: string,
    setTransactionId: React.Dispatch<React.SetStateAction<string>>,
    setIsTransactionSuccessful: React.Dispatch<React.SetStateAction<APIResponse | null>>,
    internalFormRef: RefObject<InternalTransferRef>,
    interbankFormRef: RefObject<InterbankTransferRef>
    handleOpenModal: () => void
}

export const PageContentContext = createContext<PageContentContextType | null>(null)

export default function TransferPageContent() {
    const [transferType, setTransferType] = useState<string | null>(null)
    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const [transactionId, setTransactionId] = useState<string>("")
    const [isTransactionSuccessful, setIsTransactionSuccessful] = useState<APIResponse | null>(null)

    const stepIndicatorRef = useRef<StepIndicatorRef>(null)
    const pageSliderRef = useRef<PageSliderRef>(null)
    const internalFormRef = useRef<InternalTransferRef>(null)
    const interbankFormRef = useRef<InterbankTransferRef>(null)

    const nextStep = () => {
        stepIndicatorRef.current?.nextStep()
        pageSliderRef.current?.nextPage()
    }

    const prevStep = () => {
        stepIndicatorRef.current?.prevStep()
        pageSliderRef.current?.prevPage()
    }

    const handleTransferTypeSelected = (transferType: string | null) => {
        setTransferType(transferType)
        nextStep()
    }

    const modalRef = useRef<ModalRef>(null)
    const [isFetchingContactList, setIsFetchingContactList] = useState<boolean>(false)
    const [contactList, setContactList] = useState<Contact[]>([])

    const handleOpenModal = () => {
        setIsFetchingContactList(true)
        modalRef.current?.openModal()
    }

    const handleSelectReceiver = (accountNumber: string) => {
        if(transferType === "internal") {
            internalFormRef.current?.setValue("receiverAccountNumber", accountNumber)
        }
        else if (transferType === "interbank") {
            interbankFormRef.current?.setValue("receiverAccountNumber", accountNumber)
            interbankFormRef.current?.setValue("bankCode", "PGP")
        }

        modalRef.current?.closeModal()
    }

    useEffect(() => {
        const fetchContactList = async () => {
            let result: Contact[] = []
            // Fetch internal contacts
            if(transferType === "internal") {
                result = await getInternalContacts()
            } else {
                console.log("Fetch for interbank accounts")
            }

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
                    <StepIndicator ref={stepIndicatorRef} steps={["Transfer Type", "Transfer Information", "Review", "Verify"]}/>
                </div>
                <PageContentContext.Provider value={{
                    nextStep,
                    prevStep,
                    transferType,
                    setTransferType,
                    setIsFormValid,
                    transactionId,
                    setTransactionId,
                    setIsTransactionSuccessful,
                    internalFormRef,
                    interbankFormRef,
                    handleOpenModal
                }}>
                    <PageSlider ref={pageSliderRef}>
                        <Page>
                            <div className="flex flex-col gap-y-8 px-8 pb-8">
                                <div className="flex flex-col gap-y-1">
                                    <div className="flex gap-x-2 items-baseline">
                                        <span className="text-xs tracking-wider text-gray-500">STEP 1</span>
                                        <p className="text-xl text-gray-950 font-bold">Choose a transfer type</p>
                                    </div>
                                    <p className="text-sm text-gray-500">To transfer money to another account, you should first choose a transfer type</p>
                                </div>
                                <div className="flex flex-col items-stretch justify-center gap-y-4 md:flex-row md:gap-x-4 md:gap-y-0">
                                    <button onClick={() => handleTransferTypeSelected("internal")} className="group flex flex-col gap-y-4 w-full p-4 border-2 border-slate-300 rounded-md hover:border-blue-600 md:max-w-64 transition-all duration-300">
                                        <BuildingLibraryIcon className="w-8 text-gray-500 group-hover:text-gray-950 transition-all duration-300"/>
                                        <div className="flex flex-col gap-y-0.5">
                                            <p className="font-semibold text-start text-gray-500 group-hover:text-gray-950 transition-all duration-300">Internal Transfer</p>
                                            <p className="text-xs text-start text-gray-400 group-hover:text-gray-500 transition-all duration-300">Perform an internal transfer between bank accounts within Bankit!</p>
                                        </div>
                                    </button>
                                    <button onClick={() => handleTransferTypeSelected("interbank")} className="group flex flex-col gap-y-4 w-full p-4 border-2 border-slate-300 rounded-md hover:border-blue-600 md:max-w-64 transition-all duration-300">
                                        <BuildingOffice2Icon className="w-8 text-gray-500 group-hover:text-gray-950 transition-all duration-300"/>
                                        <div className="flex flex-col gap-y-0.5">
                                            <p className="font-semibold text-start text-gray-500 group-hover:text-gray-950 transition-all duration-300">Interbank Transfer</p>
                                            <p className="text-xs text-start text-gray-400 group-hover:text-gray-500 transition-all duration-300">Perform an interbank transfer from Bankit! to an account from an external bank.</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </Page>
                        <Page>
                            {transferType === "internal" && (
                                <InternalTransferForm ref={internalFormRef}/>
                            )}
                            {transferType === "interbank" && (
                                <InterbankTransferForm ref={interbankFormRef}/>
                            )}
                        </Page>
                        <Page>
                            {isFormValid && <ConfirmTransfer/>}
                        </Page>
                        <Page>
                            {transactionId !== "" && <VerifyOTP/>}
                        </Page>
                        <Page>
                            {isTransactionSuccessful?.isSuccessful && <SuccessfulTransfer/>}
                        </Page>
                    </PageSlider>
                </PageContentContext.Provider>
            </div>
            <Modal ref={modalRef} size="sm" heading="Choose a receiver">
                {isFetchingContactList ? (
                    <ContactModalLoading/>
                ) : (
                    <div className="flex flex-col divide-y-2 divide-slate-100 overflow-y-auto">
                        {contactList.map((contact) => (
                            <button onClick={() => handleSelectReceiver(contact.accountNumber)} key={contact.accountNumber} className="group flex gap-x-4 items-center p-4 rounded-md hover:bg-slate-100 transition-all duration-300">
                                <div className="flex items-center justify-center flex-none w-12 h-12 rounded-full bg-slate-300 text-gray-950 font-semibold">
                                    {contact.name.charAt(0).toUpperCase()}
                                 </div>
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