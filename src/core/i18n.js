import Vue from 'vue'
import VueI18n from 'vue-i18n'

// Declare Vue-i18n
Vue.use(VueI18n)

// Define locales
const locales = env.LOCALES.split(',')

// Read routes
const routes = require('@/core/router').default.options.routes

// Dynamic yml files injection
let hmr = []
const defineMessages = (defineHMR = false) => {
    let messages = {}
    locales.forEach((locale) => {
        messages[locale] = { 'base': require(`@/locales/${locale}/base.yml`) }
        routes.forEach((route) => {
            if (route.name !== undefined) {
                messages[locale][route.name] = require(`@/locales/${locale}/${route.name}.yml`)
                if (defineHMR) hmr.push(`@/locales/${locale}/${route.name}.yml`)
            }
        })
    })

    // Inject env vars
    let stringMessages = JSON.stringify(messages)
    for (let variable in env) {
        stringMessages = stringMessages.replace(new RegExp('{env.' + variable + '}', 'g'), env[variable])
    }
    messages = JSON.parse(stringMessages)

    return messages
}

// i18n declaration
let messages = defineMessages(true)
const i18n = new VueI18n({
    locale: env.LOCALE_ACTIVE,
    fallbackLocale: env.LOCALE_FALLBACK,
    messages
})

// Hot Module Reloading
if (module.hot) {
    module.hot.accept(hmr, () => {
        defineMessages()
        console.log('hot reload', this, arguments)
    })
}

export default i18n
