export type AppTheme = {
	colors: {
		backgroundBody: string
		textPrimary: string
		textSecondary: string
		textAccentSoft: string
		surfacePrimary: string
		surfaceSecondary: string
		mainBackgroundHighlight: string
		surfaceAccentBlue: string
		surfaceAccentGreen: string
		surfaceAccentPurple: string
		borderSoft: string
		borderStrong: string
		nameBorder: string
		inputBackground: string
		inputBorder: string
		inputBorderFocusBlue: string
		inputBorderFocusPurple: string
		inputFocusShadow: string
		scrollbarThumb: string
		messageBackground: string
		messageOwnBackground: string
		messageOwnText: string
		messageBotBackground: string
		messageBotText: string
		messageUserName: string
		rulesBackground: string
		rulesItemBackground: string
		leaderboardText: string
		buttonPrimaryBackgroundFrom: string
		buttonPrimaryBackgroundTo: string
		buttonPrimaryText: string
		windowBackground: string
		windowBorderTop: string
		inputStrongBackground: string
		overlayBackdrop: string
		// статус-бейджи
		statusIdleBg: string
		statusRunningBg: string
		statusRunningBorder: string
		statusRunningText: string
		statusFinishedBg: string
		statusFinishedBorder: string
		statusFinishedText: string
		// результат игры
		resultDivider: string
		resultSecondBg: string
		resultSecondBorder: string
		resultSecondText: string
		resultFirstBorder: string
		resultFirstText: string
		// баннеры
		bannerStartBg: string
		bannerStartText: string
		bannerResultBg: string
		bannerResultText: string
		bannerInfoBg: string
		// таймер и игроки
		timerValue: string
		timerDanger: string
		playerBadgeBg: string
		playerBadgeBorder: string
		playerBadgeHighlightBg: string
		playerBadgeHighlightBorder: string
	}
	shadow: {
		mainWrapper: string
		name: string
		window: string
		buttonPrimary: string
		buttonPrimaryHover: string
		buttonPrimaryActive: string
		messageOwn: string
		messageBot: string
		rules: string
		leaderboard: string
	}
	radius: {
		lg: number
		xl: number
		full: number
	}
}

