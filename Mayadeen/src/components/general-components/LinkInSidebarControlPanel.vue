<script setup>
import { useI18n } from "vue-i18n";
import { Icon } from "@iconify/vue";
const { t } = useI18n();
const props = defineProps({
    icon: String,
    label: String,
    url: String,
});
</script>
<template>
    <router-link class="link-sidebar" :to="props.url">
        <Icon class="icon" width="30" :icon="icon" />
        <p class="icon-text">{{ t(props.label) }}</p>

    </router-link>
</template>
<style scoped>
.icon-text {
    color: white;
    font-size: 18px;
    font-weight: 600;
}

.link-sidebar {
    display: flex;
    gap: 25px;
    align-items: center;
    padding-block: 10px;
    padding-inline: 10px;
    border-radius: 10px;
    transition: all 0.15s ease;
}

.icon {
    color: white;
}

.link-sidebar p {
    font-size: 18px;
}

.link-sidebar:hover {
    color: var(--primary);
    background-color: #0f0f0f0c;
}
</style>
