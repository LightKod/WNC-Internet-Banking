'use client'

import { CheckIcon } from "@heroicons/react/16/solid"
import clsx from "clsx"
import { forwardRef, useImperativeHandle, useState } from "react"

interface StepIndicatorProps {
    steps: string[]
}

// Expose the nextStep prevStep functions to parent node
export interface StepIndicatorRef {
    nextStep: () => void,
    prevStep: () => void
}

const gridColStyles: Record<number, string> = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5'
}

export const StepIndicator = forwardRef<StepIndicatorRef, StepIndicatorProps>(function StepIndicator (props, ref) {
    const stepLength = props.steps.length
    const gridStyle = `grid ${gridColStyles[stepLength] || 'grid-cols-1'} gap-4 group`
    const [currentStep, setCurrentStep] = useState<number>(0)

    useImperativeHandle(ref, () => ({
        nextStep: () => setCurrentStep((prev) => prev + 1),
        prevStep: () => setCurrentStep((prev) => prev - 1)
    }))

    return (
        <div className={gridStyle}>
            {props.steps.map((step, index) => (
                <div key={index} className="flex flex-col">
                    <div className="flex gap-x-4 items-center">
                        <div className={clsx(
                            "relative w-8 h-8 border-2 rounded-full shrink-0 transition-all duration-300",
                            {
                                "border-blue-200 bg-blue-200": currentStep < index,
                                "border-blue-600 bg-transparent": currentStep === index,
                                "border-green-700 bg-green-700": currentStep > index
                            }
                        )}>
                            <div className={clsx(
                                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  rounded-full transition-all duration-300",
                                {
                                    "w-0 h-0 bg-blue-200": currentStep < index,
                                    "w-3/4 h-3/4 bg-blue-600": currentStep === index,
                                    "w-full h-full bg-green-700": currentStep > index
                                }
                            )}/>
                            <CheckIcon className={clsx(
                                "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white transition-all duration-300", {
                                    "opacity-100 w-4": currentStep > index,
                                    "opacity-0 w-2": currentStep === index || currentStep < index
                                }
                            )}/>
                        </div>
                        {index !== stepLength - 1 && (
                            <div className="relative w-full h-1 rounded-md grow bg-blue-200">
                                <div className={clsx(
                                    "absolute top-0 left-0 h-full rounded-md transition-all duration-300",
                                    {
                                        "w-0": currentStep < index,
                                        "w-1/2 bg-blue-600": currentStep === index,
                                        "w-full bg-green-700": currentStep > index
                                    }
                                )}/>
                            </div>
                        )} 
                    </div>
                    <div className="flex flex-col pt-0 max-h-0 h-full opacity-0 gap-y-0.5 group-hover:pt-4 group-hover:max-h-full group-hover:opacity-100 transition-all duration-300 overflow-hidden">
                        <span className="text-[0.625rem] tracking-widest text-gray-500">{`STEP ${index + 1}`}</span>
                        <span className="text-gray-950 font-semibold">{step}</span>
                        <span className={clsx(
                            "text-xs font-medium",
                            {
                                "text-green-600": currentStep > index,
                                "text-blue-600": currentStep === index,
                                "text-gray-500": currentStep < index
                            }
                        )}>
                            {currentStep > index ? "Completed" : currentStep === index ? "In Progress" : "Pending"}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    )
})