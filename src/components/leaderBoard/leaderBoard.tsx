import { getStatistic } from '@redux/selectors/commonSelectors'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { useStyles } from './leaderBoardStyles'

export const LeaderBoard: FC = () => {
	const classes = useStyles()
	const statistic = useSelector(getStatistic)

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
			<h2 className={classes.title}>Таблица лидеров по точности</h2>
			<ul className={classes.list}>
				{accuracyLeaders.map((user, index) => (
					<li key={user[0]}>{`${index + 1}. ${user[0]} (Ср. точность: ${
						user[1].averageAccuracy
					}%)`}</li>
				))}
			</ul>
			<h2 className={classes.title}>Таблица лидеров по количеству побед</h2>
			<ul className={classes.list}>
				{winsLeaders.map((user, index) => (
					<li key={user[0]}>{`${index + 1}. ${user[0]} (Побед: ${
						user[1].wins
					})`}</li>
				))}
			</ul>

			<h2 className={classes.title}>Таблица лидеров по участию в играх</h2>
			<ul className={classes.list}>
				{gamesPlayedLeaders.map((user, index) => (
					<li key={user[0]}>{`${index + 1}. ${user[0]} (Сыграно: ${
						user[1].gamesPlayed
					})`}</li>
				))}
			</ul>

			<h2 className={classes.title}>
				Таблица лидеров по количеству предложений
			</h2>
			<ul className={classes.list}>
				{numbersSuggestedLeaders.map((user, index) => (
					<li key={user[0]}>{`${index + 1}. ${user[0]} (Предложено: ${
						user[1].numbersSuggested
					})`}</li>
				))}
			</ul>
		</div>
	)
}
