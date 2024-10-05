<script setup>
import { onMounted } from "vue";
import { useLocaleSwitcher } from "./utils/locale-switcher";

const { initLocale } = useLocaleSwitcher();
onMounted(() => {
    initLocale();
});
</script>

<template>
    <RouterView />
</template>

<style scoped></style>
