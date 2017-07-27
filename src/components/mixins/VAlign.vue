<template>
    <div class="valign" :class="{
        '-top' : align === 'top',
        '-middle' : !align || align === 'middle',
        '-bottom' : align === 'bottom',
        '-disable' : disable
    }">
        <div>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: ['align', 'disable']
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/tools';

.valign {
    &.-top {
        @include valign(top);
    }

    &.-middle {
        @include valign(middle);
    }

    &.-bottom {
        @include valign(bottom);
    }

    &.-disable {
        display: block;
        height: auto;

        & > * {
            display: block;
            height: auto;
        }
    }
}
</style>
