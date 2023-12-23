import { IState } from '@redux/store'

export const getUserName = (state: IState) => state.common.userName

export const getStatistic = (state: IState) => state.common.statistic

export const getAllMessages = (state: IState) => state.common.allMessages
