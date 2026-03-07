import { createUseStyles } from 'react-jss'
import type { AppTheme } from '@styles/theme'

export const useStyles = createUseStyles(
	(theme: AppTheme) => ({
		overlay: {
			position: 'fixed',
			inset: 0,
			zIndex: 1000,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			background: theme.colors.overlayBackdrop,
			backdropFilter: 'blur(8px)',
			padding: 24,
		},
		card: {
			width: '100%',
			maxWidth: 360,
			padding: 28,
			borderRadius: 24,
			background: `linear-gradient(145deg, ${theme.colors.surfacePrimary}, ${theme.colors.backgroundBody})`,
			boxShadow: theme.shadow.mainWrapper,
			border: `1px solid ${theme.colors.borderSoft}`,
		},
		text: {
			margin: 0,
			fontSize: 18,
			textAlign: 'center',
			color: theme.colors.textPrimary,
		},
		button: {
			marginTop: 20,
			width: '100%',
			padding: '12px 24px',
			fontSize: 15,
			fontWeight: 600,
			color: theme.colors.buttonPrimaryText,
			background: `linear-gradient(180deg, ${theme.colors.buttonPrimaryBackgroundFrom}, ${theme.colors.buttonPrimaryBackgroundTo})`,
			border: 'none',
			borderRadius: 12,
			boxShadow: theme.shadow.buttonPrimary,
			cursor: 'pointer',
			'&:hover': {
				opacity: 0.95,
			},
		},
	}),
	{ name: 'ConnectionStatus' }
)
