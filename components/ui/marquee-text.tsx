"use client"
import { useEffect, useRef, useState } from "react";
export const MarqueeText = ({ text }: { text: string }) => {
    const test = useRef<any>()
    const [isAnimated, setAnimated] = useState(false)

    useEffect(() => {
        setAnimated(false)
        if (test) {
            try {
                const isLongEnough = test.current.offsetWidth > 400
                setAnimated(isLongEnough)
            } catch (err) {
                setAnimated(false)
            }
            
        } 
    }, [text, test])

        return (
            ( isAnimated ? 
                <div className='marquee marquee--fit-content w-[400px] mt-2'>
                    <div className='marquee__content'>
                        <span className='font-bold text-2xl'>{text}</span>
                    </div>
                    <div className='marquee__content' aria-hidden={true}>
                        <span className="font-bold text-2xl">{text}</span>
                    </div>
                </div> 
            :
                <div ref={test} className='mt-2 text-2xl font-bold whitespace-nowrap overflow-hidden'>{text}</div>
            )
        )
}
