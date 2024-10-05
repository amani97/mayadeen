<script setup>
import { useI18n } from "vue-i18n";
import FormCheckbox from "@/components/form-components/FormCheckbox.vue";
import FormInput from "@/components/form-components/FormInput.vue";
import FormSelect from "@/components/form-components/FormSelect.vue";
import FormRange from "@/components/form-components/FormRange.vue";
import { reactive, ref, onMounted } from "vue";
import { useAdInfoStore } from "../../pages/ad-info/store";
import { storeToRefs } from "pinia";
import { useField } from "vee-validate";
import "vue-select/dist/vue-select.css";
import { vMaska } from "maska";

const itemsFilter = reactive([]);
const store = useAdInfoStore();

const { data, flag, kinds, filterData } = storeToRefs(store);

const {
    value: inputValue,
    errorMessage: errorMessage1,
    handleBlur,
    handleChange,
    meta,
} = useField("advertise", undefined, {
    initialValue: data.value.advertise,
});
const {
    value: inputValue2,
    errorMessage: errorMessage2,
    handleBlur: handleBlur2,
    handleChange: handleChange2,
    meta: meta2,
} = useField("description", undefined, {
    initialValue: data.value.description,
});
const { t } = useI18n();
const emit = defineEmits(["checkedPolicy"]);
var checked = ref(false);
var active = reactive([{ active: true }, { active: false }, { active: false }]);
var ranges = reactive([
    {
        id: 4,
        label: "numberOfFloors",
        min: 0,
        max: 6,
        value: data.numberOfFloors,
        key: "number_of_floors",
    },
    {
        id: 6,
        label: "numberOfRooms",
        min: 0,
        max: 6,
        value: data.num_of_rooms,
        key: "num_of_rooms",
    },
    {
        id: 7,
        label: "numberOfLounges",
        min: 0,
        max: 6,
        value: data.num_of_big_rooms,
        key: "num_of_big_rooms",
    },
    {
        id: 8,
        label: "numberOfWaterCycles",
        min: 0,
        max: 6,
        value: data.num_of_wc,
        key: "num_of_wc",
    },
]);
const extras = [
    "غرفة سائق",
    "غرفة خادمة",
    "حديقة داخلية",
    "حوش خارجي ",
    "تأسيس تكييف",
    "بلكونة علوية",
    "مسبح",
    "تأسيس مصعد",
    "مصعد",
    "غرفة غسيل",
    "غرفة خزين",
    "درج داخلي ",
    "كراج سيارة ",
    "مدخلين ضيوف وعوائل",
];
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

const estateAreaServices = [
    "توفر الشبكة الكهربائية ",
    "توفر شبكة المياه",
    "توفر شبكة الصرف الصحي ",
    "توفر الانترنت ",
    "توفر الهاتف",
    "توفر الخدمات التعليمية",
    "توفر الخدمات الصحية",
];

