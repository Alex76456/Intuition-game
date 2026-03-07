import { CommonStatisticType, MessageType } from '@allTypes/commonTypes'
import { LastResult } from '@allTypes/gameStatusTypes'
import { createSlice } from '@reduxjs/toolkit'

export type SyncStatePayload = {
	messages: MessageType[]
	statistic: CommonStatisticType
	lastRoundResult: LastResult | null
	timeLeftSeconds: number
}

export type ICommonState = {
	userName: string
	nickConfirmed: boolean
	allMessages: MessageType[]
	statistic: CommonStatisticType
	lastRoundResult: LastResult | null
	serverTimeLeft: number | null
	userSentInCurrentRound: boolean
}

const initialState: ICommonState = {
	userName: '',
	nickConfirmed: false,
	allMessages: [],
	statistic: {},
	lastRoundResult: null,
	serverTimeLeft: null,
	userSentInCurrentRound: false,
}

const commonSlice = createSlice({
	name: 'common',
	initialState,
	reducers: {
		setUserName: (state, action) => {
			state.userName = action.payload
		},
		setNickConfirmed: (state, action: { payload: boolean }) => {
			state.nickConfirmed = action.payload
		},
		setStatistic: (state, action) => {
			state.statistic = action.payload
		},
		addMessage: (state, action) => {
			state.allMessages = [...state.allMessages, action.payload]
		},
		setSyncState: (state, action: { payload: SyncStatePayload }) => {
			state.allMessages = action.payload.messages
			state.statistic = action.payload.statistic
			state.lastRoundResult = action.payload.lastRoundResult
			state.serverTimeLeft = action.payload.timeLeftSeconds
			state.userSentInCurrentRound = false
		},
		setLastRoundResult: (state, action: { payload: LastResult | null }) => {
			state.lastRoundResult = action.payload
		},
		setServerTimeLeft: (state, action: { payload: number | null }) => {
			state.serverTimeLeft = action.payload
		},
		setUserSentInCurrentRound: (state, action: { payload: boolean }) => {
			state.userSentInCurrentRound = action.payload
		},
		clearUserSentInCurrentRound: (state) => {
			state.userSentInCurrentRound = false
		},
	},
})

export const {
	setUserName,
	setNickConfirmed,
	setStatistic,
	addMessage,
	setSyncState,
	setLastRoundResult,
	setServerTimeLeft,
	setUserSentInCurrentRound,
	clearUserSentInCurrentRound,
} = commonSlice.actions

export const commonReducer = commonSlice.reducer
