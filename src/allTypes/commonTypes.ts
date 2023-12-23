export type MessageType = {
	userName: string
	message: number
}

export type PlayerStatisticType = {
	averageAccuracy: number
	wins: number
	numbersSuggested: number
	gamesPlayed: number
	accuracyRecords: number[]
}

export type CommonStatisticType = {
	[key: string]: PlayerStatisticType
}

export type ServerStateType = {
	messages: MessageType[]
	nextResultDate: number
	statistic: CommonStatisticType
}
