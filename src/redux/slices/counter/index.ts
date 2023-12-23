import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	count: 20,
}

const counterSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		increase: (state, action) => {
			state.count = action.payload
		},
		decrease: (state) => {
			state.count--
		},
	},
})

export const { increase, decrease } = counterSlice.actions

export default counterSlice.reducer
