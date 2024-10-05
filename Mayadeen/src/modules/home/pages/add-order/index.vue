<script setup>
import { useI18n } from "vue-i18n";
import FormSelect from "@/components/form-components/FormSelect.vue";
import FormInput from "@/components/form-components/FormInput.vue";
import Button from "@/components/general-components/Button.vue";
import Counter from "@/components/form-components/Counter.vue";
import { vMaska } from "maska";
import { useRouter } from "vue-router";
import { onMounted, reactive, computed } from "vue";
import { useOrdersStore } from "./store";
import { useAdInfoStore } from "../ad-info/store";
import { storeToRefs } from "pinia";
import Loading from "@/components/general-components/Loading.vue";
import LoaderButton from "@/components/general-components/LoaderButton.vue";

import { ref } from "vue";
const router = useRouter();
const store = useOrdersStore();
const adInfoStore = useAdInfoStore();

onMounted(() => {
    adInfoStore.getSection();
    adInfoStore.getKinds();
    adInfoStore.getCities();
});
const { loading } = storeToRefs(store);
const { section, kinds, cities } = storeToRefs(adInfoStore);
const { t } = useI18n();

const selectBoxItem = reactive([
    {
        label: "realEstateDepartment",
        option: section,
    },
    {
        label: "theTypeOfProperty",
        option: kinds,
    },
    {
        label: "city",
        option: cities,
    },
]);

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
const labelInput = reactive([
    // { label: "price", isShow: true }, //0
    { label: "theAgeOfTheProperty", isShow: true }, //1 => 0
    { label: "landArea", isShow: true }, //2  => 1
    // { label: "propertyArea", isShow: true }, //3
    { label: "NumberOfTurns", isShow: true }, //4  => 2
    { label: "floorNumber", isShow: true }, //5 => 3
]);
const counter = reactive([
    { name: "numberOfRooms", isShow: true },
    { name: "numberOfLounges", isShow: true },
    { name: "numberOfWc", isShow: true },
]);
const inputsFromTo = reactive([
    {
        label: "price",
        minKey: "min_price",
        maxKey: "max_price",
        isShow: true,
    },
    {
        label: "propertyArea",
        minKey: "min_propertyArea",
        maxKey: "max_propertyArea",
        isShow: true,
    },
]);
var active = reactive([{ active: false }, { active: false }, { isShow: true }]);

const selectedOption = computed(() => {
    if (active[0].active === true && active[1].active === false) {
        return "سكني";
    } else if (active[1].active === true && active[0].active === false) {
        return "تجاري";
    } else {
        // Handle the default case here if needed
        return "";
    }
});
const originalData = {
    min_price: null,
    max_price: null,
    theAgeOfTheProperty: null,
    landArea: null,
    max_propertyArea: null,
    min_propertyArea: null,
    interface: "",
    streetType: selectedOption,
    NumberOfTurns: null,
    floorNumber: null,
    numberOfRooms: null,
    theTypeOfProperty: null,
    realEstateDepartment: null,
    city: null,
    numberOfLounges: null,
    numberOfWc: null,
};

let isShowCounter = ref(true);
let isShowInterface = ref(true);

function checkToShow(id) {
    // console.log(id);
    for (let i = 0; i < labelInput.length; i++) {
        labelInput[i].isShow = true;
    }
    for (let i = 0; i < inputsFromTo.length; i++) {
        inputsFromTo[i].isShow = true;
    }
    for (let i = 0; i < counter.length; i++) {
        counter[i].isShow = true;
    }
    isShowCounter.value = true;
    isShowInterface.value = true;
    active[2].isShow = true;
    if (id === 1 || id === 4) {
        labelInput[3].isShow = false;
    }
    if (id === 2 || id === 3) {
        labelInput[1].isShow = false;
    }
    if (id === 5 || id === 6) {
        inputsFromTo[1].isShow = false;
        labelInput[3].isShow = false;
        isShowCounter.value = false;
    }
    if (id === 7) {
        inputsFromTo[1].isShow = false;
        labelInput[2].isShow = false;
        labelInput[3].isShow = false;
        isShowCounter.value = false;
    }
    if (id === 8) {
        labelInput[1].isShow = false;
        isShowInterface.value = false;
        active[2].isShow = false;
        labelInput[2].isShow = false;
    }
    if (id === 9) {
        labelInput[1].isShow = false;
        isShowInterface.value = false;
        active[2].isShow = false;
        labelInput[2].isShow = false;
        labelInput[3].isShow = false;
        counter[0].isShow = false;
        counter[1].isShow = false;
    }
    if (id === 10) {
        inputsFromTo[1].isShow = false;
        isShowInterface.value = false;
        active[2].isShow = false;
        labelInput[2].isShow = false;
        labelInput[3].isShow = false;
        isShowCounter.value = false;
    }
    if (id === 11) {
        isShowInterface.value = false;
        active[2].isShow = false;
        labelInput[2].isShow = false;
        labelInput[3].isShow = false;
        isShowCounter.value = false;
    }
    if (
        id === 12 ||
        id === 13 ||
        id === 14 ||
        id === 15 ||
        id === 16 ||
        id === 17
    ) {
        labelInput[1].isShow = false;
        isShowInterface.value = false;
        active[2].isShow = false;
        labelInput[2].isShow = false;
        labelInput[3].isShow = false;
        isShowCounter.value = false;
    }
}

