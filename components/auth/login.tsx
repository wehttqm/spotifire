'use client';
import { Button } from "@/components/ui/button"
import { getSession, refresh } from "@/lib/auth";
import { useRouter } from "next/navigation";
import qs from 'query-string'
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";
import { generateRandomString } from "@/lib/utils";

const client_id = process.env.NEXT_PUBLIC_CLIENT_ID
const redirect_uri = process.env.NEXT_PUBLIC_REDIRECT_URI

type Login = true | false | undefined;

export const Login = () => {

    useEffect(() => {
        async function doShit() {
            refresh()
            const session = await getSession()
            session ? setLoggedIn(true) : setLoggedIn(false)
        }
        doShit()
    }, [])

    const [loggedIn, setLoggedIn] = useState<Login>()
    const router = useRouter()

    const onClick = () => {
        var state = generateRandomString(16);
        var scope = 'user-read-private user-read-email streaming user-read-playback-state';
        router.push('https://accounts.spotify.com/authorize?' +
            qs.stringify({
              response_type: 'code',
              client_id: client_id,
              scope: scope,
              redirect_uri: redirect_uri,
              state: state
        }));
    };

    if (loggedIn === true) {
        return (
            <div className='flex items-center h-12 w-auto mx-3 rounded-lg font-bold'>Logged in</div>
        )
    } else if (loggedIn === false) {
        return (
            <div>
                <Button variant='outline' className='h-12 w-auto mx-2 rounded-lg font-bold text-green-500 hover:bg-green-700 border-2 hover:text-white' onClick={onClick}>
                    Log in via Spotify
                </Button>
            </div>
        )
    } else {
        return (
            <div className="flex items-center space-x-2 mr-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <div className="space-y-2">
                    <Skeleton className="h-2 w-16" />
                    <Skeleton className="h-2 w-16" />
                </div>
            </div>
        )
    }

}