const floor = [
    { name: "البدروم", id: 0 },
    { name: "الارضي", id: 1 },
    { name: "الأول", id: 2 },
    { name: "الثاني", id: 3 },
    { name: "الثالث", id: 4 },
    { name: "الرابع", id: 5 },
    { name: "الخامس", id: 6 },
    { name: "الخامس", id: 7 },
];
</script>
<template>
    <div class="px-16">
        <h2
            class="flex justify-center text-2xl text-secondary my-16 font-semibold"
        >
            {{ t("propertyDetails") }}
        </h2>
        <div class="grid grid-cols-1 gap-16 mb-72">
            <div
                class="grid xl:grid-cols-4 md:grid-cols-3 items-center"
                v-if="filterData[0] ? filterData[0].value : false"
            >
                <label
                    for="landArea"
                    class="text-xl text-secondary whitespace-nowrap font-semibold"
                >
                    {{ t("landArea") }}
                    <sub>( {{ t("squareMeters") }} ) </sub> :</label
                >
                <FormInput
                    class="col-span-1"
                    type="text"
                    :name="filterData[0].value ? 'landArea' : ''"
                    v-maska
                    data-maska="################"
                    v-model.number="data.space_of_land"
                />
            </div>
            <div
                class="grid xl:grid-cols-4 md:grid-cols-3 items-center"
                v-if="filterData[1] ? filterData[1].value : false"
            >
                <label
                    for="realEstateArea"
                    class="text-xl text-secondary whitespace-nowrap font-semibold"
                >
                    {{ t("realEstateArea") }}
                    <sub>( {{ t("squareMeters") }} ) </sub> :</label
                >
                <FormInput
                    class="col-span-1"
                    type="text"
                    :name="filterData[1].value ? 'realEstateArea' : ''"
                    v-maska
                    data-maska="################"
                    v-model.number="data.space_of_place"
                />
            </div>
            <div
                class="grid xl:grid-cols-4 md:grid-cols-3 items-center"
                v-if="filterData[2] ? filterData[2].value : false"
            >
                <label
                    for="interface"
                    class="text-xl text-secondary whitespace-nowrap font-semibold"
                >
                    {{ t("interface") }} :
                </label>
                <FormSelect
                    class="col-span-1"
                    type="text"
                    :name="filterData[2].value ? 'interface' : ''"
                    :options="theFront"
                    v-model="data.the_front"
                />
            </div>
            <div
                class="grid xl:grid-cols-4 md:grid-cols-3 items-center"
                v-if="filterData[3] ? filterData[3].value : false"
            >
                <label
                    class="text-xl text-secondary whitespace-nowrap font-semibold"
                >
                    {{ t("streetType") }} :
                </label>
                <div class="selectFrom3Option">
                    <p
                        class="residential"
                        @click="
                            active[0].active = true;
                            data.kind_of_street = 'residential';
                            active[1].active = false;
                            active[2].active = false;
                        "
                        :class="active[0].active == true ? 'active' : ''"
                    >
                        {{ t("residential") }}
                    </p>
                    <p
                        class="commercial"
                        @click="
                            active[0].active = false;
                            data.kind_of_street = 'commercial';
                            active[1].active = true;
                            active[2].active = false;
                        "
                        :class="active[1].active == true ? 'active' : ''"
                    >
                        {{ t("commercial") }}
                    </p>
                    <p
                        class="residential-commercial"
                        @click="
                            active[0].active = false;
                            data.kind_of_street = 'residential_commercial';
                            active[1].active = false;
                            active[2].active = true;
                        "
                        :class="active[2].active == true ? 'active' : ''"
                    >
                        {{ t("residentialCommercial") }}
                    </p>
                </div>
            </div>
            <div
                class="grid xl:grid-cols-4 md:grid-cols-3 items-center"
                v-if="filterData[5] ? filterData[5].value : false"
            >
                <label
                    class="text-xl text-secondary whitespace-nowrap font-semibold"
                >
                    {{ t("floorNumber") }} :</label
                >
                <FormSelect
                    class="col-span-1"
                    type="text"
                    :name="filterData[5].value ? 'floor' : ''"
                    :options="floor"
                    :getOptionLabel="(x) => x.name"
                    :reduce="(x) => x.id"
                    v-model="data.floor_number"
                />
            </div>
            <div v-for="(range, i) in ranges" :key="range.key">
                <div
                    class="grid xl:grid-cols-4 md:grid-cols-3 items-center"
                    v-if="
                        filterData[range.id]
                            ? filterData[range.id].value
                            : false
                    "
                >
                    <label
                        :for="range.id"
                        class="text-xl text-secondary whitespace-nowrap font-semibold"
                    >
                        {{ t(range.label) }} :</label
                    >
                    <FormRange
                        :id="range.id"
                        :min="range.min"
                        :max="range.max"
                        v-model.number="range.value"
                        maxValue="6"
                        @change="data[range.key] = range.value"
                    />
                </div>
            </div>
            <div
                class="grid xl:grid-cols-4 md:grid-cols-3 items-center"
                v-if="filterData[9] ? filterData[9].value : false"
            >
                <label
                    for="interface"
                    class="text-xl text-secondary whitespace-nowrap font-semibold"
                >
                    {{ t("extras") }} :
                </label>
                <FormSelect
                    multiple
                    class="col-span-1"
                    type="text"
                    name="extra"
                    :options="extras"
                    v-model="data.ads"
                />
            </div>
            <div class="grid xl:grid-cols-4 md:grid-cols-3 items-center">
                <label
                    for="interface"
                    class="text-xl text-secondary whitespace-nowrap font-semibold"
                >
                    {{ t("estateAreaServices") }} :
                </label>
                <FormSelect
                    multiple
                    class="col-span-1"
                    name="estate_area_services"
                    :options="estateAreaServices"
                    v-model="data.services"
                />
            </div>
            <div class="grid xl:grid-cols-4 md:grid-cols-3">
                <label
                    for="advertise"
                    class="text-xl text-secondary whitespace-nowrap font-semibold"
                >
                    {{ t("realEstateAdvertisement") }} :
                </label>
                <div class="col-span-2 relative textarea-input">
                    <textarea
                        @input="handleChange($event.target.value)"
                        @blur="handleBlur"
                        maxlength="50"
                        class="textarea"
                        name="advertise"
                        v-model="data.advertise"
                        :class="{ 'has-error': !!errorMessage1 }"
                    ></textarea>
                    <small
                        v-show="errorMessage1 || meta.valid"
                        class="help-message"
                        >{{ errorMessage1 }}</small
                    >
                    <p class="text-sm mt-4">
                        {{ t("itCannotExceedCharacters", ["50"]) }}
                    </p>
                </div>
            </div>
            <div class="grid xl:grid-cols-4 md:grid-cols-3">
                <label
                    for="description"
                    class="text-xl text-secondary whitespace-nowrap font-semibold"
                >
                    {{ t("descriptionOfTheProperty") }} :
                </label>
                <div class="col-span-2 relative textarea-input">
                    <textarea
                        maxlength="1000"
                        class="textarea"
                        :class="{
                            'has-error': !!errorMessage2,
                        }"
                        @blur="handleBlur2"
                        @input="handleChange2($event.target.value)"
                        v-model="data.description"
                        name="description"
                    ></textarea>
                    <small
                        v-show="errorMessage2 || meta2.valid"
                        class="help-message"
                        >{{ errorMessage2 }}</small
                    >
                    <p class="text-sm mt-4">
                        {{ t("itCannotExceedCharacters", ["1000"]) }}
                    </p>
                </div>
            </div>
        </div>
        <FormCheckbox
            @change="emit('checkedPolicy', checked)"
            v-model="checked"
            inputClasses=""
            labelClasses="text-xl text-secondary"
            :label="t('confirmInfoPolicyMessage')"
        />
    </div>
