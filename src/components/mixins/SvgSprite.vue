<template>
    <svg v-if="!this.$store.getters.isIE"
        :width="width || '100%'"
        :height="height || '100%'"
        class="sprite"
        v-a11y:hide
        focusable="false">
        <use :xlink:href="'#' + sprite" />
    </svg>
    <img v-else
        class="sprite-fallback"
        :src="fallback ? 'svgsprite/' + fallback + '.svg' : 'svgsprite/' + sprite + '.svg'"
        v-a11y:hide />
</template>

<script>
// http://stackoverflow.com/questions/29891458/webpack-require-every-file-in-directory
{
    const req = require.context('@/../static/svgsprite', true, /\.svg$/)
    req.keys().forEach(key => req(key))
}

export default {
    props: [
        'fallback',
        'sprite',
        'width',
        'height'
    ]
}
</script>

<style lang="scss" scoped>
.sprite {
    fill: currentColor;
    overflow: hidden;
    pointer-events: none;
}

.sprite-fallback {
    height: auto;
    width: auto;
    max-width: 100%;
    max-height: 100%;
}
</style>
