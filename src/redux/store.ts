import { configureStore } from '@reduxjs/toolkit'
import { ICommonState } from './slices/commonSlice'

export type IState = {
	common: ICommonState
}

import { rootReducer } from './reducers'

export const store = configureStore({ reducer: rootReducer })
