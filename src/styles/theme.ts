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
		scrollbarThumb: string
		messageBackground: string
		messageOwnBackground: string
		messageOwnText: string
		messageBotBackground: string
		messageBotText: string
		rulesBackground: string
		rulesItemBackground: string
		leaderboardText: string
		buttonPrimaryBackgroundFrom: string
		buttonPrimaryBackgroundTo: string
		buttonPrimaryText: string
		windowBackground: string
		windowBorderTop: string
		inputStrongBackground: string
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
	spacing: (factor: number) => number
}

export const appTheme: AppTheme = {
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
		scrollbarThumb: '#4b5563',
		messageBackground: 'rgba(31, 41, 55, 0.9)',
		messageOwnBackground: 'linear-gradient(135deg, #22c55e, #4ade80)',
		messageOwnText: '#022c22',
		messageBotBackground: 'linear-gradient(135deg, #6366f1, #a855f7)',
		messageBotText: '#e0f2fe',
		rulesBackground: 'rgba(15, 23, 42, 0.9)',
		rulesItemBackground: 'rgba(31, 41, 55, 0.9)',
		leaderboardText: '#cbd5f5',
		buttonPrimaryBackgroundFrom: '#22c55e',
		buttonPrimaryBackgroundTo: '#a3e635',
		buttonPrimaryText: '#0b1120',
		windowBackground: 'rgba(15, 23, 42, 0.98)',
		windowBorderTop: 'rgba(31, 41, 55, 0.9)',
		inputStrongBackground: 'rgba(17, 24, 39, 1)',
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
	spacing: (factor: number) => factor * 4,
}
