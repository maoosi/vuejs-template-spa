<template>
    <div class="m-valign" :class="{
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
