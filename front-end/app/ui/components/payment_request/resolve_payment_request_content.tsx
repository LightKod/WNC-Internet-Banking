'use client'

import { createContext, useRef, useState } from "react"
import { StepIndicator, StepIndicatorRef } from "../universal/step_indicator"
import { Page, PageSlider, PageSliderRef } from "../universal/page_slider"
import { InternalTransferFormValues } from "@/app/lib/schemas/schemas"
import { Contact, DetailedPaymentRequest } from "@/app/lib/definitions/definition"
import ReviewPaymentRequest from "./review_payment_request"
import VerifyOTP from "./verify_otp"
import SuccessfulPayment from "./successful_payment"

interface PageContentContextType {
    nextStep: () => void,
    prevStep: () => void,
    setIsTransactionSuccessful: React.Dispatch<React.SetStateAction<boolean | null>>,
    id: string,
    transactionId: string,
    setTransactionId: React.Dispatch<React.SetStateAction<string>>,
    paymentRequest: DetailedPaymentRequest
    onConfirm: () => void
}

export const PageContentContext = createContext<PageContentContextType | null>(null)

export default function ResolvePaymentRequestContent({
    id,
    paymentRequest
} : {
    id: string,
    paymentRequest: DetailedPaymentRequest
}) {
    const [isTransactionSuccessful, setIsTransactionSuccessful] = useState<boolean | null>(null)
    const [transactionId, setTransactionId] = useState<string>("")

    const stepIndicatorRef = useRef<StepIndicatorRef>(null)
    const pageSliderRef = useRef<PageSliderRef>(null)

    const nextStep = () => {
        stepIndicatorRef.current?.nextStep()
        pageSliderRef.current?.nextPage()
    }

    const prevStep = () => {
        stepIndicatorRef.current?.prevStep()
        pageSliderRef.current?.prevPage()
    }

    const onConfirm = () => {
        setTransactionId(id)
        nextStep()
    }

    return (
        <div className="flex flex-col gap-y-8 bg-white rounded-md shadow-sm border-2 border-slate-100">
            <div className="px-12 md:px-24 pt-8">
                <StepIndicator ref={stepIndicatorRef} steps={["Review", "Verify"]}/>
            </div>
            <PageContentContext.Provider value={{
                nextStep,
                prevStep,
                setIsTransactionSuccessful,
                id,
                transactionId,
                setTransactionId,
                paymentRequest,
                onConfirm
            }}>
                <PageSlider ref={pageSliderRef}>
                    <Page>
                        <ReviewPaymentRequest/>
                    </Page>
                    <Page>
                        {transactionId !== "" && <VerifyOTP/>}
                    </Page>
                    <Page>
                        {isTransactionSuccessful === true && <SuccessfulPayment/>}
                    </Page>
                </PageSlider>
            </PageContentContext.Provider>
        </div>
    )
}