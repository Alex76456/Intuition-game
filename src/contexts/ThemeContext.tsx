import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { ThemeProvider } from 'react-jss'
import type { AppTheme } from '@styles/theme'
import { darkTheme, lightTheme } from '@styles/theme'

const THEME_STORAGE_KEY = 'gi-theme'

export type ThemeMode = 'light' | 'dark'

type ThemeContextValue = {
	theme: AppTheme
	themeMode: ThemeMode
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

function getStoredMode(): ThemeMode | null {
	try {
		const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
		if (stored === 'dark' || stored === 'light') return stored
	} catch {
		// ignore
	}
	return null
}

export function ThemeContextProvider({ children }: { children: React.ReactNode }) {
	const [themeMode, setThemeMode] = useState<ThemeMode>('light')

	useEffect(() => {
		const stored = getStoredMode()
		if (stored) setThemeMode(stored)
	}, [])

	const theme = themeMode === 'dark' ? darkTheme : lightTheme

	const toggleTheme = useCallback(() => {
		setThemeMode((prev) => {
			const next = prev === 'dark' ? 'light' : 'dark'
			try {
				window.localStorage.setItem(THEME_STORAGE_KEY, next)
			} catch {
				// ignore
			}
			return next
		})
	}, [])

	const value = useMemo<ThemeContextValue>(
		() => ({ theme, themeMode, toggleTheme }),
		[theme, themeMode, toggleTheme]
	)

	return (
		<ThemeContext.Provider value={value}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ThemeContext.Provider>
	)
}

export function useThemeContext(): ThemeContextValue {
	const ctx = useContext(ThemeContext)
	if (!ctx) throw new Error('useThemeContext must be used within ThemeContextProvider')
	return ctx
}
