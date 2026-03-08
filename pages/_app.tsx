import React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { JssProvider } from 'react-jss'
import type { GenerateId } from 'jss'

import { store } from '@redux/store'
import { ThemeContextProvider } from '@contexts/ThemeContext'
import { LocaleContextProvider } from '@contexts/LocaleContext'
import { Header } from '@components/header/Header'
import { useGlobalStyles } from '@styles/globalStyles'

// Детерминированный generateId: один и тот же (sheet, rule) даёт один и тот же класс
// на сервере и клиенте. Иначе после перезагрузки имена классов не совпадают и стили ломаются.
const generateId: GenerateId = (rule, sheet) => {
	const opts = sheet?.options as { name?: string } | undefined
	const name = (opts?.name ?? 's').toString().replace(/\s/g, '')
	return `gi-${name}-${rule.key}`
}

const AppInner: React.FC<AppProps> = ({ Component, pageProps, router }) => {
	useGlobalStyles()

	return (
		<div className="app-root">
			<Head>
				<title>Great Intuition</title>
				<meta
					name="description"
					content="Great Intuition — многопользовательская игра на интуицию. Загадай число от 0 до 100 и соревнуйся с другими в реальном времени."
				/>
				<meta property="og:title" content="Great Intuition" />
				<meta
					property="og:description"
					content="Многопользовательская игра на интуицию. Загадай число и соревнуйся с другими в реальном времени."
				/>
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/favicon_io/apple-touch-icon.png'
				/>
				<link
					rel='shortcut icon'
					type='image/png'
					sizes='32x32'
					href='/favicon_io/favicon-32x32.png'
				/>
				<link
					rel='shortcut icon'
					type='image/png'
					sizes='16x16'
					href='/favicon_io/favicon-16x16.png'
				/>
			</Head>
			<Header />
			<Component {...pageProps} router={router} />
		</div>
	)
}

export default function MyApp(appProps: AppProps) {
	return (
		<Provider store={store}>
			<ThemeContextProvider>
				<LocaleContextProvider>
					<JssProvider generateId={generateId}>
						<AppInner {...appProps} />
					</JssProvider>
				</LocaleContextProvider>
			</ThemeContextProvider>
		</Provider>
	)
}
