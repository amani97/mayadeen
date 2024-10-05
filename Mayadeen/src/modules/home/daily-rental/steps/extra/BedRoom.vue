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

const router = useRouter();
const { t } = useI18n();
var bedroomDetails = [
    { label: t("numberOfBedrooms"), key: "room_number" },
    { label: t("theNumberOfSingleBeds"), key: "bed_number" },
    { label: t("theNumberOfMasterBeds"), key: "master_bed_number" },
];
onMounted(() => {
    store.clearCurrentRoute();
});

const store = useFacilitiesStore();

function check() {
    console.log(store.checkToDisplay());
    router
        .push({ name: store.checkToDisplay() })
        .then((e) => {
            console.log(e);
        })
        .catch((err) => {
            console.log(err);
        });
}
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
            class="flex justify-center xs:text-sm xs:mb-7 sm:text-base sm:mb-10 md:text-lg md:mb-16 lg:text-xl xl:text-2xl text-secondary font-bold"
        >
            {{ t("Basic estate information") }}
        </h2>
        <h2
            class="xs:text-sm xs:mb-7 sm:text-base sm:mb-10 md:text-lg md:mb-16 lg:text-xl xl:text-2xl text-secondary font-bold"
        >
            {{ t("bedroomDetails") }}
        </h2>
        <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center xs:text-sm xs:mb-7 sm:text-base sm:mb-10 md:text-lg md:mb-16 lg:text-xl xl:text-2xl"
            v-for="item in bedroomDetails"
            :key="item.id"
        >
            <label for="">{{ item.label }} :</label>
            <Counter @updateNumber="requestData.bed[item.key] = $event" />
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
.next-btn:disabled {
    background-color: var(--secondary) !important;
    opacity: 0.9;
}
/* .iconBtnNext {
    position: absolute;
    inset-inline-start: 20px;
}
.iconBtnPrev {
    position: absolute;
    inset-inline-end: 20px;
}
.next-btn {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    @apply gap-24 text-xl font-semibold
         rounded-xl;
    color: white;
    background-color: var(--primary);
    width: 250px;
    height: 55px;
}
.previous-btn {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    @apply gap-24 text-xl font-semibold
         rounded-xl;
    width: 250px;
    height: 55px;
    color: white;
    background-color: var(--secondary);
} */
</style>
