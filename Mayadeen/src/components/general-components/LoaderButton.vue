<script setup>
import { Icon } from "@iconify/vue";
import { computed } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();

const props = defineProps({
    color: String,
    disabled: Boolean,
    isArrow: Boolean,
    loading: Boolean,
    loadingLabel: {
        type: String,
        default: () => "processing",
    },
});

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
        :disabled="disabled || loading"
        :class="colorClass"
        class="lg:px-14 md:px-10 px-7 lg:text-lg text-base relative disabled:bg-secondary disabled:opacity-75 disabled:cursor-not-allowed hover:opacity-80 active:brightness-90 transition-opacity duration-200 ease-linear font-semibold rounded-[10px] py-4"
    >
        <template v-if="loading">
            {{ t(loadingLabel) }}
            <!-- <Icon
                width="20"
                class="iconBtn"
                icon="line-md:loading-twotone-loop"
            /> -->
        </template>
        <slot v-else />
    </button>
</template>
<style scoped>
.iconBtn {
    position: absolute;
    inset-inline-start: 20px;
    inset-block-start: 25%;
}
</style>
