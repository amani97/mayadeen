<script setup>
import AddAd from "@/components/general-components/AddAd.vue";
import Button from "@/components/general-components/Button.vue";
import { useI18n } from "vue-i18n";
import Counter from "@/components/form-components/Counter.vue";
import { reactive, ref, onMounted } from "vue";
import CatigoriesButton from "@/components/general-components/CatigoriesButton.vue";
import dailyRentalButton from "../../components/dailyRentalButton.vue";
import { useFacilitiesStore } from "../extra/store.js";
import { Icon } from "@iconify/vue";
import { useRouter, useRoute } from "vue-router";
import { useDailyRentalStore } from "../../daily-rental-store";
import { storeToRefs } from "pinia";
const dailyRentalStore = useDailyRentalStore();
const { requestData, loading } = storeToRefs(dailyRentalStore);
const router = useRouter(),
    route = useRoute();
const { t } = useI18n();

var catigories = reactive([
    {
        id: 1,
        catigory: "الة قهوة",
        isClicked: false,
        key: "coffee_machine",
    },
    {
        id: 2,
        catigory: "اواني طبخ",
        isClicked: false,
        key: "cooking_plates",
    },
    {
        id: 3,
        catigory: "ثلاجة",
        isClicked: false,
        key: "fredg",
    },
    {
        id: 4,
        catigory: "غلاية",
        isClicked: false,
        key: "cooker",
    },
    {
        id: 5,
        catigory: "فرن",
        isClicked: false,
        key: "oven",
    },
    {
        id: 6,
        catigory: "فريزر",
        isClicked: false,
        key: "freezer",
    },
    {
        id: 7,
        catigory: "مايكرويف",
        isClicked: false,
        key: "microwave",
    },
]);
let selectedCatigory = ref([]);
function clicked(id) {
    for (let i = 0; i < catigories.length; i++) {
        if (catigories[i].id == id && catigories[i].isClicked == false) {
            catigories[i].isClicked = true;
            selectedCatigory.value.push(catigories[i].id);
        } else if (catigories[i].id == id && catigories[i].isClicked == true) {
            catigories[i].isClicked = false;
            var index = selectedCatigory.value.indexOf(id);
            if (index > -1) {
                selectedCatigory.value.splice(index, 1);
            }
        }
    }
}

const store = useFacilitiesStore();

onMounted(() => {
    store.clearCurrentRoute();
});
</script>
<template>
    <div class="background-image px-10 pb-10">
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
            class="mb-7 sm:text-base sm:mb-10 md:text-lg md:mb-16 lg:text-xl xl:text-2xl text-secondary font-bold"
        >
            {{ t("kitchenDetails") }}
        </h2>
        <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-center text-secondary sm:text-base sm:mb-10 md:text-lg md:mb-16 lg:text-xl xl:text-2xl"
        >
            <label for="">{{ t("theNumberOfDiningTableChairs") }} :</label>
            <Counter @updateNumber="requestData.kit['num_of_chars'] = $event" />
        </div>
        <h2
            class="mb-3 mt-5 sm:text-base sm:mb-10 md:text-lg md:mb-16 lg:text-xl xl:text-2xl text-secondary"
        >
            {{ t("kitchenFacilities") }} :
        </h2>
        <div
            class="CatigoriesButton-container w-full mx-auto flex justify-between grid xl:grid-cols-5 gap-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1"
        >
            <CatigoriesButton
                v-for="cat in catigories"
                :isClicked="cat.isClicked"
                :key="cat.id"
                @click="
                    clicked(cat.id);
                    requestData.kit[cat.key] = Number(cat.isClicked);
                "
                >{{ cat.catigory }}</CatigoriesButton
            >
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
.CatigoriesButton-container {
    @apply items-center mt-10;
}

.next-btn:disabled {
    background-color: var(--secondary) !important;
    opacity: 0.9;
}
.iconBtnNext {
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
}
</style>
