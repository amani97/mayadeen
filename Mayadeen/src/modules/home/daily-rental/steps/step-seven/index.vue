<script setup>
import AddAd from "@/components/general-components/AddAd.vue";
import Button from "@/components/general-components/Button.vue";
import NummerOfStep from "@/components/general-components/StepNumber.vue";
import dailyRentalButton from "../../components/dailyRentalButton.vue";
import LoadingComponent from "@/components/general-components/Loading.vue";
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import { reactive, ref } from "vue";
import { useDailyRentalStore } from "../../daily-rental-store";
import { storeToRefs } from "pinia";
const dailyRentalStore = useDailyRentalStore();
const { requestData, loading } = storeToRefs(dailyRentalStore);
const { t } = useI18n();
</script>

<template>
    <LoadingComponent v-if="loading" />
    <div class="" :class="loading ? 'page-loading' : ''">
        <Teleport to="#header-action">
            <Button class="px-8 py-[8px]" @click="router.go(-1)">{{
                t("return")
            }}</Button>
        </Teleport>
        <div class="pb-10 background-image">
            <div class="px-8">
                <AddAd />
            </div>
            <div class="steps text-center mb-20">
                <div
                    class="xs:text-sm xs:mb-7 sm:text-base sm:mb-10 md:text-lg md:mb-16 lg:text-xl xl:text-2xl"
                >
                    {{ t("Basic estate information") }}
                </div>
                <NummerOfStep :numberOfStep="7"></NummerOfStep>
            </div>
            <div
                class="px-16 name-estate flex justify-start gap-6 xs:text-sm xs:mb-7 sm:text-base sm:mb-10 md:text-lg md:mb-16 lg:text-xl xl:text-2xl"
            >
                <div>{{ t("Add a description of your property") }}</div>
                <h2 class="chooseText">{{ t("choose") }}</h2>
            </div>
            <div class="mb-20">
                <div class="description mx-auto grid grid-cols-1">
                    <textarea
                        class="noborder text-base"
                        v-model="requestData.description"
                    ></textarea>
                </div>
            </div>
            <daily-rental-button
                :isValid="true"
                next="publish"
            ></daily-rental-button>
        </div>
    </div>
</template>

<style>
.chooseText {
    color: #7d8491;
}

.description {
    background-color: white;
    border: 0.1px solid #707070;
    width: 80%;
}

/* @media(max-width:480px){
    .description {
    background-color: white;
    border: 0.1px solid #707070;
}
} */

.noborder {
    border: none;
    outline: none;
    resize: none;
    padding: 25px;
    size: 20px;
}
</style>
