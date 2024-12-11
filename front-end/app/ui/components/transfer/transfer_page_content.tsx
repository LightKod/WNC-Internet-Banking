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

interface PageContentContextType {
    nextStep: () => void,
    prevStep: () => void,
    transferType: string | null,
    setTransferType: React.Dispatch<React.SetStateAction<string | null>>,
    setIsFormValid: React.Dispatch<React.SetStateAction<boolean>>,
    transactionId: string,
    setTransactionId: React.Dispatch<React.SetStateAction<string>>,
    setIsTransactionSuccessful: React.Dispatch<React.SetStateAction<boolean | null>>,
    formRef: RefObject<InternalTransferRef>
}

export const PageContentContext = createContext<PageContentContextType | null>(null)

export default function TransferPageContent() {
    const [transferType, setTransferType] = useState<string | null>(null)
    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const [transactionId, setTransactionId] = useState<string>("")
    const [isTransactionSuccessful, setIsTransactionSuccessful] = useState<boolean | null>(null)

    const stepIndicatorRef = useRef<StepIndicatorRef>(null)
    const pageSliderRef = useRef<PageSliderRef>(null)
    const formRef = useRef<InternalTransferRef>(null)

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

    return (
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
                formRef
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
                            <InternalTransferForm ref={formRef}/>
                        )}
                    </Page>
                    <Page>
                        {isFormValid && <ConfirmTransfer/>}
                    </Page>
                    <Page>
                        {transactionId !== "" && <VerifyOTP/>}
                    </Page>
                    <Page>
                        {isTransactionSuccessful === true && <SuccessfulTransfer/>}
                    </Page>
                </PageSlider>
            </PageContentContext.Provider>
        </div>
    )
}