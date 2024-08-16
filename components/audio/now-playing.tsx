"use client";
import { useEffect, useState } from "react";
import { useMusicContext } from "../providers/music-provider"
import { getSession } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Play, Pause } from 'lucide-react'
import axios from 'axios'

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

    useEffect(() => {
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
        return () => {
            player?.disconnect()
        }
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            if (is_active) {
                const state = await player?.getCurrentState()!;
                if (state) {
                    const { position, track_window, volume } = state;
                    setPosition(position);
                    setTrack(track_window.current_track.name)
                }
            }
        }, 10);
        return () => clearInterval(interval);
    }, [player, is_active]);

    useEffect(() => {
        if (song) {
            play(song.track_uri)
            setSong(null)
        }
    })

    const [ is_paused, setPaused ] = useState(false);
    const [ position, setPosition ] = useState('')
    const [ currentTrack, setTrack ] = useState('')
    const { song, setSong } = useMusicContext()
    
    const play = async (track_uri: string) => {
        await axios.put('/api/playback/play', { access_token, track_uri })
    }

    if (player) {
        return (
            <div className="h-full rounded-[25px] px-4 py-2 flex justify-center items-center flex-col">
                <Button className='h-12' disabled={!is_active} onClick={() => {
                    player.togglePlay()
                }}>
                    {is_paused ? <Play className='w-8 h-8'/> : <Pause className='w-8 h-8'/>}
                </Button>
                <div>{currentTrack}</div>
                <div>{position}</div>
            </div>
        )
    }   
}