"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { refresh } from "@/lib/auth"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    React.useEffect(() => {
        refresh()
        const intervalId = setInterval(() => {
            refresh()
        }, 3600 * 900 )
        return () => {
            clearInterval(intervalId)
        }
    }, [])
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
