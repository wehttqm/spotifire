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
    iconUrl: string;
    title: string;
    genre: string;
    album: string
} | null

export const MusicContext = createContext<MusicContext | null>(null);

export function MusicProvider({children}: MusicContextProviderProps) {
    const [ song, setSong ] = useState<Song>(null)

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