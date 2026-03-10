export type MessageType = {
	userName: string
	message: number | string
	bet?: number
}

export type PlayerStatisticType = {
	averageAccuracy: number
	wins: number
	numbersSuggested: number
	gamesPlayed: number
	accuracyRecords: number[]
	winStreak?: number
	bestDifference?: number
	coins?: number
	lastRefillDate?: number
}

export type CommonStatisticType = {
	[key: string]: PlayerStatisticType
}

export type ServerStateType = {
	messages: MessageType[]
	nextResultDate: number
	statistic: CommonStatisticType
	lastRoundResult?: { winningNumber: number; winnerName: string; winnerNumber: number } | null
}
