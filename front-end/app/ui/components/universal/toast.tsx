'use client'

import {
    XMarkIcon
} from '@heroicons/react/16/solid';
import { useSpring, animated } from '@react-spring/web'
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { clsx } from 'clsx';

interface ToastProps {
    heading: string,
    children: React.ReactNode
}

// Expose the openToast and closeToast functions to parent node
export interface ToastRef {
    openToast: () => void
    closeToast: () => void
}

const Toast = forwardRef<ToastRef, ToastProps>(function Toast (props, ref) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [spring, api] = useSpring(() => ({
        transformX: 'translateX(100%)',
        opacity: 0
    }))

    const [progressSpring, progressApi] = useSpring(() => ({
        width: '100%'
    }))

    const openToast = () => {
        api.start({
            transformX: 'translateX(0%)',
            opacity: 1,
            onStart: () => setIsOpen(true)
        })
        progressApi.start({
            width: '0%',
            config: {
                duration: 10000
            }
        })
    }

    const closeToast = () => {
        api.start({
            transformX: 'translateX(100%)',
            opacity: 0,
            onRest: () => {
                setIsOpen(false),
                progressApi.start({
                    width: '100%',
                    immediate: true
                })
            }
        })
    }

    useImperativeHandle(ref, () => ({
        openToast,
        closeToast,
    }))

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                closeToast()
            }, 10000)

            return () => clearTimeout(timer);
        }
    }, [isOpen])

    const toastStyle = `fixed flex flex-col gap-y-2 p-4 bottom-4 right-4 max-h-48 bg-white w-96 border-2 border-slate-200 rounded-md drop-shadow-md overflow-hidden`

    return (
        <> 
            {isOpen && (
                <div className="z-40 fixed">
                    <animated.div className={toastStyle} style={{transform: spring.transformX, opacity: spring.opacity}}>
                        <animated.div className="absolute bottom-0 left-0 h-1 bg-blue-600 rounded-md after:absolute after:top-0 after:-right-2 after:h-1 after:w-1 after:rounded-sm after:bg-blue-600" style={{width: progressSpring.width}}/>
                        <div className="flex gap-x-4 items-center justify-between">
                            <h1 className="grow text-gray-950 font-semibold text-sm break-words">{props.heading}</h1>
                            <div className="shrink-0">
                                <button type="button" onClick={closeToast} className="flex items-center justify-center cursor-pointer">
                                    <XMarkIcon className="w-4 text-gray-950"/>
                                </button>
                            </div>
                        </div>
                        {/* TOAST'S CONTENT */}
                        {props.children}
                    </animated.div>
                </div>
            )}
        </>
        
    )
})

export default Toast