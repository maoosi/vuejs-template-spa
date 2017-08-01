<template>
    <div ref="scrollbar" class="m-scrollbar">
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
import perfectScrollbar from 'perfect-scrollbar'
import _throttle from 'lodash.throttle'
import Eventt from 'eventt.js'

const eventt = Eventt()

export default {
    props: ['disableFrom'],
    data () {
        return {
            scrollbarExists: false
        }
    },
    methods: {
        bindEvents () {
            eventt.listen('resize', window, _throttle((event) => {
                this.updateScrollbar()
            }, 400))
        },
        unbindEvents () {
            eventt.unlisten('resize', window)
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
