'use client'

import { animated, useSpring } from "@react-spring/web"
import { createContext, SetStateAction, useContext, useEffect, useState } from "react"

interface DropdownContextType {
    isShowing: boolean,
    setIsShowing: React.Dispatch<SetStateAction<boolean>>,
    isVisible: boolean
    setIsVisible: React.Dispatch<SetStateAction<boolean>>
}

const DropdownContext = createContext<DropdownContextType | null>(null)

export function Dropdown({
    children
} : {
    children: React.ReactNode
}) {
    const [isShowing, setIsShowing] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(false)

    return (
        <DropdownContext.Provider value={{ isShowing, setIsShowing, isVisible, setIsVisible }}>
            <div className="relative">
                {children}
            </div>
        </DropdownContext.Provider>
    )
}

export function DropdownTrigger({
    children
} : {
    children: React.ReactNode
}) {
    const context = useContext(DropdownContext)

    if(!context){
        throw new Error('This component was used incorrectly. It should be wrapped by the Dropdown component.')
    }

    return (
        <div className="cursor-pointer" onClick={() => context.setIsShowing(true)}>
            {children}
        </div>
    )
}

export function DropdownContent({
    width = "sm",
    height = "sm",
    anchor = "bl",
    children
} : {
    width?: "sm" | "md" | "lg" | "xl" | "full",
    height?: "sm" | "md" | "lg" | "xl",
    anchor?: "bl" | "br",
    children: React.ReactNode
}) {
    const context = useContext(DropdownContext)

    if(!context){
        throw new Error('This component was used incorrectly. It should be wrapped by the Dropdown component.')
    }

    const [spring, api] = useSpring(() => ({
        opacity: 0,
        transform: 'scale(0.95)',
    }))

    useEffect(() => {
        if(context.isShowing) {
            api.start({
                opacity: 1,
                transform: 'scale(1)',
                config: {
                    tension: 400,
                    friction: 40
                },
                onStart: () => context.setIsVisible(true)
            })
        }
        else {
            api.start({
                opacity: 0,
                transform: 'scale(0.95)',
                config: {
                    tension: 400,
                    friction: 40
                },
                onRest: () => context.setIsVisible(false)
            })
        }
    }, [context.isShowing])

    let dropdownWidth = "w-[12rem]"

    switch (width) {
        case "md":
            dropdownWidth = "w-[16rem]"
            break
        case "lg":
            dropdownWidth = "w-[20rem]"
            break
        case "xl":
            dropdownWidth = "w-[24rem]"
            break
        case "full":
            dropdownWidth = "w-full"
            break
    }

    let dropdownHeight = "max-h-[12rem]"

    switch (height) {
        case "md":
            dropdownHeight = "max-h-[16rem]"
            break
        case "lg":
            dropdownHeight = "max-h-[20rem]"
            break
        case "xl":
            dropdownHeight = "max-h-[24rem]"
            break
    }

    let dropdownAnchor = "top-[calc(100%+0.5rem)] left-0"

    switch (anchor) {
        case "br":
            dropdownAnchor = "top-[calc(100%+0.5rem)] right-0"
    }

    const dropdownStyle = `z-50 absolute ${dropdownAnchor} ${dropdownHeight} ${dropdownWidth} border-2 border-slate-200 shadow-sm bg-white overflow-y-auto rounded-md scrollbar-hidden hidden md:block`

    return (
        context.isVisible && (
            <>
                <div onClick={() => context.setIsShowing(false)} className="fixed inset-0 bg-transparent z-50"></div>
                <animated.div style={spring} className={dropdownStyle}>
                    {children}
                </animated.div>
            </>
        )
    )
}