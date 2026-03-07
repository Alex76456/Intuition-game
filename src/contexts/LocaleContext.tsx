import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'

const LOCALE_STORAGE_KEY = 'gi-locale'

export type Locale = 'ru' | 'en'

type LocaleContextValue = {
	locale: Locale
	setLocale: (_locale: Locale) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function getStoredLocale(): Locale | null {
	try {
		const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY)
		if (stored === 'ru' || stored === 'en') return stored
	} catch {
		// ignore
	}
	return null
}

export function LocaleContextProvider({
	children,
}: {
	children: React.ReactNode
}) {
	const [locale, setLocaleState] = useState<Locale>('ru')

	useEffect(() => {
		const stored = getStoredLocale()
		if (stored) setLocaleState(stored)
	}, [])

	const setLocale = useCallback((next: Locale) => {
		setLocaleState(next)
		try {
			window.localStorage.setItem(LOCALE_STORAGE_KEY, next)
		} catch {
			// ignore
		}
	}, [])

	const value = useMemo<LocaleContextValue>(
		() => ({ locale, setLocale }),
		[locale, setLocale]
	)

	return (
		<LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
	)
}

export function useLocaleContext(): LocaleContextValue {
	const ctx = useContext(LocaleContext)
	if (!ctx)
		throw new Error(
			'useLocaleContext must be used within LocaleContextProvider'
		)
	return ctx
}
