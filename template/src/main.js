import Vue from 'vue'
import App from '@/components/App'
import router from '@/app/router'
import i18n from '@/app/i18n'
import store from '@/app/store'
import { sync } from 'vuex-router-sync'
import * as a11y from '@/app/a11y'
import { EventBus } from '@/app/bus'
import Mixin from '@/app/mixin'
import Eventt from 'eventt.js'

// turn production tips off
Vue.config.productionTip = false

// global mixin
Vue.mixin(Mixin)

// a11y directives
Vue.directive('a11y', {
    bind: (...args) => { a11y.directive(...args) },
    update: (...args) => { a11y.directive(...args) }
})

// global Event Bus accessible through $bus
Object.defineProperties(Vue.prototype, {
    $bus: {
        get: () => { return EventBus }
    }
})

// global event listeners manager accessible through $eventt
const eventt = Eventt()
Object.defineProperties(Vue.prototype, {
    $eventt: {
        get: () => { return eventt }
    }
})

// sync the router with the vuex store
sync(store, router)

// create the Vue instance
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    store,
    template: '<App/>',
    components: { App }
})
