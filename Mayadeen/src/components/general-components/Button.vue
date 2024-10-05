<script setup>
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
    color: String,
    disabled: Boolean,
    isArrow: Boolean,
});

const { locale } = useI18n();
const colorClass = computed(() => {
    return props.color === "primary"
        ? "bg-primary text-accent"
        : props.color === "secondary"
        ? "bg-secondary text-accent"
        : "bg-accent text-primary border border-primary";
});
</script>

<template>
    <button
        :disabled="disabled"
        :class="colorClass"
        class="px-14 text-lg relative disabled:bg-secondary disabled:opacity-75 disabled:cursor-not-allowed hover:opacity-80 active:brightness-90 transition-opacity duration-200 ease-linear font-semibold rounded-[10px] py-4"
    >
        <slot />
        <Icon
            v-show="isArrow"
            width="30"
            class="iconBtn"
            :icon="locale === 'ar' ? 'mdi:arrow-right' : 'mdi:arrow-left'"
        />
    </button>
</template>
<style scoped>
.iconBtn {
    position: absolute;
    inset-inline-start: 20px;
    inset-block-start: 25%;
}
</style>
