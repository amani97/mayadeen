<script setup>
import { useLocaleSwitcher } from "../../utils/locale-switcher";

const { changeLocale } = useLocaleSwitcher();

const props = defineProps({
    logoCenter: Boolean,
});
</script>

<template>
    <div
        @click="changeLocale()"
        class="text-xl text-primary"
        :class="{ 'mx-auto': props.logoCenter }"
    >
        LOGO
    </div>
</template>
