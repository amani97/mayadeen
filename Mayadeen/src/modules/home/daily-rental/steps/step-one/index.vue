<script setup>
import AddAd from "@/components/general-components/AddAd.vue";
import Button from "@/components/general-components/Button.vue";
import NummerOfStep from "@/components/general-components/StepNumber.vue";
import FormInput from "@/components/form-components/FormInput.vue";
import CatigoriesButton from "@/components/general-components/CatigoriesButton.vue";
import { useI18n } from "vue-i18n";
import { useDailyRentalStore } from "../../daily-rental-store";
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";
import { object } from "yup";
import { Form } from "vee-validate";
import { vMaska } from "maska";
import { useValidator } from "../../../../../utils/validators";
const { isRequired, isNumber } = useValidator();
const schema = object().shape({
    Name: isRequired,
});
const store = useDailyRentalStore();
const { requestData } = storeToRefs(store);
const router = useRouter(),
    route = useRoute();
const { t } = useI18n();

var catigories = reactive([
    {
        id: 1,
        catigory: "breaks",
        isClicked: false,
        value: "الاستراحات",
    },
    {
        id: 2,
        catigory: "chalets",
        isClicked: false,

        value: "الشاليهات",
    },
    {
        id: 3,
        catigory: "furnishedApartments",
        isClicked: false,

        value: "الشقق المفروشة",
    },
    {
        id: 4,
        catigory: "furnishedRooms",
        isClicked: false,

        value: "الغرف المفروشة",
    },
    {
        id: 5,
        catigory: "farms",
        isClicked: false,

        value: "المزارع",
    },
    {
        id: 6,
        catigory: "weddingHalls",
        isClicked: false,
        value: "صالات الافراح",
    },
]);

function clicked(id) {
    for (let i = 0; i < catigories.length; i++) {
        if (catigories[i].id == id) {
            catigories[i].isClicked = true;
            console.log(id);
        } else {
            catigories[i].isClicked = false;
        }
    }
}
</script>

<template>
    <div class="">
        <Teleport to="#header-action">
            <Button class="px-8 py-[8px]" @click="router.go(-1)">{{
                t("return")
            }}</Button>
        </Teleport>
        <Form
            @submit="router.push('/daily-rental/add-estate/step2')"
            v-model:validation-schema="schema"
            class="pb-10 background-image"
        >
            <div class="px-8">
                <AddAd />
            </div>
            <div class="steps text-center mb-8">
                <div
                    class="xs:text-sm mb-7 sm:text-base sm:mb-13 md:text-lg md:mb-15 lg:text-xl lg:mb-16 xl:text-2xl xl:mb-20"
                >
                    {{ t("Basic estate information") }}
                </div>
                <NummerOfStep :numberOfStep="7"></NummerOfStep>
            </div>
            <div
                class="grid xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl px-10 name-estate md:grid-cols-1 lg:grid-cols-3 xl:grid-cols-3 items-center text-xl md:mb-10 mb-2"
            >
                <div>
                    {{
                        t(
                            "The name of your property as it will appear to the customer"
                        )
                    }}
                    :
                </div>
                <div>
                    <FormInput
                        name="Name"
                        v-model="requestData.name"
                        :value="requestData.name"
                        class="text-xl"
                        type="text"
                    />
                </div>
            </div>
            <div
                class="catigories px-20 text-xl w-full mb-10 xs:text-sm sm:text-base lg:text-lg"
            >
                <div class="xs:mb-10">
                    {{ t("Choose the property classification") }} :
                </div>
                <div
                    class="btnC flex justify-between grid xl:grid-cols-5 gap-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1"
                >
                    <catigories-button
                        v-for="cat in catigories"
                        :isClicked="cat.isClicked"
                        :key="cat.id"
                        @click="
                            clicked(cat.id);
                            requestData.kind = cat.value;
                        "
                        >{{ t(cat.catigory) }}</catigories-button
                    >
                </div>
            </div>
            <div class="next w-full flex justify-center items-center">
                <Button
                    :disabled="requestData.kind ? false : true"
                    isArrow
                    color="primary"
                    type="submit"
                    class=""
                    >{{ t("next") }}</Button
                >
            </div>
        </Form>
    </div>
</template>
<style>
.containe {
}
</style>
