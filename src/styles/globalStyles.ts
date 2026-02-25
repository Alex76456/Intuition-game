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
				height: '100%',
			},
			body: {
				height: '100%',
				fontFamily:
					"system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
				backgroundColor: theme.colors.backgroundBody,
				color: theme.colors.textPrimary,
				overflow: 'hidden',
			},
			'#__next': {
				height: '100%',
			},
		},
	}),
	{ name: 'GlobalStyles' }
)
