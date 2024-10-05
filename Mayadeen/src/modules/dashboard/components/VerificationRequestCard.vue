<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const props = defineProps({
    text1: String,
    text2: String,
});
</script>
<template>
    <div
        class="grid shadow-xl card relative text-xl font-semibold justify-items-center p-10 items-center background-color grid-cols-3"
    >
        <p>{{ text1 }}</p>
        <p>{{ text2 }}</p>
        <p class="suspended">{{ t("suspended") }}</p>
    </div>
</template>
<style scoped>
.card {
    border-radius: 10px;
    cursor: pointer;
}
.background-color {
    background: rgb(238, 239, 244);
    background: linear-gradient(
        180deg,
        rgba(238, 239, 244, 1) 0%,
        rgba(119, 120, 122, 1) 96%
    );
}
.suspended {
    color: #1229bc;
    font-size: 18px;
    position: absolute;
    inset-block-end: 20px;
    inset-inline-end: 20px;
}
</style>
