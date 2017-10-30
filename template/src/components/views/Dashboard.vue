<template>
    <div :class="this.$options.name">
        <content-area scrollbar="true" valign="middle">
            <h1 class="_heading-m" v-t="'dashboard.title'"></h1>
            <p v-t="'dashboard.lorem'"></p>
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

.dashboard {
    background: transparent;
}
</style>