function onCounterUpdate(name, value) {
    MyorderData[name] = value;
}

function onOptionsUpdate(name, value) {
    console.log(name, value);
    if (name === "realEstateDepartment") {
        MyorderData = reactive({ ...originalData });
        MyorderData[name] = value.id;
        checkToShow(value.id);
    } else {
        MyorderData[name] = value.id;
    }
}

let MyorderData = reactive({
    ...originalData,
});

function addToOrderDataArray() {
    const toSend = {
        min_price: Number(MyorderData.min_price),
        max_price: Number(MyorderData.max_price),
        age: Number(MyorderData.theAgeOfTheProperty),
        min_space_of_place: Number(MyorderData.min_propertyArea),
        max_space_of_place: Number(MyorderData.max_propertyArea),
        the_front: MyorderData.interface,
        kind_of_street: MyorderData.streetType,
        number_of_floors: Number(MyorderData.NumberOfTurns),
        floor_number: Number(MyorderData.floorNumber),
        num_of_rooms: Number(MyorderData.numberOfRooms),
        real_estate_kind_id: Number(MyorderData.realEstateDepartment),
        real_estate_section_id: Number(MyorderData.theTypeOfProperty),
        city_id: Number(MyorderData.city),
        num_of_big_rooms: Number(MyorderData.numberOfLounges),
        num_of_wc: Number(MyorderData.numberOfWc),
        space_of_land: Number(MyorderData.landArea),
    };
    store.addOrder(toSend).then(() => {
        setTimeout(() => {
            if (store.SimilarOrders.message == "done") {
                router.push({ name: "similar-orders" });
            }
            orderDataArray = reactive([]);
            //router.push({ name : 'similar-orders'});
        }, 3000);
    });
}

