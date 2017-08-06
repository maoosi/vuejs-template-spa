<template>
    <div ref="scrollbar" class="m-scrollbar">
        <div class="m-scrollbar-area">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import perfectScrollbar from 'perfect-scrollbar'
import _throttle from 'lodash.throttle'

export default {
    props: ['disableFrom'],
    data () {
        return {
            scrollbarExists: false
        }
    },
    methods: {
        bindEvents () {
            this.$eventt.listen('resize', window, _throttle((event) => {
                this.updateScrollbar()
            }, 400))
        },
        unbindEvents () {
            this.$eventt.unlisten('resize', window)
        },
        updateScrollbar () {
            let reqDisable = this.disableFrom && window.innerWidth >= this.disableFrom

            if (this.scrollbarExists && reqDisable) {
                this.destroyScrollbar()
            } else if (!this.scrollbarExists && !reqDisable) {
                this.createScrollbar()
            } else if (this.scrollbarExists) {
                perfectScrollbar.update(this.$refs.scrollbar)
            }
        },
        createScrollbar () {
            perfectScrollbar.initialize(this.$refs.scrollbar, {
                suppressScrollX: true,
                theme: 'm-scrollbar'
            })
            this.scrollbarExists = true
        },
        destroyScrollbar () {
            perfectScrollbar.destroy(this.$refs.scrollbar)
            this.scrollbarExists = false
        }
    },
    mounted () {
        this.updateScrollbar()
        this.bindEvents()
    },
    beforeDestroy () {
        this.destroyScrollbar()
        this.unbindEvents()
    }
}
</script>
