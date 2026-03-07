import { useLocaleContext } from '@contexts/LocaleContext'
import { en } from '@locales/en'

/**
 * Ключ перевода = русский текст.
 * Для locale 'ru' возвращается ключ как есть, для 'en' — значение из словаря.
 */
export function useTranslation() {
	const { locale } = useLocaleContext()

	const t = (key: string): string => {
		if (locale === 'ru') return key
		return en[key] ?? key
	}

	return { t, locale }
}
