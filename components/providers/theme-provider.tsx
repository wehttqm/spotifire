"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    React.useEffect(() => {
        const intervalId = setInterval(() => {
        }, 3600 * 900 )
        return () => {
            clearInterval(intervalId)
        }
    }, [])
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
