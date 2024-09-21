"use client"
import { useEffect, useRef, useState } from "react";

const getWidth = (text: string) => {
    // gets the width of the text we are about to render. If > 400, then we need sliding text. Otherwise, we just render the text normally. 
    const tempContainer = document.createElement('div');
    tempContainer.style.visibility = 'hidden'; 
    tempContainer.style.position = 'absolute'; 
    document.body.appendChild(tempContainer); 
    const tempElement = document.createElement('div');
    tempElement.innerHTML = text;
    tempElement.className = 'font-bold text-2xl'
    tempContainer.appendChild(tempElement); 
    const width = tempElement.offsetWidth;
    document.body.removeChild(tempContainer);

    return width;
}

export const MarqueeText = ({ text }: { text: string }) => {
    const test = useRef<any>()
    const [isAnimated, setAnimated] = useState(false)
    const width = getWidth(text)

    if (width > 400) {
        return (
            <div className='marquee marquee--fit-content w-[400px] mt-2'>
                <div className='marquee__content'>
                    <span className='font-bold text-2xl'>{text}</span>
                </div>
                <div className='marquee__content' aria-hidden={true}>
                    <span className="font-bold text-2xl">{text}</span>
                </div>
            </div> 
        )
    }
    return (
        <div className='mt-2 text-2xl font-bold whitespace-nowrap overflow-hidden'>{text}</div>
    )

}

