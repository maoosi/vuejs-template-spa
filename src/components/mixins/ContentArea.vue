<script>
export default {
    props: ['valign', 'scrollbar', 'margins'],
    render: function (createElement) {
        let dom = createElement('div', {
            'class': {
                'm-content-area': true,
                'm-content-area-no-margins': this.margins === 'false'
            }
        }, this.$slots.default)

        if (this.valign) {
            dom = createElement('v-align', {
                props: {
                    align: this.valign
                }
            }, [dom])
        }

        if (this.scrollbar === 'true') {
            dom = createElement('scroll-bar', [dom])
        }

        return dom
    }
}
</script>
