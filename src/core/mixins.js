export default {
    data () {
        return {
            locale: env.LOCALE_ACTIVE
        }
    },
    components: {
        'v-align': require('@/components/mixins/VAlign'),
        'scroll-bar': require('@/components/mixins/Scrollbar'),
        'o': require('@/components/mixins/Optional'),
        'svg-sprite': require('@/components/mixins/SvgSprite')
    },
    activated () {
        let route = this.$route.matched.length
            ? this.$route.matched[this.$route.matched.length - 1] : false

        if (route && route.components.default.name === this.$options.name && route.meta.preload) {
            this.$store.dispatch('stopPreloading', 'dom')
        }
    }
}
