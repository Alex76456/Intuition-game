import React, { FC } from 'react'
import { useThemeContext } from '@contexts/ThemeContext'
import { useLocaleContext } from '@contexts/LocaleContext'
import { useTranslation } from '@hooks/useTranslation'
import { useHeaderStyles } from './headerStyles'
import clsx from 'clsx'
import { useSelector } from 'react-redux'
import { getUserCoins, getUserName } from '@redux/selectors/commonSelectors'

export const Header: FC = () => {
	const classes = useHeaderStyles()
	const { themeMode, toggleTheme } = useThemeContext()
	const { locale, setLocale } = useLocaleContext()
	const { t } = useTranslation()
	const userName = useSelector(getUserName)
	const coins = useSelector(getUserCoins)

	const themeTitle = themeMode === 'dark' ? 'Светлая тема' : 'Тёмная тема'

	return (
		<header className={classes.header}>
			<div className={classes.left}>
				<button
					type="button"
					className={classes.toggle}
					onClick={toggleTheme}
					title={t(themeTitle)}
					aria-label={t(themeTitle)}
				>
					{themeMode === 'dark' ? '☀️' : '🌙'}
				</button>
				<div className={classes.langGroup}>
					<button
						type="button"
						className={clsx(classes.langBtn, locale === 'ru' && classes.langBtnActive)}
						onClick={() => setLocale('ru')}
						aria-pressed={locale === 'ru'}
					>
						RU
					</button>
					<button
						type="button"
						className={clsx(classes.langBtn, locale === 'en' && classes.langBtnActive)}
						onClick={() => setLocale('en')}
						aria-pressed={locale === 'en'}
					>
						EN
					</button>
				</div>
			</div>
			{userName && (
				<div className={classes.right}>
					<div className={classes.coinsBadge} aria-label={t('Ваши монеты')}>
						<span className={classes.coinsIcon}>💰</span>
						<span>{coins}</span>
						<span className={classes.coinsLabel}>{t('монеты')}</span>
					</div>
				</div>
			)}
		</header>
	)
}
