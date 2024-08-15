'use client'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

const Page = () => {
    const onSubmit = () => {
        toast.success('fuck')
    }
    return (
        <div className='px-4 py-2'>
            Train page
            <Button onClick={onSubmit}>Test</Button>
        </div>
    )
}

export default Page