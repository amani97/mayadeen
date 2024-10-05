<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const props = defineProps({
    isOffice: { type: Boolean, default: false },
});
</script>
<template>
    <div class="p-10">
        <div v-if="!isOffice" class="grid grid-cols-3 mb-10 text-2xl">
            <p>{{ t("licenseNumber") }}</p>
            <p>15154956121465</p>
        </div>
        <div class="grid grid-cols-3 mb-10 text-2xl">
            <p>{{ t("iDNumber") }}</p>
            <p>15154956121465</p>
        </div>
        <div class="grid grid-cols-3 mb-10 text-2xl">
            <p>{{ t("username") }}</p>
            <p>15154956121465</p>
        </div>
        <div class="grid grid-cols-3 mb-10 text-2xl">
            <p>{{ t("phoneNumber") }}</p>
            <p>15154956121465</p>
        </div>
        <div class="flex mt-24 flex-col gap-10 justify-center items-center">
            <button class="accept w-1/2">
                {{ t("acceptRequest") }}
            </button>
            <button class="regect w-1/2">
                {{ t("regectRequest") }}
            </button>
        </div>
    </div>
</template>
<style scoped>
.accept {
    background: rgb(251, 181, 46);
    background: linear-gradient(
        180deg,
        rgba(251, 181, 46, 1) 0%,
        rgba(126, 91, 23, 1) 80%
    );
    color: white;
    padding: 20px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 20px;
    transition: all 0.3s;
}
.accept:hover {
    opacity: 0.8;
}
.regect:hover {
    opacity: 0.8;
}
.regect {
    color: #444444;
    transition: all 0.3s;
    background: rgb(217, 222, 246);
    background: linear-gradient(
        180deg,
        rgba(217, 222, 246, 1) 0%,
        rgba(84, 89, 99, 1) 85%
    );
    padding: 20px;
    border-radius: 10px;
    font-weight: 600;
    font-size: 20px;
}
</style>
