import { AppTheme } from '@styles/theme'
import { createUseStyles } from 'react-jss'

export const useStyles = createUseStyles(
	(theme: AppTheme) => ({
		banner: {
			position: 'absolute',
			top: 8,
			left: '50%',
			transform: 'translateX(-50%)',
			padding: '6px 14px',
			borderRadius: theme.radius.full,
			fontSize: 13,
			display: 'flex',
			alignItems: 'center',
			gap: 8,
			boxShadow: theme.shadow.name,
			border: `1px solid rgba(148, 163, 184, 0.7)`,
			animation: '$bannerIn 0.22s ease-out',
			backdropFilter: 'blur(6px)',
			zIndex: 1,
		},
		bannerRoundStart: {
			extend: 'banner',
			background:
				'linear-gradient(135deg, rgba(96, 165, 250, 0.9), rgba(129, 140, 248, 0.9))',
			color: '#e5e7eb',
		},
		bannerResult: {
			extend: 'banner',
			background:
				'linear-gradient(135deg, rgba(192, 132, 252, 0.95), rgba(244, 114, 182, 0.95))',
			color: '#f9fafb',
		},
		bannerInfo: {
			extend: 'banner',
			background: 'rgba(15, 23, 42, 0.9)',
			color: theme.colors.textAccentSoft,
		},
		bannerIcon: {
			fontSize: 14,
		},
		bannerText: {
			fontSize: 13,
			fontWeight: 600,
			whiteSpace: 'nowrap',
		},
		'@keyframes bannerIn': {
			from: {
				opacity: 0,
				transform: 'translateX(-50%) translateY(-6px)',
			},
			to: {
				opacity: 1,
				transform: 'translateX(-50%) translateY(0)',
			},
		},
	}),
	{ name: 'GameStatusBanner' }
)
