"use client"
import { SearchBar } from "@/components/ui/search-bar"
import { SongTable } from "@/components/audio/song-table"
import { useEffect } from "react"
import { login } from '@/lib/auth'
import { toast } from 'sonner'

const Page = () => {

    useEffect(() => {
        async function doShit() {
            const code = new URLSearchParams(window.location.search).get('code')
            if (code) {
                await login(code)
                window.history.pushState({}, '', '/listen')
                
            }
        }
        doShit()
    }, [])

    const onSubmit = () => {
        console.log('fuck')
    }

    return (
        <div className='flex flex-col h-full'>
            <div className='h-full overflow-hidden rounded-t-[25px] p-4 border-2 border-b-0'>
                <SongTable/>
            </div>
            <div className='w-full h-20 rounded-b-[25px] flex items-center px-4 border-2 bottom-1'>
                <SearchBar onClick={onSubmit}/>
            </div>
            
        </div>
    )
}

export default Page