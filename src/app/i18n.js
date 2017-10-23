import Vue from 'vue'
import VueI18n from 'vue-i18n'

// Declare Vue-i18n
Vue.use(VueI18n)

// Define locales
const locales = env.LOCALES.split(',')
/* const currencies = env.CURRENCIES.split(',') */

// Read routes
const routes = require('@/app/router').default.options.routes

// Dynamic yml files injection
let hmr = []
const defineMessages = (defineHMR = false) => {
    let messages = {}

    // dynamic yml files injection
    locales.forEach((locale) => {
        messages[locale] = { 'main': require(`@/locales/${locale}/main.yml`) }
        routes.forEach((route) => {
            if (route.name !== undefined) {
                messages[locale][route.name] = require(`@/locales/${locale}/${route.name}.yml`)
                if (defineHMR) hmr.push(`@/locales/${locale}/${route.name}.yml`)
            }
        })
    })

    // inject env vars into the locales
    let stringMessages = JSON.stringify(messages)
    for (let variable in env) {
        stringMessages = stringMessages.replace(new RegExp('{env.' + variable + '}', 'g'), env[variable])
    }
    messages = JSON.parse(stringMessages)

    return messages
}

// numberFormats
const defineNumbers = (defineHMR = false) => {
    const numbers = {}

    locales.forEach((locale, index) => {
        numbers[locale] = {
            /* currency: {
                style: 'currency', currency: currencies[index]
            }, */
            decimal: {
                style: 'decimal'
            }
        }
    })

    return numbers
}

// i18n declaration
let messages = defineMessages(true)
let numberFormats = defineNumbers(true)
const i18n = new VueI18n({
    locale: env.LOCALE_ACTIVE,
    fallbackLocale: env.LOCALE_FALLBACK,
    messages,
    numberFormats
})

// Hot Module Reloading
if (module.hot) {
    module.hot.accept(hmr, () => {
        defineMessages()
        defineNumbers()
        console.log('hot reload', this, arguments)
    })
}

export default i18n
