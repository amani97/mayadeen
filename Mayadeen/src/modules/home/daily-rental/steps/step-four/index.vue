<script setup>
import AddAd from "@/components/general-components/AddAd.vue";
import Button from "@/components/general-components/Button.vue";
import NummerOfStep from "@/components/general-components/StepNumber.vue";
import FormInput from "@/components/form-components/FormInput.vue";
import CatigoriesButton from "@/components/general-components/CatigoriesButton.vue";
import { useFacilitiesStore } from "../extra/store.js";
import { useI18n } from "vue-i18n";
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import dailyRentalButton from "../../components/dailyRentalButton.vue";
import { useDailyRentalStore } from "../../daily-rental-store";
import { storeToRefs } from "pinia";
const dailyRentalStore = useDailyRentalStore();
const { requestData, loading } = storeToRefs(dailyRentalStore);
import { object } from "yup";
import { Form } from "vee-validate";
import { vMaska } from "maska";
import { useValidator } from "../../../../../utils/validators";
const { isRequired, isNumber } = useValidator();
const schema = object().shape({
    space: isNumber,
});
const router = useRouter();
const { t } = useI18n();
const store = useFacilitiesStore();
const { routes } = storeToRefs(store);
var catigories = reactive([
    {
        id: 1,
        catigory: "غرفة نوم",
        key: "bed_room",
        isClicked: false,
        data: "bed",
        route: "bedroom",
        dataObject: {
            room_number: 0,
            bed_number: 0,
            master_bed_number: 0,
        },
    },

    {
        key: "living_room",
        id: 2,
        catigory: "مجلس",
        isClicked: false,
        data: "living",
        route: "Mg",
        dataObject: {
            main_room: 0,
            main_room_num: 0,
            extra_room: 0,
            extra_room_num: 0,
            out_room: 0,
            out_room_num: 0,
            out_extra: 0,
            out_extra_num: 0,
        },
    },
    {
        key: "pools",
        id: 3,
        catigory: "مسبح",
        isClicked: false,
        data: "pool",
        route: "pools",
        dataObject: [
            {
                pool_kind: "",
                depth: 0,
                from: 0,
                dimension: 0,
                inner_pool: 0,
                pool_barrier: 0,
                pool_games: 0,
                pool_heat: 0,
                pool_water: 0,
            },
        ],
    },
    {
        key: "kitchen",
        id: 4,
        catigory: "مطبخ",
        isClicked: false,
        data: "kit",
        route: "kitchen",
        dataObject: {
            num_of_chars: 0,
            coffee_machine: 0,
            cooking_plates: 0,
            freezer: 0,
            oven: 0,
            fredg: 0,
            microwave: 0,
            cooker: 0,
        },
    },
    {
        key: "isWc",
        id: 5,
        catigory: "دورات مياه",
        isClicked: false,
        data: "wc",
        route: "WC",
        dataObject: {
            num_of_wc: 0,
            shower: 0,
            jacozy: 0,
            shower_hand: 0,
            shower_dress: 0,
            saona: 0,
            shampoo: 0,
            sliper: 0,
            soap: 0,
            cleanx: 0,
        },
    },
]);
// "bedroom", "Mg", "pools", "kitchen", "WC"
function clicked(id) {
    const category = catigories.find((category) => category.id === id);
    if (category) {
        if (category.isClicked === false) {
            category.isClicked = true;
            routes.value.push(category.route);
        } else {
            category.isClicked = false;
            const index = routes.value.indexOf(category.route);
            if (index > -1) {
                routes.value.splice(index, 1);
            }
        }
    }
}

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
    <Form
        ref="form"
        @submit="onSubmit"
        v-model:validation-schema="schema"
        class="background-image px-10 pb-10"
    >
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
            class="grid md:grid-cols-3 lg:grid-cols-4 xs:grid-cols-1 items-center mt-10"
        >
            <label for="space" class="text-xl text-secondary"
                >{{ t("theAreaOfYourProperty") }} :</label
            >
            <FormInput
                v-maska
                data-maska="################"
                v-model.number="requestData.space"
                :value="requestData.space"
                name="space"
                type="text"
            />
        </div>
        <div
            class="grid md:grid-cols-3 lg:grid-cols-4 xs:grid-cols-1 gap-6 items-center text-secondary xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl my-10"
        >
            <h3 class="font-bold">{{ t("yourBasicFacilities") }}</h3>
            <h3>{{ t("chooseAllTheBasicFacilitiesOfYourProperty") }} :</h3>
        </div>
        <div
            class="btnC flex justify-between grid xl:grid-cols-5 gap-10 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1"
        >
            <CatigoriesButton
                v-for="cat in catigories"
                :isClicked="cat.isClicked"
                :key="cat.id"
                @click="
                    clicked(cat.id);
                    requestData[cat.key] = Number(cat.isClicked);
                    cat.isClicked
                        ? (requestData[cat.data] = cat.dataObject)
                        : delete requestData[cat.data];
                "
                >{{ cat.catigory }}</CatigoriesButton
            >
        </div>
        <div>
            <dailyRentalButton
                ref="rentBtn"
                :pathName="store.getNextRoute"
                :isValid="isValid"
                next="next"
                :disabled="routes.length == 0 ? true : false"
            ></dailyRentalButton>
        </div>
    </Form>
</template>
<style scoped>
/* .CatigoriesButton-container {
    @apply grid grid-cols-4  items-center my-20 gap-10;
    width: 60%;
} */
</style>
