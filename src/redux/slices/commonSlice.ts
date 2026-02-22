import { CommonStatisticType, MessageType } from '@allTypes/commonTypes'
import { createSlice } from '@reduxjs/toolkit'

export type ICommonState = {
	userName: string
	nickConfirmed: boolean
	allMessages: MessageType[]
	statistic: CommonStatisticType
}

const initialState: ICommonState = {
	userName: '',
	nickConfirmed: false,
	allMessages: [],
	statistic: {},
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
	},
})

export const { setUserName, setNickConfirmed, setStatistic, addMessage } =
	commonSlice.actions

export const commonReducer = commonSlice.reducer
