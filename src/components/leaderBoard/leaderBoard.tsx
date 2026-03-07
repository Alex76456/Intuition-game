import { getStatistic, getUserName } from '@redux/selectors/commonSelectors'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { useStyles } from './leaderBoardStyles'

export const LeaderBoard: FC = () => {
	const classes = useStyles()
	const statistic = useSelector(getStatistic)
	const userName = useSelector(getUserName)

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

	return (
		<div className={classes.leaderboard}>
			{currentUserStats && (
				<div className={classes.currentUserBlock}>
					<h2 className={classes.currentUserTitle}>Ваши результаты</h2>
					<ul className={classes.currentUserList}>
						<li>{`Побед: ${currentUserStats.wins}`}</li>
						<li>{`Средняя точность: ${currentUserStats.averageAccuracy}%`}</li>
						<li>{`Сыграно игр: ${currentUserStats.gamesPlayed}`}</li>
						<li>{`Сделано попыток: ${currentUserStats.numbersSuggested}`}</li>
					</ul>
				</div>
			)}
			<h2 className={classes.title}>Таблица лидеров по точности</h2>
			<ul className={classes.list}>
				{accuracyLeaders.slice(0, maxLeaders).map((user, index) => (
					<li
						key={user[0]}
						className={
							user[0] === userName ? classes.listItemOwn : classes.listItem
						}
					>
						{`${index + 1}. ${user[0]} (Ср. точность: ${
							user[1].averageAccuracy
						}%)`}
						{user[0] === userName && (
							<span className={classes.youBadge}>— это вы</span>
						)}
					</li>
				))}
			</ul>
			<h2 className={classes.title}>Таблица лидеров по количеству побед</h2>
			<ul className={classes.list}>
				{winsLeaders.slice(0, maxLeaders).map((user, index) => (
					<li
						key={user[0]}
						className={
							user[0] === userName ? classes.listItemOwn : classes.listItem
						}
					>
						{`${index + 1}. ${user[0]} (Побед: ${user[1].wins})`}
						{user[0] === userName && (
							<span className={classes.youBadge}>— это вы</span>
						)}
					</li>
				))}
			</ul>

			<h2 className={classes.title}>Таблица лидеров по участию в играх</h2>
			<ul className={classes.list}>
				{gamesPlayedLeaders.slice(0, maxLeaders).map((user, index) => (
					<li
						key={user[0]}
						className={
							user[0] === userName ? classes.listItemOwn : classes.listItem
						}
					>
						{`${index + 1}. ${user[0]} (Сыграно: ${user[1].gamesPlayed})`}
						{user[0] === userName && (
							<span className={classes.youBadge}>— это вы</span>
						)}
					</li>
				))}
			</ul>

			<h2 className={classes.title}>
				Таблица лидеров по количеству предложений
			</h2>
			<ul className={classes.list}>
				{numbersSuggestedLeaders.slice(0, maxLeaders).map((user, index) => (
					<li
						key={user[0]}
						className={
							user[0] === userName ? classes.listItemOwn : classes.listItem
						}
					>
						{`${index + 1}. ${user[0]} (Предложено: ${
							user[1].numbersSuggested
						})`}
						{user[0] === userName && (
							<span className={classes.youBadge}>— это вы</span>
						)}
					</li>
				))}
			</ul>
		</div>
	)
}
