<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const props = defineProps({
    image: String,
    label: String,
    url: String,
});
</script>
<template>
    <router-link class="link-sidebar" :to="props.url">
        <img class="w-7" :src="props.image" alt="icon" />
        <p class="">{{ t(props.label) }}</p>
    </router-link>
</template>
<style scoped>
.link-sidebar {
    display: flex;
    gap: 25px;
    align-items: center;
    padding-block: 10px;
    padding-inline: 10px;
    border-radius: 10px;
    transition: all 0.15s ease;
}
.link-sidebar p {
    font-size: 18px;
}
.link-sidebar:hover {
    color: var(--primary);
    background-color: #0f0f0f0c;
}
</style>
