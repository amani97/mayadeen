<script setup>
import TitleHeader from "@/components/layout-components/TitleHeader.vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
const route = useRoute();
const { t } = useI18n();
</script>

<template>
    <TitleHeader>
        {{ t(route.meta.title) }}
    </TitleHeader>
    <RouterView />
    <img
        src="/assets/auth/main-mask.svg"
        class="fixed hidden xl:block rtl:-left-1 ltr:right-0 top-0 -z-10 h-screen auth-bg"
    />
</template>

<style>
[dir="ltr"] .auth-bg {
    transform: rotateY(180deg);
}
.auth-form {
    @apply xl:py-8 py-6  px-5 xl:px-24 flex flex-col overflow-auto gap-10 md:gap-8 xl:gap-10   container mx-auto;
}
</style>
