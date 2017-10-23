export default {
    data () {
        return {
            locale: env.LOCALE_ACTIVE
        }
    },
    components: {
        'content-area': require('@/components/partials/ContentArea').default,
        'v-align': require('@/components/partials/VAlign').default,
        'scroll-bar': require('@/components/partials/ScrollBar').default,
        'svg-img': require('@/components/partials/SvgImg').default
    },
    activated () {
        let route = this.$route.matched.length
            ? this.$route.matched[this.$route.matched.length - 1] : false

        if (route && route.components.default.name === this.$options.name && route.meta.preload) {
            this.$store.dispatch('stopPreloading', 'dom')
        }
    }
}
