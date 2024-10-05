<script setup>
import AddAd from "@/components/general-components/AddAd.vue";
import Button from "@/components/general-components/Button.vue";
import NummerOfStep from "@/components/general-components/StepNumber.vue";

import CatigoriesButton from "@/components/general-components/CatigoriesButton.vue";
import { useI18n } from "vue-i18n";
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import dailyRentalButton from "../../components/dailyRentalButton.vue";
import { useDailyRentalStore } from "../../daily-rental-store";
import { storeToRefs } from "pinia";
import { Form } from "vee-validate";
const store = useDailyRentalStore();
const { requestData } = storeToRefs(store);
const router = useRouter(),
    route = useRoute();
const { t } = useI18n();
var catigories = reactive([
    {
        id: 1,
        catigory: "العاب اطفال",
        isClicked: false,
    },
    {
        id: 2,
        catigory: "اضاءة اضافية",
        isClicked: false,
    },
    {
        id: 3,
        catigory: "العاب رملية",
        isClicked: false,
    },
    {
        id: 4,
        catigory: "برميل مندي",
        isClicked: false,
    },
    {
        id: 5,
        catigory: "بروجكتور",
        isClicked: false,
    },
    {
        id: 6,
        catigory: "بلايستيشن",
        isClicked: false,
    },
    {
        id: 7,
        catigory: "بلياردو",
        isClicked: false,
    },
    {
        id: 8,
        catigory: "بيت شعر",
        isClicked: false,
    },
    {
        id: 9,
        catigory: "بيت شعر ملكي",
        isClicked: false,
    },
    {
        id: 10,
        catigory: "تزلج على الرمل",
        isClicked: false,
    },
    {
        id: 11,
        catigory: "تلفزيون",
        isClicked: false,
    },
    {
        id: 12,
        catigory: "جلسة عريش",
        isClicked: false,
    },
    {
        id: 13,
        catigory: "خيمة",
        isClicked: false,
    },
    {
        id: 14,
        catigory: "رذاذ",
        isClicked: false,
    },
    {
        id: 15,
        catigory: "ركن شواء",
        isClicked: false,
    },
    {
        id: 16,
        catigory: "زحليقة",
        isClicked: false,
    },
    {
        id: 17,
        catigory: "ستيج مضيئ",
        isClicked: false,
    },
    {
        id: 18,
        catigory: "سماعات",
        isClicked: false,
    },
    {
        id: 19,
        catigory: "صالة طعام",
        isClicked: false,
    },
    {
        id: 20,
        catigory: "طاولة تنس",
        isClicked: false,
    },
    {
        id: 21,
        catigory: "غرفة سائقين",
        isClicked: false,
    },
    {
        id: 22,
        catigory: "غرفة سينما",
        isClicked: false,
    },
    {
        id: 23,
        catigory: "قسمين",
        isClicked: false,
    },
    {
        id: 24,
        catigory: "قسمين متصلة بينهم باب",
        isClicked: false,
    },
    {
        id: 25,
        catigory: "قسمين منفصلة",
        isClicked: false,
    },
    {
        id: 26,
        catigory: "كرسي مساج",
        isClicked: false,
    },
    {
        id: 27,
        catigory: "مسبح عام للنساء",
        isClicked: false,
    },
    {
        id: 29,
        catigory: "مسبح عام مشترك",
        isClicked: false,
    },
    {
        id: 30,
        catigory: "مسطح اخضر",
        isClicked: false,
    },
    {
        id: 31,
        catigory: "ملحق خارجي",
        isClicked: false,
    },
    {
        id: 32,
        catigory: "ملعب كرة سلة",
        isClicked: false,
    },
    {
        id: 33,
        catigory: "ملعب كرة طائرة",
        isClicked: false,
    },
    {
        id: 34,
        catigory: "ملعب كرة قدم",
        isClicked: false,
    },
    {
        id: 35,
        catigory: "موقد حطب",
        isClicked: false,
    },
    {
        id: 36,
        catigory: "نطيطه",
        isClicked: false,
    },
]);
let selectedCatigory = ref([]);
function clicked(id) {
    for (let i = 0; i < catigories.length; i++) {
        if (catigories[i].id == id && catigories[i].isClicked == false) {
            catigories[i].isClicked = true;
            requestData.value.ads.push({ name: catigories[i].catigory });
            selectedCatigory.value.push(catigories[i].id);
        } else if (catigories[i].id == id && catigories[i].isClicked == true) {
            catigories[i].isClicked = false;
            var index = selectedCatigory.value.indexOf(id);
            if (index > -1) {
                requestData.value.ads.splice(index, 1);
                selectedCatigory.value.splice(index, 1);
            }
        }
    }
}
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
            class="flex justify-center xs:text-sm xs:mb-7 sm:text-base sm:mb-10 md:text-lg md:mb-16 lg:text-xl xl:text-2xl text-secondary font-bold"
        >
            {{ t("Basic estate information") }}
        </h2>

        <NummerOfStep :numberOfStep="7"></NummerOfStep>
        <div
            class="flex font-semibold gap-10 items-center xs:text-sm xs:mb-7 sm:text-base sm:mb-10 md:text-lg md:mb-16 lg:text-xl xl:text-2xl mt-5"
        >
            <h2 class="text-secondary">
                {{ t("yourPropertysExtraFacilities") }}
            </h2>
            <h2 class="chooseText">{{ t("choose") }}</h2>
        </div>

        <div
            class="btnC flex justify-between grid xl:grid-cols-5 gap-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1"
        >
            <CatigoriesButton
                v-for="cat in catigories"
                :isClicked="cat.isClicked"
                :key="cat.id"
                @click="clicked(cat.id)"
                >{{ cat.catigory }}</CatigoriesButton
            >
        </div>
        <daily-rental-button
            @next-clicked="router.push({ name: 'step6' })"
            next="next"
        ></daily-rental-button>
    </div>
</template>
<style scoped>
/* .CatigoriesButton-container {
    @apply grid grid-cols-5  items-center my-20 gap-10;
    width: 90%;
} */
.chooseText {
    color: #7d8491;
}
</style>
