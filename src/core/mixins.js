export default {
    data () {
        return {
            locale: env.LOCALE_ACTIVE
        }
    },
    components: {
        'content-area': require('@/components/mixins/ContentArea').default,
        'v-align': require('@/components/mixins/VAlign').default,
        'scroll-bar': require('@/components/mixins/ScrollBar').default,
        'o': require('@/components/mixins/Optional').default,
        'svg-img': require('@/components/mixins/SvgImg').default
    },
    activated () {
        let route = this.$route.matched.length
            ? this.$route.matched[this.$route.matched.length - 1] : false

        if (route && route.components.default.name === this.$options.name && route.meta.preload) {
            this.$store.dispatch('stopPreloading', 'dom')
        }
    }
}
