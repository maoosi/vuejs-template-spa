<template>
    <div :class="this.$options.name">
        <h1>{{ $t('dashboard.welcome') }}</h1>
    </div>
</template>

<script>
export default {
    name: 'dashboard'
}
</script>

<style lang="scss" scoped>
@import '../../assets/sass/tools';

.dashboard {}
</style>
