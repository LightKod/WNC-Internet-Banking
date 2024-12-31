'use client'

import { createContext, RefObject, useRef, useState } from "react"
import { StepIndicator, StepIndicatorRef } from "../universal/step_indicator"
import { Page, PageSlider, PageSliderRef } from "../universal/page_slider"
import { RechargeForm, RechargeRef } from "./recharge_form"
import ConfirmRecharge from "./confirm_recharge"
import SuccessfulRequest from "./successful_request"
import { APIResponse } from "@/app/lib/definitions/definition"
import FailedRequest from "./failed_request"

interface PageContentContextType {
    nextStep: () => void,
    prevStep: () => void,
    setIsFormValid: React.Dispatch<React.SetStateAction<boolean>>,
    isRequestSuccessful: APIResponse | null,
    setIsRequestSuccessful: React.Dispatch<React.SetStateAction<APIResponse | null>>,
    formRef: RefObject<RechargeRef>,
}

export const PageContentContext = createContext<PageContentContextType | null>(null)

export default function RechargePageContent() {
    const [isFormValid, setIsFormValid] = useState<boolean>(false)
    const [isRequestSuccessful, setIsRequestSuccessful] = useState<APIResponse | null>(null)

    const stepIndicatorRef = useRef<StepIndicatorRef>(null)
    const pageSliderRef = useRef<PageSliderRef>(null)
    const formRef = useRef<RechargeRef>(null)

    const nextStep = () => {
        stepIndicatorRef.current?.nextStep()
        pageSliderRef.current?.nextPage()
    }

    const prevStep = () => {
        stepIndicatorRef.current?.prevStep()
        pageSliderRef.current?.prevPage()
    }

    return (
        <div className="flex flex-col gap-y-8 bg-white rounded-md shadow-sm border-2 border-slate-100">
            <div className="px-12 md:px-24 pt-8">
                <StepIndicator ref={stepIndicatorRef} steps={["Recharge Information", "Review"]}/>
            </div>
            <PageContentContext.Provider value={{
                nextStep,
                prevStep,
                setIsFormValid,
                isRequestSuccessful,
                setIsRequestSuccessful,
                formRef
            }}>
                <PageSlider ref={pageSliderRef}>
                    <Page>
                        <RechargeForm ref={formRef}/>
                    </Page>
                    <Page>
                        {isFormValid && <ConfirmRecharge/>}
                    </Page>
                    <Page>
                        {isRequestSuccessful?.isSuccessful ? <SuccessfulRequest/> : <FailedRequest/>}
                    </Page>
                </PageSlider>
            </PageContentContext.Provider>
        </div>
    )
}