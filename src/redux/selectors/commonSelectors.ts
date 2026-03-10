import { IState } from '@redux/store'

export const getUserName = (state: IState) => state.common.userName

export const getNickConfirmed = (state: IState) => state.common.nickConfirmed

export const getStatistic = (state: IState) => state.common.statistic

export const getUserCoins = (state: IState) => {
	const userName = state.common.userName
	if (!userName) return 0
	const user = state.common.statistic[userName]
	return user?.coins ?? 0
}

export const getAllMessages = (state: IState) => state.common.allMessages

export const getLastRoundResult = (state: IState) => state.common.lastRoundResult

export const getServerTimeLeft = (state: IState) => state.common.serverTimeLeft

export const getUserSentInCurrentRound = (state: IState) =>
	state.common.userSentInCurrentRound
