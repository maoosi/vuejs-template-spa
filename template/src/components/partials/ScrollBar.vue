<template>
    <div ref="scrollbar" class="m-scrollbar">
        <div class="m-scrollbar-area">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import PerfectScrollbar from 'perfect-scrollbar'
import _throttle from 'lodash.throttle'

export default {
    props: ['disableFrom'],
    data () {
        return {
            scrollbar: false
        }
    },
    methods: {
        bindEvents () {
            this.$eventt.listen('resize', window, _throttle((event) => {
                this.resize()
            }, 400), { uid: 'scrollbar' })
        },
        unbindEvents () {
            this.$eventt.unlisten('resize', window, 'scrollbar')
        },
        resize () {
            let reqDisable = this.disableFrom && window.innerWidth >= this.disableFrom

            if (this.scrollbar && reqDisable) {
                this.destroyScrollbar()
            } else if (!this.scrollbar && !reqDisable) {
                this.createScrollbar()
            } else if (this.scrollbar) {
                this.updateScrollbar()
            }
        },
        updateScrollbar () {
            this.scrollbar.update()
        },
        createScrollbar () {
            this.scrollbar = new PerfectScrollbar(this.$refs.scrollbar, {
                suppressScrollX: true
            })
        },
        destroyScrollbar () {
            this.scrollbar.destroy()
            this.scrollbar = false
        }
    },
    mounted () {
        this.resize()
        this.bindEvents()
    },
    beforeDestroy () {
        this.destroyScrollbar()
        this.unbindEvents()
    }
}
</script>
