import { Play, Brain, Cog } from 'lucide-react'
import { NavigationItem } from "./navigation-item"
import { Login } from '@/components/auth/login'

export const NavigationTopbar = async () => {
    return (
        <div className='flex flex-row mr-2'>
            <Login />
            <NavigationItem icon={<Play className='w-8 h-8'/>} description='listen to music' id='listen' />
            <NavigationItem icon={<Brain className='w-8 h-8' />} description='train your model' id='train' />
            <NavigationItem icon={<Cog className='w-8 h-8'/>} description='adjust settings' id='settings' />
        </div>
    )
}