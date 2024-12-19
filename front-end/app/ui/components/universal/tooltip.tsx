'use client'

import { animated, useSpring } from "@react-spring/web"
import { createContext, SetStateAction, useContext, useEffect, useState } from "react"

interface TooltipContextType {
    isShowing: boolean,
    setIsShowing: React.Dispatch<SetStateAction<boolean>>,
    isVisible: boolean
    setIsVisible: React.Dispatch<SetStateAction<boolean>>
}

const TooltipContext = createContext<TooltipContextType | null>(null)

export function Tooltip({
    children
} : {
    children: React.ReactNode
}) {
    const [isShowing, setIsShowing] = useState<boolean>(false)
    const [isVisible, setIsVisible] = useState<boolean>(false)

    return (
        <TooltipContext.Provider value={{ isShowing, setIsShowing, isVisible, setIsVisible }}>
            <div className="relative">
                {children}
            </div>
        </TooltipContext.Provider>
    )
}

export function TooltipTrigger({
    children
} : {
    children: React.ReactNode
}) {
    const context = useContext(TooltipContext)

    if(!context){
        throw new Error('This component was used incorrectly. It should be wrapped by the Tooltip component.')
    }

    return (
        <div onMouseEnter={() => context.setIsShowing(true)} onMouseLeave={() => context.setIsShowing(false)}>
            {children}
        </div>
    )
}

export function TooltipContent({
    children
} : {
    children: React.ReactNode
}) {
    const context = useContext(TooltipContext)

    if(!context){
        throw new Error('This component was used incorrectly. It should be wrapped by the Tooltip component.')
    }

    const [spring, api] = useSpring(() => ({
        opacity: 0,
    }))

    useEffect(() => {
        if(context.isShowing) {
            api.start({
                opacity: 1,
                config: {
                    tension: 400,
                    friction: 40
                },
                delay: 500,
                onStart: () => context.setIsVisible(true)
            })
        }
        else {
            api.start({
                opacity: 0,
                config: {
                    tension: 400,
                    friction: 40
                },
                onRest: () => context.setIsVisible(false)
            })
        }
    }, [context.isShowing])

    return (
        context.isVisible && (
            <animated.div style={spring} className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[calc(100%+0.75rem)] px-1.5 py-1 bg-gray-950 text-xs text-blue-50 rounded-md text-nowrap
            after:content-[''] after:absolute after:top-full after:left-1/2 after:-translate-x-1/2 after:border-4 after:border-transparent after:border-t-gray-950">
                {children}
            </animated.div>
        )
    )
}