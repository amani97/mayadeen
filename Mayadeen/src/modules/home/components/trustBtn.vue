<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const props = defineProps({
    text: String,
});
</script>

<template>
    <div class="flex justify-center">
        <button
            class="shadow-xl flex items-center justify-center gap-20 text-xl font-semibold py-4 px-48 bg-primary text-color rounded-xl"
        >
            <p class="whitespace-nowrap">{{ t(props.text) }}</p>
            <img class="w-8" src="/assets/home/verification.svg" alt="icon" />
        </button>
    </div>
</template>
<style scoped>
.text-color {
    width: 43%;
    color: white;
}
button {
    transition: all 0.2s;
}
button:hover {
    opacity: 0.9;
}
</style>
