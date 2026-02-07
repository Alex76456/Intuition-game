import { createUseStyles } from 'react-jss'
import type { AppTheme } from '@styles/theme'

export const useStyles = createUseStyles((theme: AppTheme) => ({
	userName: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		width: '100%',
		borderRadius: `${theme.radius.lg}px ${theme.radius.lg}px 0 0`,
		padding: '18px 20px 10px',
		background: theme.colors.inputBackground,
		border: `1px solid ${theme.colors.borderSoft}`,
	},
	userNameSubtitle: {
		marginBottom: 8,
		fontSize: 14,
		textTransform: 'uppercase',
		letterSpacing: '0.09em',
		color: theme.colors.textSecondary,
	},
	input: {
		outline: 'none',
		padding: '10px 12px',
		fontSize: 20,
		color: theme.colors.textAccentSoft,
		width: '100%',
		borderRadius: 10,
		border: `1px solid ${theme.colors.inputBorder}`,
		backgroundColor: theme.colors.inputBackground,
		transition:
			'border-color 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease',
		'&:focus': {
			borderColor: theme.colors.inputBorderFocusBlue,
			boxShadow: '0 0 0 1px rgba(96, 165, 250, 0.7)',
			backgroundColor: theme.colors.inputStrongBackground,
		},
	},
}))
