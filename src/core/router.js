import Vue from 'vue'
import Router from 'vue-router'

// declare Vue-Router
Vue.use(Router)

// Async components
const Dashboard = () => import('@/components/views/Dashboard')

// Router mapping
const router = new Router({
    mode: 'history',
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 }
    },
    routes: [
        {
            path: '/',
            name: 'dashboard',
            component: Dashboard,
            meta: {}
        }
    ]
})

// Router guard
router.beforeEach((to, from, next) => {
    // proceed
    next()
})

export default router
