import { combineReducers } from 'redux'

import { commonReducer } from '@redux/slices/commonSlice'

export const rootReducer = combineReducers({ common: commonReducer })
