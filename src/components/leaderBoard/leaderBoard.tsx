import { getStatistic, getUserName } from '@redux/selectors/commonSelectors'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { useStyles } from './leaderBoardStyles'

export const LeaderBoard: FC = () => {
	const classes = useStyles()
	const statistic = useSelector(getStatistic)
	const userName = useSelector(getUserName)

	const currentUserStats = userName ? statistic[userName] : undefined

	const accuracyLeaders = Object.entries(statistic).sort(
		(a, b) => b[1].averageAccuracy - a[1].averageAccuracy
	)
	const winsLeaders = Object.entries(statistic).sort(
		(a, b) => b[1].wins - a[1].wins
	)
	const gamesPlayedLeaders = Object.entries(statistic).sort(
		(a, b) => b[1].gamesPlayed - a[1].gamesPlayed
	)
	const numbersSuggestedLeaders = Object.entries(statistic).sort(
		(a, b) => b[1].numbersSuggested - a[1].numbersSuggested
	)

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
				{accuracyLeaders.map((user, index) => (
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
				{winsLeaders.map((user, index) => (
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
				{gamesPlayedLeaders.map((user, index) => (
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
				{numbersSuggestedLeaders.map((user, index) => (
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
