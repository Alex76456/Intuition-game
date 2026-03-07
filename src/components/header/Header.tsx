import React, { FC } from 'react'
import { useThemeContext } from '@contexts/ThemeContext'
import { useHeaderStyles } from './headerStyles'

export const Header: FC = () => {
	const classes = useHeaderStyles()
	const { themeMode, toggleTheme } = useThemeContext()

	return (
		<header className={classes.header}>
			<div className={classes.left}>
				<button
					type="button"
					className={classes.toggle}
					onClick={toggleTheme}
					title={themeMode === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
					aria-label={themeMode === 'dark' ? 'Светлая тема' : 'Тёмная тема'}
				>
					{themeMode === 'dark' ? '☀️' : '🌙'}
				</button>
			</div>
		</header>
	)
}
