<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const props = defineProps({
    image: String,
    text: String,
    url: String,
    isIcon: { type: Boolean, default: true },
});
</script>

<template>
    <div class="flex gap-3 justify-center item-center">
        <img v-if="isIcon" class="w-5" :src="props.image" alt="icon" />
        <router-link
            :to="props.url"
            class="text-accent text-xl border-b-primary border-b-2 pb-2"
        >
            {{ t(props.text) }}</router-link
        >
    </div>
</template>
<style></style>