//const inputLine = [{ label: "price" }, { label: "theAgeOfTheProperty" }];
</script>
<template>
    <Loading v-if="adInfoStore.loading" />
    <div
        class="px-12 background-image"
        :class="store.loading ? 'page-loading' : ''"
    >
        <div class="pt-10 px-24">
            <Teleport to="#header-action">
                <Button class="px-8 py-[8px]" @click="router.go(-1)">{{
                    t("HomePage")
                }}</Button>
            </Teleport>
            <div class="flex justify-center items-center m-10">
                <div class="background-color-gray rounded-md w-96 h-48"></div>
            </div>

            <div
                v-for="(item, index) in selectBoxItem"
                :key="item.id"
                class="grid lg:grid-cols-4 gap-2 items-center md:grid-col-3 grid-col-2"
            >
                <label :for="index" class="lg:text-xl md:text-lg text-base">
                    {{ t(item.label) }} :</label
                >
                <FormSelect
                    class="mb-4"
                    :options="item.option"
                    :name="index"
                    :getOptionLabel="(x) => x.name"
                    @update:modelValue="onOptionsUpdate(item.label, $event)"
                />
            </div>
            <div v-for="(i, index) in inputsFromTo" :key="index">
                <div class="grid grid-cols-8 items-center" v-if="i.isShow">
                    <label class="text-xl" for="">{{ t(i.label) }} :</label>
                    <label class="text-xl text-center" for="">{{
                        t("from")
                    }}</label>
                    <FormInput
                        class="text-xl col-span-2"
                        type="text"
                        :name="String(i.minKey + index)"
                        v-model.number="MyorderData[i.minKey]"
                        v-maska
                        data-maska="##########"
                    />
                    <label class="text-xl text-center" for="">{{
                        t("to")
                    }}</label>
                    <FormInput
                        v-model.number="MyorderData[i.maxKey]"
                        :name="String(i.maxKey + index)"
                        class="text-xl col-span-2"
                        type="text"
                        v-maska
                        data-maska="##########"
                    />
                </div>
            </div>
            <div>
                <div
                    class="grid lg:grid-cols-4 items-center md:grid-col-3 grid-col-2"
                    v-for="(item, index) in labelInput"
                    :key="index"
                >
                    <label
                        v-if="item.isShow"
                        class="lg:text-xl md:text-lg text-base"
                        >{{ t(item.label) }} :</label
                    >
                    <!-- <form-input class="" v-if="item.label==='price'||item.label==='propertyArea'">sdklfj</form-input> -->
                    <FormInput
                        v-if="item.isShow"
                        class="mb-4"
                        :type="item.label"
                        :name="item.label"
                        v-model="MyorderData[item.label]"
                        v-maska
                        data-maska="##########"
                    />
                </div>

                <div
                    class="grid lg:grid-cols-4 items-center md:grid-col-3 grid-col-2"
                >
                    <div>{{ t("interface") }} :</div>
                    <FormSelect
                        name="theFront"
                        class="mb-4"
                        :options="theFront"
                        v-model="MyorderData.interface"
                    />
                </div>

                <div
                    v-if="active[2].isShow"
                    class="grid lg:grid-cols-4 items-center md:grid-col-3 grid-col-2 mb-10"
                >
                    <div class="lg:text-xl md:text-lg text-base mb-4">
                        {{ t("streetType") }} :
                    </div>
                    <div class="selectFrom2Option">
                        <p
                            class="residential"
                            @click="
                                active[0].active = true;
                                active[1].active = false;
                                console.log('residential');
                            "
                            :class="active[0].active == true ? 'active' : ''"
                        >
                            {{ t("residential") }}
                        </p>
                        <p
                            class="commercial"
                            @click="
                                active[0].active = false;
                                active[1].active = true;
                                console.log('commercial');
                            "
                            :class="active[1].active == true ? 'active' : ''"
                        >
                            {{ t("commercial") }}
                        </p>
                    </div>
                </div>

                <div v-if="isShowCounter" class="">
                    <div
                        class="counter grid lg:grid-cols-3 md:grid-cols-2 grid-col-2 gap-10 mb-10"
                        v-for="counterr in counter"
                        :key="counterr.id"
                    >
                        <p
                            class="lg:text-xl md:text-lg text-base"
                            v-if="counterr.isShow"
                        >
                            {{ t(counterr.name) }} :
                        </p>
                        <Counter
                            class=""
                            @updateNumber="
                                onCounterUpdate(counterr.name, $event)
                            "
                            v-if="counterr.isShow"
                        />
                    </div>
                </div>

                <div class="flex justify-start py-5">
                    <LoaderButton
                        @click="addToOrderDataArray"
                        color="primary"
                        class="font-bold"
                        :loading="loading"
                    >
                        {{ t("addOrder") }}
                    </LoaderButton>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.text-input[data-v-0a3f9933] {
    margin-bottom: 0px;
}

.select-input[data-v-0c751e7b] {
    margin-bottom: 0px;
}

input {
    width: 15rem;
    height: 2.8rem;
    border: 3px solid rgba(156, 156, 156, 0.329);
    border-radius: 4px;
}

.width-input-line {
    width: 1000px;
}

.label-input {
    gap: 280px;
}

.background-color-gray {
    background-color: #adadad;
}

.selectFrom2Option {
    @apply grid grid-cols-2 col-span-1 items-center;
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

@media (max-width: 640px) {
    .selectFrom2Option p {
        @apply text-sm text-secondary flex justify-center items-center w-full h-full;
        transition: all 0.3s;
        border-radius: 6px;
    }
}
@media (max-width: 640px) and (max-width: 1024px) {
    .selectFrom2Option p {
        @apply text-lg text-secondary flex justify-center items-center w-full h-full;
        transition: all 0.3s;
        border-radius: 6px;
    }
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
