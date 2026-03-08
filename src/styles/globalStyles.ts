import { createUseStyles } from 'react-jss'
import type { AppTheme } from './theme'

export const useGlobalStyles = createUseStyles(
	(theme: AppTheme) => ({
		'@global': {
			'*': {
				margin: 0,
				padding: 0,
				boxSizing: 'border-box',
			},
			html: {
				minHeight: '100%',
			},
			body: {
				minHeight: '100%',
				fontFamily:
					"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
				backgroundColor: theme.colors.backgroundBody,
				color: theme.colors.textPrimary,
				overflowX: 'hidden',
			},
			'#__next': {
				minHeight: '100%',
			},
			'.app-root': {
				minHeight: '100vh',
				display: 'flex',
				flexDirection: 'column',
			},
		},
	}),
	{ name: 'GlobalStyles' }
)
