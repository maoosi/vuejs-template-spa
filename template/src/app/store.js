import Vue from 'vue'
import Vuex from 'vuex'

// declare VueX
Vue.use(Vuex)

// create the store instance
export default new Vuex.Store({
    modules: {
        preloader: require('@/store/preloader').default,
        device: require('@/store/device').default,
        ui: require('@/store/ui').default
    }
})
