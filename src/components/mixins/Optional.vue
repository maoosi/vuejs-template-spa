<template>
    <span class="optional">
        <slot></slot>
    </span>
</template>

<style lang="scss">
@import '../../assets/sass/tools';

.optional {
    @include gridle_state(mobile-down) {
        visibility: hidden;
        display: none;
    }
}
</style>
