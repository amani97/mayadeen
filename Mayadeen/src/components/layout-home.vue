<script setup>
import TitleHeader from "@/components/layout-components/TitleHeader.vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
const route = useRoute();
const { t } = useI18n();
</script>

<template>
    <TitleHeader :logoCenter="route.meta.title === 'logoCenter'" class="h-16">
        {{ route.meta.title !== "logoCenter" ? t(route.meta.title) : "" }}
    </TitleHeader>
    <RouterView :key="route.path" />
</template>
<style scoped>
.auth-form {
    @apply xl:py-8 py-6  px-5 xl:px-24 flex flex-col overflow-auto gap-10 md:gap-8 xl:gap-10   container mx-auto;
}
</style>
