"use client";
import { useEffect, useState } from "react";
import { useMusicContext } from "../providers/music-provider"
import Image from 'next/image'
import { Button } from "@/components/ui/button";
import { Play, Pause, StepBack, StepForward } from 'lucide-react'
import axios from 'axios'
import { MarqueeText } from "@/components/ui/marquee-text";

type Player = {
    addListener: any;
    getCurrentState: () => any;
    connect: any;
    disconnect: any;
    togglePlay: () => void;
} | undefined

export const NowPlaying = ({ access_token }: { access_token: string }) => {
    const [ player, setPlayer ] = useState<Player>(undefined)
    const [ is_active, setActive ] = useState(false)
    const [ is_paused, setPaused ] = useState(false);
    const [ position, setPosition ] = useState('');
    const [ currentTrack, setTrack ] = useState<any>('');
    const { song, setSong } = useMusicContext();


    useEffect(() => {
        if (!player) {
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;
        
            document.body.appendChild(script);
        
            window.onSpotifyWebPlaybackSDKReady = () => {
                const player: Player = new window.Spotify.Player({
                    name: 'Spotifire',
                    getOAuthToken: (cb: (arg0: any) => void) => { cb(access_token); },
                    volume: 0.5
                });
                if (!player) return;
                
                setPlayer(player);
                
                player.addListener('ready', ({ device_id }: any) => {
                    console.log('Ready with Device ID', device_id);
                    const connect_to_device = async () => {
                        await axios.put('http://localhost:3000/api/playback/transfer', { device_id, access_token })
                        setActive(true)
                    }
                    connect_to_device()
                });
                player.addListener('not_ready', ({ device_id }: any) => {
                    console.log('Device ID has gone offline', device_id);
                });
                player.addListener('player_state_changed', ((state: any) => {
                    if (!state) return;
                    (!state.track_window.current_track) ? setActive(false) : setActive(true)
                    setPaused(state.paused);

                }));

                player.connect()

            }

        }
        return () => {
            player?.disconnect()
        }

    }, []);

    useEffect(() => {
        if (song && is_active) {

        }
    }, [song, is_active])

    useEffect(() => {
        const interval = setInterval(async () => {
            if (is_active) {
                const state = await player?.getCurrentState()!;
                if (state) {
                    const { position, track_window, volume } = state;
                    setPosition(position);
                    setTrack(track_window.current_track)
                }
            }
        }, 10);
        return () => clearInterval(interval);
    }, [player, is_active]);


    const play = async (track_uri: string, album_uri: string) => {
        await axios.put('/api/playback/play', { access_token, track_uri, album_uri })
    }


    if (player) {
        return (
            <div className="h-full rounded-[25px] px-4 py-2 flex justify-center items-center flex-col">
                {currentTrack &&
                <div>
                    <Image priority src={currentTrack.album.images[0].url || ''} alt='' width={400} height={400}/>
                    <MarqueeText text={currentTrack.name}/>
                    <div className=''>{currentTrack.artists[0].name}</div>
                </div>
                }
                
                <div className='flex flex-row mt-8 gap-x-2'>
                    <Button className='h-12' variant='ghost'><StepBack className='w-6 h-6'/></Button>
                    <Button className='h-12' disabled={!is_active} onClick={() => {
                        player.togglePlay()
                    }}>
                        {is_paused ? <Play className='w-8 h-8'/> : <Pause className='w-8 h-8'/>}
                    </Button>
                    <Button className='h-12' variant='ghost'><StepForward className='w-6 h-6'/></Button>
                </div>
                <div className='mt-4'>{position}</div>
            </div>
        )
    }
    return <div>Loading...</div> 
}