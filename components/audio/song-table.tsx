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
import axios from "axios";
import { Flame } from "lucide-react";

type Song = {
    track_uri: string;
    album_uri: string;
    iconUrl: string; 
    title: string;
    artist: string;
    genre: string;
    album: string;
}
  
export function SongTable() {
    const [ songs, setSongs ] = useState<Song[] | null>(null)
    const { setSong } = useMusicContext()
    useEffect(() => {
        async function getData() {
            try {
            const { data } = await axios.get('/api/hello')
            setSongs(data)
            } catch (e) {
                console.log(e)
            }
        }
        getData()
    }, [])

    const set = (song: any) => {
        setSong(song)
    }

    if (songs) {
        return (
            <div className='h-full'>
                <ScrollArea className='h-full pr-6'>
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
                </ScrollArea>
            </div>
        )
    } else {
        return (
            <div className='flex h-full justify-center items-center flex-col'>
                <Flame width={200} height={200} className="text-primary/10"/>
            </div>
        )
    }
  }
  