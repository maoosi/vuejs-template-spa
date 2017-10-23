<template>
    <div id="app">
        <div class="aria-status" role="status" tabindex="-1" aria-live="passive">{{ ariaStatus }}</div>

        <keep-alive>
            <router-view class="view" />
        </keep-alive>
    </div>
</template>

<script>
import _debounce from 'lodash.debounce'

export default {
    name: 'app',
    computed: {
        ariaStatus () {
            return this.$route.meta.label !== undefined ? this.$route.meta.label + ' page' : ''
        }
    },
    mounted () {
        // update device after a resize
        this.$eventt.listen('resize', window, _debounce(() => { this.detectDevice() }, 300))
        this.$eventt.trigger('resize', window)

        // Apply browser fixes after DOM is loaded
        this.$eventt.listen('DOMContentLoaded', window, () => {
            this.fixFocusableSvgs()
        })
    },
    methods: {
        detectDevice () {
            this.$store.dispatch('detectDevice')
        },
        fixFocusableSvgs () {
            // Add focusable="false" to prevent bug on IE
            let svgsToFix = document.querySelectorAll('svg:not([focusable])')
            for (let i = 0; i < svgsToFix.length; i++) svgsToFix[i].setAttribute('focusable', 'false')
        }
    }
}
</script>

<style lang="scss">
@import '../assets/sass/app';

#app {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    overflow: hidden;

    .view {
        position: relative;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
}

.aria-status {
    width: 0;
    height: 0;
    overflow: hidden;
    display: block;
    position: absolute;
    z-index: -1;
}
</style>