</template>
<style scoped>
.textarea {
    width: 100%;
    height: 200px;
    border: 1px solid #70707088;
    border-radius: 6px;
    overflow: auto;
    resize: none;
    padding: 10px;
    outline: none;
}
.help-message {
    position: absolute;
    bottom: calc(0 * 1em);
    left: 0;
    margin: 0;
    font-size: 14px;
}

.textarea-input .has-error {
    background-color: rgb(255, 233, 233);
    color: var(--error);
}
.textarea:focus {
    border: 1px solid var(--primary);
}
.textarea-input .has-error:focus {
    border-color: var(--error);
}

.textarea-input .help-message {
    color: var(--error);
}
.selectFrom3Option {
    @apply grid grid-cols-3 col-span-1 items-center;
    height: 3rem;
    border: 1px solid #70707088;
    border-radius: 6px;
    background-color: white;
}

.selectFrom3Option p {
    @apply text-sm text-secondary flex justify-center items-center w-full h-full;
    transition: all 0.3s;
    border-radius: 6px;
}

.selectFrom3Option p:hover {
    cursor: pointer;
}

.selectFrom3Option .residential {
    border-inline-end: 0.5px solid #70707088;
    border-end-end-radius: 0px;
    border-start-end-radius: 0px;
}

.active {
    color: white !important;
    background-color: var(--primary) !important;
}

.selectFrom3Option .commercial {
    border-inline-start: 0.5px solid #70707088;
    border-radius: 0px;
}
.selectFrom3Option .residential-commercial {
    border-inline-start: 0.5px solid #70707088;
    border-start-start-radius: 0px;
    border-end-start-radius: 0px;
    white-space: nowrap;
}

#myFile {
    cursor: pointer;
    width: 100%;
    height: 100%;
    border: 1px solid red;
    position: absolute;
    inset-block-start: 0px;
    inset-inline-start: 0px;
    opacity: 0;
}

.select-input[data-v-0c751e7b],
.text-input[data-v-0a3f9933] {
    margin-bottom: 0px;
}

input[data-v-0a3f9933] {
    margin-top: 0px;
}
</style>