export const darkTheme: AppTheme = {
	colors: {
		backgroundBody: '#020617',
		textPrimary: '#f9fafb',
		textSecondary: '#9ca3af',
		textAccentSoft: '#e5e7eb',
		surfacePrimary: '#111827',
		surfaceSecondary: '#0f172a',
		mainBackgroundHighlight: '#1e293b',
		surfaceAccentBlue: '#1d4ed8',
		surfaceAccentGreen: '#22c55e',
		surfaceAccentPurple: '#a855f7',
		borderSoft: 'rgba(148, 163, 184, 0.5)',
		borderStrong: 'rgba(148, 163, 184, 0.6)',
		nameBorder: 'rgba(59, 130, 246, 0.6)',
		inputBackground: 'rgba(15, 23, 42, 0.9)',
		inputBorder: 'rgba(148, 163, 184, 0.6)',
		inputBorderFocusBlue: '#60a5fa',
		inputBorderFocusPurple: '#a855f7',
		inputFocusShadow: '0 0 0 1px rgba(168, 85, 247, 0.7)',
		scrollbarThumb: '#4b5563',
		messageBackground: 'rgba(31, 41, 55, 0.9)',
		messageOwnBackground: 'linear-gradient(135deg, #22c55e, #4ade80)',
		messageOwnText: '#022c22',
		messageBotBackground: 'linear-gradient(135deg, #6366f1, #a855f7)',
		messageBotText: '#e0f2fe',
		messageUserName: '#93c5fd',
		rulesBackground: 'rgba(15, 23, 42, 0.9)',
		rulesItemBackground: 'rgba(31, 41, 55, 0.9)',
		leaderboardText: '#cbd5f5',
		buttonPrimaryBackgroundFrom: '#22c55e',
		buttonPrimaryBackgroundTo: '#a3e635',
		buttonPrimaryText: '#0b1120',
		windowBackground: 'rgba(15, 23, 42, 0.98)',
		windowBorderTop: 'rgba(31, 41, 55, 0.9)',
		inputStrongBackground: 'rgba(17, 24, 39, 1)',
		overlayBackdrop: 'rgba(15, 23, 42, 0.85)',
		statusIdleBg: 'rgba(15, 23, 42, 0.7)',
		statusRunningBg: 'rgba(22, 163, 74, 0.18)',
		statusRunningBorder: 'rgba(34, 197, 94, 0.8)',
		statusRunningText: '#bbf7d0',
		statusFinishedBg: 'rgba(147, 51, 234, 0.16)',
		statusFinishedBorder: 'rgba(192, 132, 252, 0.9)',
		statusFinishedText: '#f5d0fe',
		resultDivider: 'rgba(148, 163, 184, 0.6)',
		resultSecondBg: 'rgba(15, 23, 42, 0.9)',
		resultSecondBorder: 'rgba(252, 211, 77, 0.9)',
		resultSecondText: '#fef3c7',
		resultFirstBorder: 'rgba(190, 242, 100, 0.9)',
		resultFirstText: '#ecfccb',
		bannerStartBg: 'linear-gradient(135deg, rgba(96, 165, 250, 0.9), rgba(129, 140, 248, 0.9))',
		bannerStartText: '#e5e7eb',
		bannerResultBg: 'linear-gradient(135deg, rgba(192, 132, 252, 0.95), rgba(244, 114, 182, 0.95))',
		bannerResultText: '#f9fafb',
		bannerInfoBg: 'rgba(15, 23, 42, 0.9)',
		timerValue: '#e5e7eb',
		timerDanger: '#fecaca',
		playerBadgeBg: 'rgba(15, 23, 42, 0.85)',
		playerBadgeBorder: 'rgba(148, 163, 184, 0.45)',
		playerBadgeHighlightBg: 'rgba(59, 130, 246, 0.18)',
		playerBadgeHighlightBorder: 'rgba(96, 165, 250, 0.9)',
	},
	shadow: {
		mainWrapper: '0 24px 60px rgba(15, 23, 42, 0.8)',
		name: '0 16px 40px rgba(15, 23, 42, 0.8)',
		window: '0 18px 38px rgba(15, 23, 42, 0.9)',
		buttonPrimary: '0 10px 24px rgba(22, 163, 74, 0.55)',
		buttonPrimaryHover: '0 14px 30px rgba(22, 163, 74, 0.7)',
		buttonPrimaryActive: '0 8px 18px rgba(22, 163, 74, 0.6)',
		messageOwn: '0 10px 24px rgba(34, 197, 94, 0.6)',
		messageBot: '0 10px 24px rgba(79, 70, 229, 0.6)',
		rules: '0 20px 40px rgba(15, 23, 42, 0.9)',
		leaderboard: '0 20px 40px rgba(15, 23, 42, 0.9)',
	},
	radius: {
		lg: 18,
		xl: 24,
		full: 999,
	},
}

