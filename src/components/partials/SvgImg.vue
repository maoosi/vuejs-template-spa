<template>
    <img v-if="optim === false || optim === 'false' || this.$store.getters.isIE"
        class="m-svg-img-fallback"
        :width="width || '100%'"
        :height="height || '100%'"
        :src="fallback ? '/static/svg/' + fallback + '.svg' : '/static/svg/' + srcset + '.svg'"
        v-a11y:hide />
    <svg v-else
        :width="width || '100%'"
        :height="height || '100%'"
        class="m-svg-img"
        v-a11y:hide
        focusable="false">
        <use :xlink:href="'#' + srcset" />
    </svg>
</template>

<script>
// http://stackoverflow.com/questions/29891458/webpack-require-every-file-in-directory
{
    const req = require.context('@/../static/svg', true, /\.svg$/)
    req.keys().forEach(key => req(key))
}

export default {
    props: [
        'optim',
        'fallback',
        'srcset',
        'width',
        'height'
    ]
}
</script>
