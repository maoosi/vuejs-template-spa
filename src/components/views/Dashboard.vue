<template>
    <div :class="this.$options.name">
        <content-area scrollbar="true" valign="middle">
            <h1>{{ $t('dashboard.welcome') }}</h1>
        </content-area>
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
