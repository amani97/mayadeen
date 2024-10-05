<script setup>
import Map from "@/components/general-components/map.vue";
import Loading from "@/components/general-components/Loading.vue";
import { useI18n } from "vue-i18n";
import { ref, onMounted } from "vue";
import { Icon } from "@iconify/vue";
import FormInput from "@/components/form-components/FormInput.vue";
import FormDate from "@/components/form-components/FormDate.vue";
import { useRealEstateStore } from "../../pages/realEstateStore";
import { storeToRefs } from "pinia";
const store = useRealEstateStore();
const { activeFilter, loading } = storeToRefs(store);
const { t } = useI18n();
const textToFilter = [
    { name: "all", filterKey: null },
    { name: "breaks", filterKey: "الاستراحات" },
    { name: "chalets", filterKey: "الشاليهات" },
    { name: "furnishedApartments", filterKey: "الشقق المفروشة" },
    { name: "furnishedRooms", filterKey: "الغرف المفروشة" },
    { name: "farms", filterKey: "المزارع" },
    { name: "weddingHalls", filterKey: "صالات الافراح" },
];
function filterRent(item, index) {
    activeFilterStyle.value = index;
    activeFilter.value = item.filterKey;
    if (activeFilter.value == null) {
        console.log("if");
        store.getRentRealEstate();
    } else {
        console.log("else");
        store.getRentRealEstateWithFilter();
    }
}
onMounted(() => {
    activeFilter.value = null;
});
const activeFilterStyle = ref(0);
</script>
<template>
    <Loading v-if="loading" />
    <div
        class="w-full landing-page-container"
        :class="loading ? 'page-loading' : ''"
    >
        <div class="bg-accent flex items-center text-xl gap-10 py-4 px-10">
            <p
                @click="filterRent(item, index)"
                v-for="(item, index) in textToFilter"
                :key="index"
                class="filter"
                :class="activeFilterStyle == index ? 'activeFilter' : ''"
            >
                {{ t(item.name) }}
            </p>
        </div>
        <div class="px-10">
            <div class="grid grid-cols-4 items-center">
                <label for="text" class="text-xl"
                    >{{
                        t("theAveragePriceDependsOnTheNumberOfDaysOfBooking")
                    }}
                    :</label
                >

                <FormInput type="text" name="text" />
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
        </div>
        <Map @show="" :isDailyRental="true"></Map>
    </div>
</template>
<style scoped>
.filter {
    cursor: pointer;
    transition: all 0.2s;
}
.activeFilter {
    color: var(--primary);
    font-weight: 900;
}
.landing-page-container {
    height: 89vh;
}
</style>
