'use client'

import { useContext, useEffect, useRef, useState } from "react"
import { PageContentContext } from "./transfer_page_content"
import { OTPInput, OTPInputRef } from "../universal/otp_input"
import { ArrowRightIcon, XMarkIcon } from "@heroicons/react/16/solid"
import { confirmInterbankTransfer, confirmInternalTransfer } from "@/app/lib/actions/actions"
import { APIResponse } from "@/app/lib/definitions/definition"

export default function VerifyOTP() {
    const context = useContext(PageContentContext)

    if(!context){
        throw new Error('Something went wrong')
    }

    const [otp, setOtp] = useState<string>("")
    const [timeLeft, setTimeLeft] = useState(30)
    const [canResend, setCanResend] = useState(false)
    const [otpError, setOtpError] = useState<string | null>(null)
    const otpRef = useRef<OTPInputRef>(null)

    useEffect(() => {
        if (timeLeft === 0) {
            setCanResend(true)
            return
        }
    
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1)
        }, 1000)
    
        return () => clearInterval(timer)
    }, [timeLeft])

    const handleResend = () => {
        setCanResend(false)
        setTimeLeft(30)
    }

    const handleSubmitOtp = async () => {
        // Send the otp via server actions and receive the response
        // Check if there is any otp's error and stop the code here
        if(context.transferType === "internal") {
            const response: APIResponse = await confirmInternalTransfer(context.transactionId, otp)
            if(response.isSuccessful) {
                context.setIsTransactionSuccessful(response)
                context.nextStep()
            } else {
                if(response.error.code === 1 || response.error.code === 2) {
                    otpRef.current?.clearOtp()
                    setOtpError(response.error.message)
                } else {
                    context.setIsTransactionSuccessful(response)
                    context.nextStep()
                }
            }
        }
        else {
            const response: APIResponse = await confirmInterbankTransfer(context.transactionId, otp, context.interbankFormRef.current?.getValues("bankCode") || "")
            if(response.isSuccessful) {
                context.setIsTransactionSuccessful(response)
                context.nextStep()
            } else {
                if(response.error.code === 1 || response.error.code === 2) {
                    otpRef.current?.clearOtp()
                    setOtpError(response.error.message)
                } else {
                    context.setIsTransactionSuccessful(response)
                    context.nextStep()
                }
            }
        }
    }

    return (
        <div className="flex flex-col gap-y-8 px-8 pb-8">
            <div className="flex flex-col gap-y-1">
                <div className="flex gap-x-2 items-baseline">
                    <span className="text-xs tracking-wider text-gray-500">STEP 4</span>
                    <p className="text-xl text-gray-950 font-bold">Verify your transaction</p>
                </div>
                <p className="text-sm text-gray-500">Check the email we have sent and fill in the below OTP input to complete your transaction</p>
            </div>
            <div className="grid grid-cols-1 divide-y-2 divide-slate-100 md:grid-cols-[2fr_1fr] md:divide-x-2 md:divide-y-0 ">
                <div className="flex flex-col gap-y-4 pb-4 md:pr-4 md:pb-0">
                    <OTPInput ref={otpRef} length={6} setOtp={setOtp}/>
                    <div className="text-sm text-gray-500 text-center">Have not received an email yet? {' '}
                        {canResend ? (
                            <button onClick={handleResend} className="text-sm text-gray-500 hover:text-blue-600 font-medium transition-all duration-300">Resend OTP</button>
                        ) : (
                            <p className="text-sm text-gray-500">You can resend after {' '}
                                <span className="text-blue-600 font-medium">{`${timeLeft}s`}</span>
                            </p>
                        )}
                    </div>
                </div>
                <div className="w-full h-full pt-4 md:pl-4 md:pt-0">
                    <div className="flex flex-col gap-y-2">
                        <button onClick={handleSubmitOtp} type="button" className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-blue-600 text-blue-50 text-sm font-medium hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors duration-300" disabled={otp.length !== 6}>
                            <ArrowRightIcon className="w-4"/>
                            <p>Continue</p>
                        </button>
                        <button onClick={() => window.location.reload()} type="button" className="flex items-center justify-center gap-2 rounded-md px-3 py-2.5 bg-slate-200 text-gray-950 text-sm font-medium hover:bg-slate-300 transition-colors duration-300">
                            <XMarkIcon className="w-4"/>
                            <p>Cancel transfer</p>
                        </button>
                        {otpError && <p className="text-red-500 text-xs">{otpError}</p>}
                    </div>
                </div>
            </div>
        </div>
    )
}