<script setup>
import AddAd from "@/components/general-components/AddAd.vue";
import Button from "@/components/general-components/Button.vue";
import NummerOfStep from "@/components/general-components/StepNumber.vue";
import { useI18n } from "vue-i18n";
import dayAndDiscount from "../../../daily-rental/components/dayAndDiscount.vue";
import dailyRentalButton from "../../components/dailyRentalButton.vue";
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useDailyRentalStore } from "../../daily-rental-store";
import { storeToRefs } from "pinia";
import { object } from "yup";
import { Form } from "vee-validate";
import { vMaska } from "maska";
import { useValidator } from "../../../../../utils/validators";
const { isRequired, isNumber } = useValidator();
const schema = object().shape({
    Sunday: isNumber,
    Monday: isNumber,
    Tuesday: isNumber,
    Wednesday: isNumber,
    Thursday: isNumber,
    Friday: isNumber,
    Satarday: isNumber,
});
const store = useDailyRentalStore();
const { requestData, loading } = storeToRefs(store);
const router = useRouter(),
    route = useRoute();
const { t } = useI18n();

requestData.value.day = [
    {
        days: "Sunday",
        price: "",
        discount: "",
    },
    {
        days: "Monday",
        price: "",
        discount: "",
    },
    {
        days: "Tuesday",
        price: "",
        discount: "",
    },
    {
        days: "Wednesday",
        price: "",
        discount: "",
    },
    {
        days: "Thursday",
        price: "",
        discount: "",
    },
    {
        days: "Friday",
        price: "",
        discount: "",
    },
    {
        days: "Satarday",
        price: "",
        discount: "",
    },
];

var isValid = ref(false);
const form = ref(null);
const rentBtn = ref(null);
function onSubmit() {
    form.value.validate().then((e) => {
        if (e.valid) {
            isValid.value = true;
            rentBtn.value.goNext();
        }
    });
}
</script>

<template>
    <Form ref="form" v-model:validation-schema="schema" @submit="onSubmit">
        <Teleport to="#header-action">
            <Button class="px-8 py-[8px]" @click="$router.go(-1)">{{
                t("return")
            }}</Button>
        </Teleport>
        <div class="containe background-image pb-10">
            <div class="px-8">
                <AddAd />
            </div>
            <div class="steps text-center mb-20">
                <div
                    class="xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl xs:mb-8 sm:mb-10 md:mb-12 lg:mb-15"
                >
                    {{ t("Basic estate information") }}
                </div>
                <NummerOfStep :numberOfStep="7"></NummerOfStep>
            </div>
            <div
                class="px-8 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-15xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            >
                <p>
                    {{
                        t("Set estate prices according to the days of the week")
                    }}
                </p>
            </div>
            <div class="mb-10">
                <day-and-discount
                    class="mb-10 day rounded-lg"
                    v-for="(d, index) in requestData.day"
                    :key="index"
                    :day="d.days"
                    :price="d.price"
                    :discount="d.discount"
                    @change-value="
                        requestData.day[index][$event.key] = $event.value
                    "
                ></day-and-discount>
            </div>

            <dailyRentalButton
                :isValid="isValid"
                pathName="step4"
                next="next"
                ref="rentBtn"
            ></dailyRentalButton>
        </div>
    </Form>
</template>
<style>
@media (max-width: 480px) {
    .day {
        background-color: #eff1f5;
        padding: 10px;
    }
}
</style>
