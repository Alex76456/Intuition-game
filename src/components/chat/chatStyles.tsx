import { AppTheme } from '@styles/theme'
import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles(
	(theme: AppTheme) => ({
		window: {
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			height: 420,
			borderRadius: `0 0 ${theme.radius.lg}px ${theme.radius.lg}px`,
			overflow: 'hidden',
			background: theme.colors.windowBackground,
			border: `1px solid ${theme.colors.borderSoft}`,
			boxShadow: theme.shadow.window,
		},
		windowChat: {
			overflowY: 'auto',
			overflowX: 'hidden',
			flexGrow: 1,
			padding: '16px 14px 12px',
			display: 'flex',
			flexDirection: 'column',
			gap: 6,
			scrollbarWidth: 'thin',
			scrollbarColor: `${theme.colors.scrollbarThumb} transparent`,
			'&::-webkit-scrollbar': {
				width: 6,
			},
			'&::-webkit-scrollbar-track': {
				background: 'transparent',
			},
			'&::-webkit-scrollbar-thumb': {
				backgroundColor: theme.colors.scrollbarThumb,
				borderRadius: theme.radius.full,
			},
		},
		message: {
			listStyle: 'none',
			fontSize: 15,
			padding: '6px 10px',
			borderRadius: theme.radius.full,
			background: theme.colors.messageBackground,
			color: theme.colors.textAccentSoft,
			display: 'inline-flex',
			alignItems: 'baseline',
			gap: 6,
			maxWidth: '100%',
			alignSelf: 'flex-start',
			animation: '$messageIn 0.18s ease-out',
		},
		messageOwn: {},
		messageBot: {},
		messageUser: {
			fontWeight: 600,
			color: '#93c5fd',
			whiteSpace: 'nowrap',
		},
		messageText: {
			wordBreak: 'break-word',
		},
		messageOwnState: {
			extend: 'message',
			alignSelf: 'flex-end',
			background: theme.colors.messageOwnBackground,
			color: theme.colors.messageOwnText,
			boxShadow: theme.shadow.messageOwn,
			'& $messageUser': {
				color: theme.colors.messageOwnText,
			},
		},
		messageBotState: {
			extend: 'message',
			background: theme.colors.messageBotBackground,
			color: theme.colors.messageBotText,
			boxShadow: theme.shadow.messageBot,
			'& $messageUser': {
				color: theme.colors.messageBotText,
			},
		},
		'@keyframes messageIn': {
			from: {
				opacity: 0,
				transform: 'translateY(4px) scale(0.98)',
			},
			to: {
				opacity: 1,
				transform: 'translateY(0) scale(1)',
			},
		},
		form: {
			width: '100%',
			display: 'flex',
			padding: '10px 12px 12px',
			background: theme.colors.windowBackground,
			gap: 8,
			borderTop: `1px solid ${theme.colors.windowBorderTop}`,
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
			backgroundColor: 'rgba(15, 23, 42, 0.95)',
			color: theme.colors.textAccentSoft,
			borderWidth: 1,
			borderStyle: 'solid',
			borderColor: 'rgba(148, 163, 184, 0.7)',
			transition:
				'border-color 0.18s ease, box-shadow 0.18s ease, background-color 0.18s ease, transform 0.1s ease',
			'&:focus': {
				borderColor: theme.colors.inputBorderFocusPurple,
				boxShadow: '0 0 0 1px rgba(168, 85, 247, 0.7)',
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
	{ name: 'Chat' }
)
