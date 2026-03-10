import { AppTheme } from '@styles/theme'
import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles(
	(theme: AppTheme) => ({
		form: {
			width: '100%',
			display: 'flex',
			flexDirection: 'column',
			gap: 4,
			marginTop: 12,
			borderRadius: theme.radius.lg,
		},
		formRow: {
			display: 'flex',
			gap: 8,
		},
		inputHint: {
			fontSize: 12,
			color: theme.colors.textSecondary,
			marginLeft: 4,
		},
		alreadySentHint: {
			fontSize: 13,
			color: theme.colors.surfaceAccentPurple,
			marginTop: 2,
		},
		visuallyHidden: {
			position: 'absolute',
			width: 1,
			height: 1,
			padding: 0,
			margin: -1,
			overflow: 'hidden',
			clip: 'rect(0, 0, 0, 0)',
			whiteSpace: 'nowrap',
			border: 0,
		},
		inputMessage: {
			border: 'none',
			width: '100%',
			alignSelf: 'center',
			textAlign: 'center',
			fontSize: 20,
			padding: '10px 12px',
			borderRadius: theme.radius.full,
			outline: 'none',
			backgroundColor: theme.colors.inputBackground,
			color: theme.colors.textAccentSoft,
			borderWidth: 1,
			borderStyle: 'solid',
			borderColor: theme.colors.inputBorder,
			transition:
				'border-color 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease, transform 0.1s ease',
			'&:focus': {
				borderColor: theme.colors.inputBorderFocusPurple,
				boxShadow: theme.colors.inputFocusShadow,
				backgroundColor: theme.colors.inputStrongBackground,
			},
			'&:disabled': {
				opacity: 0.5,
				cursor: 'not-allowed',
			},
		},
		submitButton: {
			minWidth: 80,
			padding: '0 16px',
			borderRadius: theme.radius.full,
			outline: 'none',
			transition:
				'background-color 0.18s ease, transform 0.08s ease, box-shadow 0.18s ease, opacity 0.18s ease',
			border: 'none',
			color: theme.colors.buttonPrimaryText,
			fontWeight: 600,
			fontSize: 14,
			background: `linear-gradient(135deg, ${theme.colors.buttonPrimaryBackgroundFrom}, ${theme.colors.buttonPrimaryBackgroundTo})`,
			boxShadow: theme.shadow.buttonPrimary,
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			'&:hover:enabled': {
				cursor: 'pointer',
				opacity: 0.95,
				transform: 'translateY(-1px)',
				boxShadow: theme.shadow.buttonPrimaryHover,
			},
			'&:active:enabled': {
				transform: 'translateY(0)',
				boxShadow: theme.shadow.buttonPrimaryActive,
			},
			'&:disabled': {
				opacity: 0.5,
				cursor: 'not-allowed',
				boxShadow: 'none',
			},
		},
	}),
	{ name: 'GameStatusInput' }
)
