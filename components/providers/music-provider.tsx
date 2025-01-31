"use client";

import React, { createContext, useContext, useState } from 'react';


type MusicContextProviderProps = {
    children: React.ReactNode
}

type MusicContext = {
    song: Song;
    setSong: React.Dispatch<React.SetStateAction<Song>>
};

type Song = {
    track_uri: string;
    album_uri: string;
    iconUrl: string;
    title: string;
    genre: string;
    album: string
} | null

export const MusicContext = createContext<MusicContext | null>(null);

export function MusicProvider({children}: MusicContextProviderProps) {
    const [ song, setSong ] = useState<Song>({
        'track_uri': "spotify:track:3G6hD9B2ZHOsgf4WfNu7X1",
        'album_uri': "spotify:album:0rmhjUgoVa17LZuS8xWQ3v",
        'iconUrl': "https://i.scdn.co/image/ab67616d0000b273187331e276c898d39764cc98",
        'title': "Team",
        'genre': "N/A",
        'album': "Pure Heroine",
    },)

    return (
        <MusicContext.Provider
            value={{song, setSong}}
        >
            {children}
        </MusicContext.Provider>
    )
}

export const useMusicContext = () => {
    const context = useContext(MusicContext)
    if (!context) {
        throw new Error(
            "useMusicContext must be used within a MusicContextProvider"
        );
    }
    return context
}