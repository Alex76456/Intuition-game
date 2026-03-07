import { getStatistic, getUserName } from '@redux/selectors/commonSelectors'
import React, { FC, useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from '@hooks/useTranslation'
import { useStyles } from './leaderBoardStyles'

const LEADERBOARD_TAB_KEY = 'gi-leaderboard-tab'
type TabId = 'accuracy' | 'wins' | 'games' | 'suggestions'

function getStoredTab(): TabId {
	if (typeof window === 'undefined') return 'accuracy'
	try {
		const s = window.localStorage.getItem(LEADERBOARD_TAB_KEY)
		if (s === 'accuracy' || s === 'wins' || s === 'games' || s === 'suggestions') return s
	} catch {
		// ignore
	}
	return 'accuracy'
}

export const LeaderBoard: FC = () => {
	const classes = useStyles()
	const { t } = useTranslation()
	const statistic = useSelector(getStatistic)
	const userName = useSelector(getUserName)
	const [activeTab, setActiveTabState] = useState<TabId>('accuracy')
	useEffect(() => {
		setActiveTabState(getStoredTab())
	}, [])

	useEffect(() => {
		try {
			window.localStorage.setItem(LEADERBOARD_TAB_KEY, activeTab)
		} catch {
			// ignore
		}
	}, [activeTab])

	const setActiveTab = useCallback((tab: TabId) => {
		setActiveTabState(tab)
	}, [])

	const isBot = (name: string) => name.toLowerCase().includes('bot')
	const statisticEntries = Object.entries(statistic).filter(
		([name]) => !isBot(name)
	)

	const currentUserStats =
		userName && !isBot(userName) ? statistic[userName] : undefined

	const accuracyLeaders = statisticEntries.slice().sort(
		(a, b) => b[1].averageAccuracy - a[1].averageAccuracy
	)
	const winsLeaders = statisticEntries.slice().sort(
		(a, b) => b[1].wins - a[1].wins
	)
	const gamesPlayedLeaders = statisticEntries.slice().sort(
		(a, b) => b[1].gamesPlayed - a[1].gamesPlayed
	)
	const numbersSuggestedLeaders = statisticEntries.slice().sort(
		(a, b) => b[1].numbersSuggested - a[1].numbersSuggested
	)

	const maxLeaders = 10

	type LeaderboardTab = {
		id: TabId
		shortLabel: string
		label: string
		leaders: [string, typeof statisticEntries[0][1]][]
		line: (_entry: typeof statisticEntries[0], _idx: number) => string
	}
	const tabs: LeaderboardTab[] = [
		{ id: 'accuracy', shortLabel: t('Точность'), label: t('Таблица лидеров по точности'), leaders: accuracyLeaders.slice(0, maxLeaders), line: (u, i) => `${i + 1}. ${u[0]} (${t('Ср. точность:')} ${u[1].averageAccuracy}%)` },
		{ id: 'wins', shortLabel: t('Побед'), label: t('Таблица лидеров по количеству побед'), leaders: winsLeaders.slice(0, maxLeaders), line: (u, i) => `${i + 1}. ${u[0]} (${t('Побед:')} ${u[1].wins})` },
		{ id: 'games', shortLabel: t('Игр'), label: t('Таблица лидеров по участию в играх'), leaders: gamesPlayedLeaders.slice(0, maxLeaders), line: (u, i) => `${i + 1}. ${u[0]} (${t('Сыграно:')} ${u[1].gamesPlayed})` },
		{ id: 'suggestions', shortLabel: t('Попыток'), label: t('Таблица лидеров по количеству предложений'), leaders: numbersSuggestedLeaders.slice(0, maxLeaders), line: (u, i) => `${i + 1}. ${u[0]} (${t('Предложено:')} ${u[1].numbersSuggested})` },
	]
	const currentTab = tabs.find((tab) => tab.id === activeTab) ?? tabs[0]

	return (
		<div className={classes.leaderboard}>
			{currentUserStats && (
				<div className={classes.currentUserBlock}>
					<h2 className={classes.currentUserTitle}>{t('Ваши результаты')}</h2>
					<ul className={classes.currentUserList}>
						<li>{`${t('Побед:')} ${currentUserStats.wins}`}</li>
						<li>{`${t('Средняя точность:')} ${currentUserStats.averageAccuracy}%`}</li>
						<li>{`${t('Сыграно игр:')} ${currentUserStats.gamesPlayed}`}</li>
						<li>{`${t('Сделано попыток:')} ${currentUserStats.numbersSuggested}`}</li>
						{currentUserStats.winStreak !== undefined && currentUserStats.winStreak > 0 && (
							<li>{`${t('Серия побед:')} ${currentUserStats.winStreak}`}</li>
						)}
						{currentUserStats.bestDifference !== undefined && (
							<li>{`${t('Лучший результат (мин. разница):')} ${currentUserStats.bestDifference}`}</li>
						)}
					</ul>
				</div>
			)}
			<div className={classes.tabs} role="tablist" aria-label={t('Таблица лидеров по точности')}>
				{tabs.map((tab) => (
					<button
						key={tab.id}
						type="button"
						role="tab"
						aria-selected={activeTab === tab.id}
						className={activeTab === tab.id ? [classes.tab, classes.tabActive].join(' ') : classes.tab}
						onClick={() => setActiveTab(tab.id)}
					>
						{tab.shortLabel}
					</button>
				))}
			</div>
			<h2 className={classes.title} id="leaderboard-panel-label">{currentTab.label}</h2>
			<ul className={classes.list} role="tabpanel" aria-labelledby="leaderboard-panel-label">
				{currentTab.leaders.map((user, index) => (
					<li
						key={user[0]}
						className={
							user[0] === userName ? classes.listItemOwn : classes.listItem
						}
					>
						{currentTab.line(user, index)}
						{user[0] === userName && (
							<span className={classes.youBadge}>{t('— это вы')}</span>
						)}
					</li>
				))}
			</ul>
		</div>
	)
}
