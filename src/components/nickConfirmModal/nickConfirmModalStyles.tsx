import { createUseStyles } from 'react-jss'
import type { AppTheme } from '@styles/theme'

export const useStyles = createUseStyles((theme: AppTheme) => ({
	overlay: {
		position: 'fixed',
		inset: 0,
		zIndex: 1000,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: 'rgba(15, 23, 42, 0.85)',
		backdropFilter: 'blur(8px)',
		padding: 24,
	},
	card: {
		width: '100%',
		maxWidth: 420,
		padding: 32,
		borderRadius: 24,
		background: `linear-gradient(145deg, ${theme.colors.surfacePrimary}, ${theme.colors.backgroundBody})`,
		boxShadow: theme.shadow.mainWrapper,
		border: `1px solid ${theme.colors.borderSoft}`,
	},
	title: {
		margin: '0 0 24px',
		fontSize: 22,
		textAlign: 'center',
		color: theme.colors.textPrimary,
		lineHeight: 1.35,
	},
	button: {
		marginTop: 24,
		width: '100%',
		padding: '14px 24px',
		fontSize: 16,
		fontWeight: 600,
		color: theme.colors.buttonPrimaryText,
		background: `linear-gradient(180deg, ${theme.colors.buttonPrimaryBackgroundFrom}, ${theme.colors.buttonPrimaryBackgroundTo})`,
		border: 'none',
		borderRadius: 12,
		boxShadow: theme.shadow.buttonPrimary,
		cursor: 'pointer',
		transition: 'opacity 0.2s ease, transform 0.1s ease',
		'&:hover:not(:disabled)': {
			boxShadow: theme.shadow.buttonPrimaryHover,
			opacity: 0.95,
		},
		'&:active:not(:disabled)': {
			transform: 'scale(0.98)',
			boxShadow: theme.shadow.buttonPrimaryActive,
		},
		'&:disabled': {
			opacity: 0.5,
			cursor: 'not-allowed',
		},
	},
}))
