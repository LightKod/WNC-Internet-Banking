'use client'

import { forwardRef, useImperativeHandle, useState } from "react"

interface OTPInputProps {
    length: number,
    setOtp: React.Dispatch<React.SetStateAction<string>> 
}

// Expose the getOtp, clearOtp and currentPage functions to parent node
export interface OTPInputRef {
    clearOtp: () => void
}

export const OTPInput = forwardRef<OTPInputRef, OTPInputProps>(function OTPInput (props, ref) {
    const [otp, setOtp] = useState<string[]>(new Array(props.length).fill(""))
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value
        if (/^\d$/.test(value) || value === "") {
            const newOtp = [...otp]
            newOtp[index] = value
            setOtp(newOtp)
            props.setOtp(newOtp.join(""))

            if (value !== "" && index < props.length - 1) {
                const nextInput = document.getElementById(`otp_input_${index + 1}`)
                nextInput?.focus()
            }
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace" && otp[index] === "") {
            if (index > 0) {
                const prevInput = document.getElementById(`otp_input_${index - 1}`)
                prevInput?.focus()
            }
        }
    }

    const clearOtp = () => {
        const clearedOtp = new Array(props.length).fill("")
        setOtp(clearedOtp)
        props.setOtp("")
    }

    useImperativeHandle(ref, () => ({
        clearOtp
    }))

    return (
        <div className="flex flex-col gap-y-4 items-center">
            <div className="flex gap-x-4 w-full justify-center">
                {otp.map((digit, index) => (
                    <input key={index} id={`otp_input_${index}`} type="text" maxLength={1} value={digit} 
                        className="w-16 h-16 border-2 border-slate-300 rounded-md text-center text-2xl text-gray-950 font-bold hover:border-blue-600 focus:border-blue-600 focus:outline-none focus:ring-0 transition-all duration-300"
                        onChange={(e) => handleChange(e, index)} onKeyDown={(e) => handleKeyDown(e, index)}/>
                ))}
            </div>
            {otp.join("").length > 0 && (
                <button onClick={clearOtp} className="text-sm text-gray-500 hover:text-blue-600 font-medium transition-all duration-300">Reset</button>
            )}
        </div>
    )
})