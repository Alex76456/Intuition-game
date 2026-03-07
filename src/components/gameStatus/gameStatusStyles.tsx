import { AppTheme } from '@styles/theme'
import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles(
	(theme: AppTheme) => ({
		card: {
			position: 'relative',
			display: 'flex',
			flexDirection: 'column',
			gap: 12,
			width: '100%',
			minWidth: 0,
			flexShrink: 0,
			alignSelf: 'stretch',
			boxSizing: 'border-box',
			padding: '18px 18px 16px',
			borderRadius: theme.radius.lg,
			background: `linear-gradient(135deg, ${theme.colors.surfacePrimary}, ${theme.colors.surfaceAccentBlue})`,
			boxShadow: theme.shadow.window,
			border: `1px solid ${theme.colors.borderSoft}`,
			overflow: 'hidden',
		},
	}),
	{ name: 'GameStatus' }
)
