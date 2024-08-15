"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface className {
    className?: string
}

export const Test = ({className} : className) => {
    const [response, setResponse] = useState(' ')
    const [loading, setIsLoading] = useState(false)
    const onSubmit = async () => {
        setIsLoading(true)
        const response = await fetch('/api/hello')
        console.log(response)
        if (response.status === 200) {        
            const data = await response.json()
            console.log(data)
            setResponse(data.message)
        } else {
            setResponse(`Error: ${response.status}`)
        }

        setIsLoading(false)
    }
    return (
        <div className={cn('h-[70px]', className)}>
            <Button className='w-40 h-[40px]' variant='outline' disabled={loading} onClick={onSubmit}>Test python server</Button>
            <div className='w-40 text-center'>{response}</div>
        </div>
    )
}