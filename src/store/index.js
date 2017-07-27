import Vue from 'vue'
import Vuex from 'vuex'

// import store modules
import Preloader from '@/store/modules/preloader'
import Device from '@/store/modules/device'
import Ui from '@/store/modules/ui'

// declare VueX
Vue.use(Vuex)

// create the store instance
export default new Vuex.Store({
    modules: {
        preloader: Preloader,
        device: Device,
        ui: Ui
    }
})
