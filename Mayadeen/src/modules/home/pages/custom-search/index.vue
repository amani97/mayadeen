<script setup>
import { useI18n } from "vue-i18n";
import FormSelect from "@/components/form-components/FormSelect.vue";
import FormInput from "@/components/form-components/FormInput.vue";
import Button from "@/components/general-components/Button.vue";
import { useRoute, useRouter } from "vue-router";
import { useCustomSearchStore } from "./store";
import FormRange from "@/components/form-components/FormRange.vue";
import { storeToRefs } from "pinia";
import { onMounted, reactive } from "vue";
import { useRealEstateStore } from "../realEstateStore";
import Loading from "@/components/general-components/Loading.vue";
import { vMaska } from "maska";
const realEstateStore = useRealEstateStore();
const store = useCustomSearchStore();
onMounted(() => {
    store.getCities();
    store.getKinds();
    store.getSection();
});
const { section, kinds, cities, requestData, filterData, loading } =
    storeToRefs(store);
const { customFilterData } = storeToRefs(realEstateStore);
const route = useRoute(),
    router = useRouter();
const { t } = useI18n();

const theFront = [
    "شمالي",
    "جنوبي",
    "شرقي",
    "غربي",
    "شمالي شرقي",
    "شمالي غربي",
    "جنوبي شرقي",
    "جنوبي غربي",
];
var ranges = reactive([
    {
        id: 4,
        label: "numberOfFloors",
        min: 0,
        max: 6,
        value: requestData.number_of_floors,
        key: "number_of_floors",
    },
    {
        id: 6,
        label: "numberOfRooms",
        min: 0,
        max: 6,
        value: requestData.num_of_rooms,
        key: "num_of_rooms",
    },
    {
        id: 7,
        label: "numberOfLounges",
        min: 0,
        max: 6,
        value: requestData.num_of_big_rooms,
        key: "num_of_big_rooms",
    },
    {
        id: 8,
        label: "numberOfWaterCycles",
        min: 0,
        max: 6,
        value: requestData.num_of_wc,
        key: "num_of_wc",
    },
]);

