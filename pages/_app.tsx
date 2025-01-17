import React from 'react'
import '@styles/global.css'
import Head from 'next/head'
import type { AppProps } from 'next/app'
import { Provider } from 'react-redux'

import { store } from '@redux/store'

export default function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Provider store={store}>
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
				<Component {...pageProps} />
			</div>
		</Provider>
	)
}
