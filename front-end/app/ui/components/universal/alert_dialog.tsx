'use client'

import {
    XMarkIcon
} from '@heroicons/react/24/solid';
import { useSpring, animated } from '@react-spring/web'
import clsx from 'clsx';
import { forwardRef, useImperativeHandle, useState, useEffect } from 'react'

interface AlerDialogProps {
    heading: string,
    onConfirm: () => void,
    children: React.ReactNode
}

// Expose the openDialog and closeDialog functions to parent node
export interface AlertDialogRef {
    openDialog: () => void
    closeDialog: () => void
}

const AlertDialog = forwardRef<AlertDialogRef, AlerDialogProps>(function AlertDialog (props, ref) {
    const [isOpen, setIsOpen] = useState<boolean>(false)

    const [spring, api] = useSpring(() => ({
        opacity: 0,
        transform: 'scale(0.95) translate(-50%, -50%)',
        dialogOpacity: 0
    }))

    const openDialog = () => {
        api.start({
            opacity: 0.5,
            transform: 'scale(1) translate(-50%, -50%)',
            dialogOpacity: 1,
            config: {
                tension: 400,
                friction: 40
            },
            onStart: () => setIsOpen(true)
        })
    }

    const closeDialog = () => {
        api.start({
            opacity: 0,
            transform: 'scale(0.95) translate(-50%, -50%)',
            dialogOpacity: 0,
            config: {
                tension: 400,
                friction: 40
            },
            onRest: () => setIsOpen(false)
        })
    }

    const closeDialogWithConfirmation = () => {
        api.start({
            opacity: 0,
            transform: 'scale(0.95) translate(-50%, -50%)',
            dialogOpacity: 0,
            onStart: () => props.onConfirm(),
            onRest: () => setIsOpen(false)
        })
    }

    useImperativeHandle(ref, () => ({
        openDialog,
        closeDialog,
    }));

    return (
        <div className={clsx(
            "z-50",
            {
                "hidden": !isOpen,
                "fixed": isOpen
            }
        )}>
            <animated.div onClick={closeDialog} className="fixed inset-0 bg-gray-950" style={{opacity: spring.opacity}}></animated.div>
            <animated.div className="fixed flex flex-col origin-bottom-left top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 gap-y-2 p-6 bg-violet-50 rounded-md drop-shadow-md sm:w-[32rem]" style={{transform: spring.transform, opacity: spring.dialogOpacity}}>
                <div className="flex gap-x-4 items-center justify-between">
                    <h1 className="grow text-gray-950 font-bold text-lg break-words">{props.heading}</h1>
                    <div className="shrink-0">
                        <button type="button" onClick={closeDialog} className="flex items-center justify-center cursor-pointer">
                                <XMarkIcon className="w-7 text-gray-950"/>
                        </button>
                    </div>
                </div>
                {props.children}
                <div className="flex flex-col-reverse gap-y-2 items-center md:flex-row md:gap-y-0 md:gap-x-2 md:justify-end">
                    <button type="button" onClick={closeDialog} className="text-violet-500 min-w-full text-sm font-semibold border-2 border-violet-500 py-2.5 px-4 rounded-md hover:border-violet-800 hover:text-violet-800 md:min-w-0 transition-colors duration-300">Cancel</button>
                    <button type="button" onClick={closeDialogWithConfirmation} className="text-violet-50 min-w-full text-sm font-semibold border-2 border-gray-950 bg-gray-950 py-2.5 px-4 rounded-md hover:border-violet-800 hover:bg-violet-800 md:min-w-0 transition-colors duration-300">Continue</button>
                </div>
            </animated.div>
        </div>
    )
})

export default AlertDialog