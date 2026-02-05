import React from 'react'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'react-jss'

import { store } from '@redux/store'
import { appTheme } from '@styles/theme'
import { useGlobalStyles } from '@styles/globalStyles'

const AppInner: React.FC<AppProps> = ({ Component, pageProps, router }) => {
	useGlobalStyles()

	return (
		<div>
			<Head>
				<title>Great Intuition</title>
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
			<Component {...pageProps} router={router} />
		</div>
	)
}

export default function MyApp(appProps: AppProps) {
	return (
		<Provider store={store}>
			<ThemeProvider theme={appTheme}>
				<AppInner {...appProps} />
			</ThemeProvider>
		</Provider>
	)
}
