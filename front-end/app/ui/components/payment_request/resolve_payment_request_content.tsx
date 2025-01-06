'use client'

import { createContext, useRef, useState } from "react"
import { StepIndicator, StepIndicatorRef } from "../universal/step_indicator"
import { Page, PageSlider, PageSliderRef } from "../universal/page_slider"
import { APIResponse, DetailedPaymentRequest } from "@/app/lib/definitions/definition"
import ReviewPaymentRequest from "./review_payment_request"
import VerifyOTP from "./verify_otp"
import SuccessfulPayment from "./successful_payment"
import { resolvePaymentRequest } from "@/app/lib/actions/actions"
import FailedPayment from "./failed_payment"

interface PageContentContextType {
    nextStep: () => void,
    prevStep: () => void,
    isTransactionSuccessful: APIResponse | null,
    setIsTransactionSuccessful: React.Dispatch<React.SetStateAction<APIResponse | null>>,
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
    const [isTransactionSuccessful, setIsTransactionSuccessful] = useState<APIResponse | null>(null)
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

    const onConfirm = async () => {
        const transactionId = await resolvePaymentRequest(paymentRequest)
        if(!transactionId.status) {
            setIsTransactionSuccessful(null)
            setTransactionId(transactionId)
            nextStep()
        } else {
            setIsTransactionSuccessful({
                isSuccessful: false,
                error: {
                    code: transactionId.code,
                    message: transactionId.message
                }
            })
        }
    }

    return (
        <div className="flex flex-col gap-y-8 bg-white rounded-md shadow-sm border-2 border-slate-100">
            <div className="px-12 md:px-24 pt-8">
                <StepIndicator ref={stepIndicatorRef} steps={["Review", "Verify"]}/>
            </div>
            <PageContentContext.Provider value={{
                nextStep,
                prevStep,
                isTransactionSuccessful,
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
                        {isTransactionSuccessful?.isSuccessful ? <SuccessfulPayment/> : <FailedPayment/>}
                    </Page>
                </PageSlider>
            </PageContentContext.Provider>
        </div>
    )
}