<script setup>
import FormInput from "@/components/form-components/FormInput.vue";
import FormSelect from "@/components/form-components/FormSelect.vue";
import FormDate from "@/components/form-components/FormDate.vue";
import EstateCardDailyRental from "@/components/general-components/EstateCardDailyRental.vue";
import { useI18n } from "vue-i18n";
import { useDailyRentalStore } from "../daily-rental-store";
import { onMounted, reactive, watch } from "vue";
import { storeToRefs } from "pinia";
import SearchField from "../../../../components/general-components/SearchField.vue";
import Loading from "@/components/general-components/Loading.vue";

const { t } = useI18n();
const params = reactive({
    text: "",
});

watch(
    params,
    (val) => {
        store.getRentalsList(val);
    },
    { deep: true }
);
const store = useDailyRentalStore();
const { rentalsList, loading } = storeToRefs(store);
onMounted(() => {
    store.getRentalsList();
});
</script>

<template>
    <Loading v-if="loading" />
    <div
        :class="{ 'page-loading': loading }"
        class="px-10 background-image py-10"
    >
        <div class="grid grid-cols-4 items-center mb-6">
            <label for="typeOfProperty" class="text-xl whitespace-nowrap">
                {{ t("typeOfDailyRent") }}
                :</label
            >
            <FormSelect class="col-span-1" type="text" name="typeOfProperty" />
        </div>
        <div class="grid grid-cols-4 items-center">
            <label for="typeOfProperty" class="text-xl whitespace-nowrap">
                {{ t("location") }}
                :</label
            >
            <SearchField
                @search="params.text = $event"
                class="col-span-1"
                name="typeOfProperty"
            />
        </div>
        <div class="grid grid-cols-4 items-center">
            <label for="typeOfProperty" class="text-xl whitespace-nowrap">
                {{ t("theAveragePriceDependsOnTheNumberOfDaysOfBooking") }}

                :</label
            >
            <FormInput class="col-span-1" type="text" name="typeOfProperty" />
        </div>
        <div class="grid grid-cols-10 items-center py-10">
            <label for="text" class="text-xl">{{ t("date") }} :</label>
            <label for="text " class="text-xl text-center"
                >{{ t("from") }} :</label
            >
            <FormDate class="flex justify-center h-full" />
            <label for="text " class="text-xl text-center"
                >{{ t("to") }} :</label
            >
            <FormDate class="flex justify-center h-full" />
        </div>
        <p class="underline text-xl my-10 text-secondary">
            {{ t("searchResult") }}
        </p>
        <div class="pb-10 px-24" v-for="item in rentalsList">
            <EstateCardDailyRental
                :image="item.image"
                :price="item.avg_price?.toFixed()"
                :space="item.space"
                :type="item.rent_kind"
                :location="item.location_text"
                :pricePer="item.pricePer"
                :date="item.created_at"
            />
        </div>
        <div
            class="w-100 text-center text-secondary"
            v-if="rentalsList.length === 0"
        >
            {{ t("noRentsMessage") }}
        </div>
    </div>
</template>
<style>
.select-input[data-v-0c751e7b],
.text-input[data-v-0a3f9933] {
    margin-bottom: 0px;
}
.input[data-v-0a3f9933] {
    margin-top: 0px;
}
</style>
