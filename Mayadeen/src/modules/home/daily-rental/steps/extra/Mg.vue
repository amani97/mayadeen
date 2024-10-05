<script setup>
import AddAd from "@/components/general-components/AddAd.vue";
import Counter from "@/components/form-components/Counter.vue";
import Button from "@/components/general-components/Button.vue";
import dailyRentalButton from "../../components/dailyRentalButton.vue";
import { useFacilitiesStore } from "../extra/store.js";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { Icon } from "@iconify/vue";
import { useDailyRentalStore } from "../../daily-rental-store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
const dailyRentalStore = useDailyRentalStore();
const { requestData, loading } = storeToRefs(dailyRentalStore);

const router = useRouter(),
    route = useRoute();
const { t } = useI18n();
var Mg = [
    { label: "مجلس رئيسي", key: "main_room_num" },
    { label: "مجلس اضافي", key: "extra_room_num" },
    { label: "جلسة خارجية", key: "out_room_num" },
    { label: "ملحق خارجي", key: "out_extra_num" },
];

const store = useFacilitiesStore();

onMounted(() => {
    store.clearCurrentRoute();
});
</script>
<template>
    <div class="px-10 pb-10 background-image">
        <Teleport to="#header-action">
            <Button class="px-8 py-[8px]" @click="router.go(-1)">{{
                t("return")
            }}</Button>
        </Teleport>
        <AddAd />
        <h2
            class="flex justify-center sm:text-base xs:mb-10 sm:mb-12 md:text-lg md:mb-16 lg:text-xl xl:text-2xl text-secondary font-bold"
        >
            {{ t("Basic estate information") }}
        </h2>
        <h2
            class="sm:text-base xs:mb-10 sm:mb-12 md:text-lg md:mb-16 lg:text-xl xl:text-2xl text-secondary font-bold"
        >
            تفاصيل المجالس
        </h2>
        <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center text-secondary sm:text-base sm:mb-10 md:text-lg md:mb-16 lg:text-xl xl:text-2xl"
            v-for="item in Mg"
            :key="item.id"
        >
            <label for="">{{ item.label }}</label>
            <Counter @updateNumber="requestData.living[item.key]" />
        </div>
        <div class="">
            <dailyRentalButton
                :pathName="store.getNextRoute"
                :isValid="true"
                next="next"
            ></dailyRentalButton>
        </div>
    </div>
</template>
<style scoped>
next-btn:disabled {
    background-color: var(--secondary) !important;
    opacity: 0.9;
}
</style>