export const lightTheme: AppTheme = {
	colors: {
		backgroundBody: '#f1f5f9',
		textPrimary: '#0f172a',
		textSecondary: '#475569',
		textAccentSoft: '#1e293b',
		surfacePrimary: '#ffffff',
		surfaceSecondary: '#f8fafc',
		mainBackgroundHighlight: '#e2e8f0',
		surfaceAccentBlue: '#3b82f6',
		surfaceAccentGreen: '#16a34a',
		surfaceAccentPurple: '#9333ea',
		borderSoft: 'rgba(71, 85, 105, 0.35)',
		borderStrong: 'rgba(71, 85, 105, 0.5)',
		nameBorder: 'rgba(59, 130, 246, 0.6)',
		inputBackground: 'rgba(255, 255, 255, 0.95)',
		inputBorder: 'rgba(71, 85, 105, 0.4)',
		inputBorderFocusBlue: '#2563eb',
		inputBorderFocusPurple: '#7c3aed',
		inputFocusShadow: '0 0 0 1px rgba(124, 58, 237, 0.6)',
		scrollbarThumb: '#94a3b8',
		messageBackground: 'rgba(241, 245, 249, 0.95)',
		messageOwnBackground: 'linear-gradient(135deg, #22c55e, #4ade80)',
		messageOwnText: '#022c22',
		messageBotBackground: 'linear-gradient(135deg, #6366f1, #a855f7)',
		messageBotText: '#e0f2fe',
		messageUserName: '#1d4ed8',
		rulesBackground: 'rgba(255, 255, 255, 0.98)',
		rulesItemBackground: 'rgba(248, 250, 252, 0.98)',
		leaderboardText: '#1e293b',
		buttonPrimaryBackgroundFrom: '#22c55e',
		buttonPrimaryBackgroundTo: '#a3e635',
		buttonPrimaryText: '#0b1120',
		windowBackground: 'rgba(255, 255, 255, 0.98)',
		windowBorderTop: 'rgba(226, 232, 240, 0.9)',
		inputStrongBackground: 'rgba(248, 250, 252, 1)',
		overlayBackdrop: 'rgba(15, 23, 42, 0.5)',
		statusIdleBg: 'rgba(226, 232, 240, 0.95)',
		statusRunningBg: 'rgba(34, 197, 94, 0.2)',
		statusRunningBorder: 'rgba(34, 197, 94, 0.7)',
		statusRunningText: '#14532d',
		statusFinishedBg: 'rgba(147, 51, 234, 0.15)',
		statusFinishedBorder: 'rgba(147, 51, 234, 0.6)',
		statusFinishedText: '#581c87',
		resultDivider: 'rgba(71, 85, 105, 0.5)',
		resultSecondBg: 'rgba(251, 191, 36, 0.2)',
		resultSecondBorder: 'rgba(245, 158, 11, 0.7)',
		resultSecondText: '#78350f',
		resultFirstBorder: 'rgba(34, 197, 94, 0.7)',
		resultFirstText: '#14532d',
		bannerStartBg: 'linear-gradient(135deg, rgba(59, 130, 246, 0.9), rgba(99, 102, 241, 0.9))',
		bannerStartText: '#eff6ff',
		bannerResultBg: 'linear-gradient(135deg, rgba(147, 51, 234, 0.9), rgba(236, 72, 153, 0.9))',
		bannerResultText: '#fdf4ff',
		bannerInfoBg: 'rgba(226, 232, 240, 0.95)',
		timerValue: '#0f172a',
		timerDanger: '#b91c1c',
		playerBadgeBg: 'rgba(248, 250, 252, 0.98)',
		playerBadgeBorder: 'rgba(71, 85, 105, 0.4)',
		playerBadgeHighlightBg: 'rgba(59, 130, 246, 0.2)',
		playerBadgeHighlightBorder: 'rgba(59, 130, 246, 0.7)',
	},
	shadow: {
		mainWrapper: '0 24px 60px rgba(15, 23, 42, 0.12)',
		name: '0 16px 40px rgba(15, 23, 42, 0.1)',
		window: '0 18px 38px rgba(15, 23, 42, 0.08)',
		buttonPrimary: '0 10px 24px rgba(22, 163, 74, 0.4)',
		buttonPrimaryHover: '0 14px 30px rgba(22, 163, 74, 0.5)',
		buttonPrimaryActive: '0 8px 18px rgba(22, 163, 74, 0.45)',
		messageOwn: '0 10px 24px rgba(34, 197, 94, 0.35)',
		messageBot: '0 10px 24px rgba(79, 70, 229, 0.35)',
		rules: '0 20px 40px rgba(15, 23, 42, 0.1)',
		leaderboard: '0 20px 40px rgba(15, 23, 42, 0.1)',
	},
	radius: {
		lg: 18,
		xl: 24,
		full: 999,
	},
}

/** Тема по умолчанию (светлая). Для тёмной используй darkTheme. */
export const appTheme: AppTheme = lightTheme
