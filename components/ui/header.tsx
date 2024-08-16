import { Info } from "lucide-react"
import { NavigationItem } from "../navigation/navigation-item"
import { NavigationTopbar } from "../navigation/navigation-topbar"
import { ModeToggle } from "./mode-toggle"

export const Header = () => {
    return (
        <div className='hidden md:flex h-20 flex-row justify-between items-center mx-4'>
            <div className='flex'>
                <span className='h-12 text-[40px] flex items-center font-bold border rounded-lg px-3 py-1'>Spotifire.xyz</span>
                <NavigationItem icon={<Info className='w-8 h-8'/>} description='about Spotifire' id='about'/>
            </div>
            <div className='flex'>
                <NavigationTopbar/>
                <ModeToggle/>
            </div>
        </div>
    )
}