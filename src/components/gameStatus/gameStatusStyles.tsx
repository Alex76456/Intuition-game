import { AppTheme } from '@styles/theme'
import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles(
	(theme: AppTheme) => ({
		card: {
			position: 'relative',
			display: 'flex',
			flexDirection: 'column',
			gap: 12,
			padding: '18px 18px 16px',
			borderRadius: theme.radius.lg,
			background: `linear-gradient(135deg, ${theme.colors.surfacePrimary}, ${theme.colors.surfaceAccentBlue})`,
			boxShadow: theme.shadow.window,
			border: `1px solid rgba(148, 163, 184, 0.35)`,
			overflow: 'hidden',
		},
	}),
	{ name: 'GameStatus' }
)
