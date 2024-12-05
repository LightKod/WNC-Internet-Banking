'use client'

import { useSpring, animated } from '@react-spring/web'
import React, { forwardRef, useEffect, useImperativeHandle, useState, createContext, useContext, useRef } from 'react'
import { clsx } from 'clsx';

interface PageContextType {
    index: number,
    transitionStage: string,
    pageNumber: number,
    spring: any
}

const PageContext = createContext<PageContextType | null>(null)

interface PageSliderProps {
    children: React.ReactNode
}

// Expose the nextPage, prevPage and currentPage functions to parent node
export interface PageSliderRef {
    nextPage: () => void,
    prevPage: () => void,
    maxPage: number,
    addEventListener: (eventName: string, callback: EventCallback) => void
    removeEventListener: (eventName: string, callback: EventCallback) => void
}

type EventCallback = (data: any) => void

export const PageSlider = forwardRef<PageSliderRef, PageSliderProps>(function PageSlider (props, ref) {
    const [pageNumber, setPageNumber] = useState<number>(1)
    const [transitionStage, setTransitionStage] = useState<string>("static") // "static" "next" "prev"

    // EVENT LISTENER
    const eventListeners = useRef<Map<string, EventCallback[]>>(new Map())

    const emitEvent = (eventName: string, data: any) => {
        const listeners = eventListeners.current.get(eventName);
        if (listeners) {
          listeners.forEach((callback) => callback(data));
        }
    }

    const [spring, api] = useSpring(() => ({
        transform: 'translateX(0%)',
        opacity: 0,
        reverseOpacity: 1
    }))

    useEffect(() => {
        switch(transitionStage){
            case "next": {
                api.start({
                    from: {
                        transform: 'translateX(0%)',
                        opacity: -0.5,
                        reverseOpacity: 1
                    },
                    to: {
                        transform: 'translateX(-100%)',
                        opacity: 1,
                        reverseOpacity: -0.5
                    },
                    onRest: () => {
                        setPageNumber((prevPageNumber) => prevPageNumber + 1)
                        setTransitionStage("static")
                        emitEvent("pageNumberChange", pageNumber + 1)
                        emitEvent("transitionStageChange", "static")
                    }
                })
                break
            }
            case "prev": {
                api.start({
                    from: {
                        transform: 'translateX(-100%)',
                        opacity: 1,
                        reverseOpacity: -0.5
                    },
                    to: {
                        transform: 'translateX(0%)',
                        opacity: -0.5,
                        reverseOpacity: 1
                    },
                    onRest: () => {
                        setPageNumber((prevPageNumber) => prevPageNumber - 1)
                        setTransitionStage("static")
                        emitEvent("pageNumberChange", pageNumber - 1)
                        emitEvent("transitionStageChange", "static")
                    }
                })
                break
            }
            case "static": {
                api.start({
                    transform: 'translateX(0%)',
                    immediate: true
                })
            }
        }
    }, [transitionStage])

    useImperativeHandle(ref, () => ({
        nextPage: () => {
            setTransitionStage("next")
            emitEvent("transitionStageChange", "next")
        },
        prevPage: () => {
            setTransitionStage("prev")
            emitEvent("transitionStageChange", "prev")
        },
        maxPage: React.Children.count(props.children),
        addEventListener: (eventName: string, callback: EventCallback) => {
            if (!eventListeners.current.has(eventName)) {
                eventListeners.current.set(eventName, [])
            }
            eventListeners.current.get(eventName)?.push(callback)
        },
        removeEventListener: (eventName: string, callback: EventCallback) => {
            if (eventListeners.current.has(eventName)) {
                const filteredListeners = eventListeners
                  .current.get(eventName)!
                  .filter((cb) => cb !== callback)
                eventListeners.current.set(eventName, filteredListeners)
            }
        }
    }));

    return (
        <div className="flex w-full overflow-hidden">
            {React.Children.map(props.children, (child, index) => (
                <PageContext.Provider value={{
                    index: index + 1,
                    transitionStage,
                    pageNumber,
                    spring
                }}>
                    {child}
                </PageContext.Provider>
            ))}
        </div>
    )
})

export function Page({
    children
} : {
    children: React.ReactNode
}) {
    const context = useContext(PageContext)
    
    if(!context){
        throw new Error('This component was used incorrectly. It should be wrapped by the PageSlider component.')
    }

    return (
        <animated.div className={clsx(
            "w-full shrink-0 grow-0",
            {
                "hidden": (context.transitionStage === "static" && context.pageNumber !== context.index) 
                || (context.transitionStage === "next" && context.pageNumber !== context.index && context.pageNumber !== context.index - 1)
                || (context.transitionStage === "prev" && context.pageNumber !== context.index && context.pageNumber !== context.index + 1)
            }
        )} style={{
            transform: context.spring.transform,
            opacity: ((context.transitionStage === "next" && context.pageNumber === context.index) || (context.transitionStage === "prev" && context.pageNumber === context.index + 1)) ? context.spring.reverseOpacity : ((context.transitionStage === "next" && context.pageNumber === context.index - 1) || (context.transitionStage === "prev" && context.pageNumber === context.index)) ? context.spring.opacity : 1
        }}>
            {children}
        </animated.div>
    )
}