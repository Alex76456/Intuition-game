import { CommonStatisticType, MessageType } from '@allTypes/commonTypes'
import { createSlice } from '@reduxjs/toolkit'
import { getRandomIntInRange } from '@utils/commonUtils'

export type ICommonState = {
	userName: string
	allMessages: MessageType[]
	statistic: CommonStatisticType
}

const initialState: ICommonState = {
	userName: `User-${getRandomIntInRange({ min: 1, max: 999 })}`,
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
		setStatistic: (state, action) => {
			state.statistic = action.payload
		},

		addMessage: (state, action) => {
			state.allMessages = [...state.allMessages, action.payload]
		},
	},
})

export const { setUserName, setStatistic, addMessage } = commonSlice.actions

export const commonReducer = commonSlice.reducer
