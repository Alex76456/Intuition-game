import { getStatistic } from '@redux/selectors/commonSelectors'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'

export const LeaderBoard: FC = () => {
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
		<div className='leaderboard'>
			<h2>Таблица лидеров по точности</h2>
			<ul className='leaderboardList'>
				{accuracyLeaders.map((user, index) => (
					<li key={user[0]}>{`${index + 1}. ${user[0]} (Ср. точность: ${
						user[1].averageAccuracy
					}%)`}</li>
				))}
			</ul>
			<h2>Таблица лидеров по количеству побед</h2>
			<ul>
				{winsLeaders.map((user, index) => (
					<li key={user[0]}>{`${index + 1}. ${user[0]} (Побед: ${
						user[1].wins
					})`}</li>
				))}{' '}
			</ul>

			<h2>Таблица лидеров по участию в играх</h2>
			<ul>
				{gamesPlayedLeaders.map((user, index) => (
					<li key={user[0]}>{`${index + 1}. ${user[0]} (Сыграно: ${
						user[1].gamesPlayed
					})`}</li>
				))}
			</ul>

			<h2>Таблица лидеров по количеству предложений</h2>
			<ul>
				{numbersSuggestedLeaders.map((user, index) => (
					<li key={user[0]}>{`${index + 1}. ${user[0]} (Предложено: ${
						user[1].numbersSuggested
					})`}</li>
				))}
			</ul>
		</div>
	)
}
