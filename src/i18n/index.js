import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import fr from './locales/fr.json'
import ja from './locales/ja.json'
export default createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  legacy: false,
  globalInjection: true,
  messages: loadLocaleMessages()
})
function loadLocaleMessages() {
  const locales = [{ en: en }, { fr: fr }, { ja: ja }]
  const messages = {}
  locales.forEach((lang) => {
    const key = Object.keys(lang)
    messages[key] = lang[key]
  })

  return messages
}
