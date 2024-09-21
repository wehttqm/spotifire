"use client";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import Image from 'next/image'
import { ScrollArea } from "../ui/scroll-area"
import { useState, useEffect } from 'react'
import { useMusicContext } from "../providers/music-provider";
  
const songs = [
    {
        track_uri: "spotify:track:3G6hD9B2ZHOsgf4WfNu7X1",
        album_uri: "spotify:album:0rmhjUgoVa17LZuS8xWQ3v",
        iconUrl: "https://i.scdn.co/image/ab67616d0000b273187331e276c898d39764cc98",
        title: "Team",
        artist: "Lorde",
        genre: "N/A",
        album: "Pure Heroine",
    },
    {
        track_uri: "spotify:track:70LcF31zb1H0PyJoS1Sx1r",
        album_uri: "spotify:album:3gBVdu4a1MMJVMy6vwPEb8",
        iconUrl: "https://i.scdn.co/image/ab67616d0000b273df55e326ed144ab4f5cecf95",
        title: "Creep",
        artist: "Radiohead",
        genre: "N/A",
        album: "Pablo Honey"
    }
]
  
export function SongTable() {
    const [isClient, setIsClient] = useState(false)
    const { setSong } = useMusicContext()
    useEffect(() => {
        setIsClient(true)
    }, [])

    const set = (song: any) => {
        setSong(song)
    }
    return (
        <div className='h-full'>
            {isClient && <ScrollArea className='h-full pr-6'>
            <Table>
                <TableCaption>{`Generated ${songs.length} song${songs.length > 1 ? 's' : ''}.`}</TableCaption>
                <TableHeader>
                <TableRow>
                    <TableHead className="w-[120px]">Icon</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Artist</TableHead>
                    <TableHead>Album</TableHead>
                    <TableHead className="text-right">Genre</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {songs.map((song) => (
                    <TableRow key={song.iconUrl} onClick={() => set(song)} className='hover:bg-secondary-foreground/10 cursor-pointer h-28'>
                        <TableCell className="font-medium w-40">
                            <Image priority src={song.iconUrl} alt='' width={100} height={100}/>
                        </TableCell>
                        <TableCell>{song.title}</TableCell>
                        <TableCell>{song.artist}</TableCell>
                        <TableCell>{song.album}</TableCell>
                        <TableCell className="text-right">{song.genre}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                    </TableRow>
                </TableFooter>
            </Table>
            </ScrollArea>}
            {!isClient && <div>Mounting...</div>}
        </div>
    )
  }
  