const floor = [
    { name: "البدروم", id: 1 },
    { name: "الارضي", id: 2 },
    { name: "الأول", id: 3 },
    { name: "الثاني", id: 4 },
    { name: "الثالث", id: 5 },
    { name: "الرابع", id: 6 },
    { name: "الخامس", id: 7 },
    { name: "الخامس", id: 8 },
];
var active = reactive([{ active: false }, { active: false }]);
const labelInput = [
    { label: "landArea", key: "space_of_land", id: 0 },
    { label: "propertyArea", key: "space_of_place", id: 1 },
];
const inputLine = [
    { label: "price", maxKey: "max_price", minKey: "min_price" },
    { label: "theAgeOfTheProperty", maxKey: "max_age", minKey: "min_age" },
];
function getFilterDataList() {
    store.getFilterdDataFromApi().then(() => {
        router.push("/home/custom-search-result");
    });
}
function getFilterDataMap() {
    store.getFilterdDataFromApi().then((data) => {
        console.log(data);
        customFilterData.value = data;
        router.push("/landingPage");
    });
}
</script>
<template>
    <Loading v-if="loading" />
    <div
        class="background-image px-24 py-10"
        :class="loading ? 'page-loading' : ''"
    >
        <Teleport to="#header-action">
            <Button class="px-8 py-[8px]" @click="router.go(-1)">{{
                t("return")
            }}</Button>
        </Teleport>
        <div class="grid grid-cols-4 items-center mb-10">
            <label for="section" class="text-xl">
                {{ t("realEstateDepartment") }} :</label
            >
            <FormSelect
                class=""
                :options="section"
                name="section"
                :getOptionLabel="(x) => x.name"
                :reduce="
                    (x) => {
                        requestData = {};
                        x.id;
                        filterData = store.filtersOnSection(x.name);
                        requestData.real_estate_section_id = x.id;
                    }
                "
            />
        </div>
        <div class="grid grid-cols-4 items-center mb-10">
            <label for="kinds" class="text-xl">
                {{ t("theTypeOfProperty") }} :</label
            >
            <FormSelect
                class=""
                :options="kinds"
                name="kinds"
                :getOptionLabel="(x) => x.name"
                :reduce="
                    (x) => {
                        x.id;

                        requestData.real_estate_kind_id = x.id;
                    }
                "
            />
        </div>
        <div class="grid grid-cols-4 items-center mb-10">
            <label for="cities" class="text-xl"> {{ t("city") }} :</label>
            <FormSelect
                class=""
                :options="cities"
                name="cities"
                :getOptionLabel="(x) => x.name"
                :reduce="
                    (x) => {
                        x.id;
                        requestData.city_id = x.id;
                    }
                "
            />
        </div>
        <div
            class="grid grid-cols-4 items-center mb-10"
            v-if="filterData[2] ? filterData[2].value : true"
        >
            <label for="theFront" class="text-xl">
                {{ t("interface") }} :</label
            >
            <FormSelect
                name="theFront"
                class=""
                :options="theFront"
                v-model="requestData.the_front"
            />
        </div>
        <div
            class="grid grid-cols-4 items-center mb-10"
            v-if="filterData[5] ? filterData[5].value : true"
        >
            <label for="floor_number" class="text-xl">
                {{ t("floorNumber") }} :</label
            >
            <FormSelect
                name="floor_number"
                :options="floor"
                :getOptionLabel="(x) => x.name"
                :reduce="
                    (x) => {
                        x.id;
                        requestData.floor_number = x.id;
                    }
                "
            />
        </div>
        <div
            class="grid grid-cols-4 items-center mb-4"
            v-if="filterData[3] ? filterData[3].value : true"
        >
            <label class="text-xl whitespace-nowrap">
                {{ t("streetType") }} :
            </label>
            <div class="selectFrom2Option">
                <p
                    class="residential"
                    @click="
                        active[0].active = true;
                        requestData.kind_of_street = 'residential';
                        active[1].active = false;
                    "
                    :class="active[0].active == true ? 'active' : ''"
                >
                    {{ t("residential") }}
                </p>
                <p
                    class="commercial"
                    @click="
                        active[0].active = false;
                        requestData.kind_of_street = 'commercial';
                        active[1].active = true;
                    "
                    :class="active[1].active == true ? 'active' : ''"
                >
                    {{ t("commercial") }}
                </p>
            </div>
        </div>
        <div
            class="grid grid-cols-8 items-center"
            v-for="(item, index) in inputLine"
            :key="index"
        >
            <label class="text-xl" for="">{{ t(item.label) }}&nbsp :</label>
            <label class="text-xl text-center" for="">{{ t("from") }}</label>
            <FormInput
                class="text-xl col-span-2"
                type="text"
                :name="String(item.minKey + index)"
                v-model.number="requestData[item.minKey]"
                v-maska
                data-maska="##########"
            />
            <label class="text-xl text-center" for="">{{ t("to") }}</label>
            <FormInput
                :name="String(item.maxKey + index)"
                class="text-xl col-span-2"
                type="text"
                v-model.number="requestData[item.maxKey]"
                v-maska
                data-maska="##########"
            />
        </div>
        <div v-for="item in labelInput">
            <div
                class="grid items-center grid-cols-4"
                v-if="filterData[item.id] ? filterData[item.id].value : true"
            >
                <label class="text-xl" for="">{{ t(item.label) }}&nbsp :</label>
                <FormInput
                    class="text-xl"
                    type="text"
                    :name="item.label"
                    v-model.number="requestData[item.key]"
                    v-maska
                data-maska="##########"
                />
            </div>
        </div>

        <div v-for="range in ranges">
            <div
                class="grid grid-cols-4 items-center"
                v-if="filterData[range.id] ? filterData[range.id].value : true"
            >
                <label for="" class="text-xl whitespace-nowrap font-semibold">
                    {{ t(range.label) }} :</label
                >
                <FormRange
                    :id="range.id"
                    :min="range.min"
                    :max="range.max"
                    v-model.number="range.value"
                    maxValue="6"
                    @change="requestData[range.key] = range.value"
                />
            </div>
        </div>
        <div class="flex justify-center gap-96 pt-20">
            <button
                @click="getFilterDataMap()"
                class="text-accent bg-primary text-xl px-12 py-3 rounded-xl"
            >
                {{ t("mapSearch") }}
            </button>
            <button
                @click="getFilterDataList()"
                class="text-accent bg-primary text-xl px-12 py-3 rounded-xl"
            >
                {{ t("listSearch") }}
            </button>
        </div>
    </div>
</template>
<style>
.width-input-line {
    width: 1000px;
}
.label-input {
    gap: 280px;
}
.text-input[data-v-0a3f9933] {
    margin-top: 0px;
}
.select-input[data-v-0c751e7b] {
    margin-bottom: 0px;
}
.selectFrom2Option {
    @apply grid grid-cols-2  col-span-1 items-center;
    height: 3rem;
    border: 1px solid #70707088;
    border-radius: 6px;
    background-color: white;
}
.selectFrom2Option p {
    @apply text-xl text-secondary flex justify-center items-center w-full h-full;
    transition: all 0.3s;
    border-radius: 6px;
}
.selectFrom2Option p:hover {
    cursor: pointer;
}
.selectFrom2Option .residential {
    border-inline-end: 0.5px solid #70707088;
    border-end-end-radius: 0px;
    border-start-end-radius: 0px;
}
.active {
    color: white !important;
    background-color: var(--primary) !important;
}
.selectFrom2Option .commercial {
    border-inline-start: 0.5px solid #70707088;
    border-start-start-radius: 0px;
    border-end-start-radius: 0px;
}
</style>
