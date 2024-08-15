"use client"
import { ActionToolTip } from "@/components/ui/action-tooltip"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

interface NavigationItemProps {
    icon: React.ReactNode;
    id: string;
    description: string;
}

export const NavigationItem = ({icon, id, description}: NavigationItemProps) => {
    const router = useRouter()
    return (
        <ActionToolTip side="bottom" align="center" label={description}>
            <Button variant='outline' className='h-12 w-auto mx-2 rounded-lg' onClick={() => router.push(`/${id}`)}>
                {icon}
            </Button>
        </ActionToolTip>
    )
}