export type PhaseVariant = 'idle' | 'running' | 'finished' | 'noPlayers'

export type PhaseInfo = {
	title: string
	description: string
	variant: PhaseVariant
}

export type BannerVariant = 'greeting' | 'roundStart' | 'roundResult' | 'noPlayers'

export type BannerState = {
	variant: BannerVariant
	text: string
} | null

export type LastResult = {
	winningNumber: number
	winnerName: string
	winnerNumber: number
}

