<script setup>
import { useI18n } from "vue-i18n";
import FormInput from "@/components/form-components/FormInput.vue";
import FormSelect from "@/components/form-components/FormSelect.vue";
import { ref, onMounted } from "vue";
import { useAdInfoStore } from "../../pages/ad-info/store";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import { object } from "yup";
import { Form } from "vee-validate";
import { vMaska } from "maska";
import { useValidator } from "../../../../utils/validators";
import { useEstateDetails } from "../../pages/estate-details/store";
const route = useRoute();
const estateDetailsStore = useEstateDetails();
const { isRequired, isNumber } = useValidator();
const store = useAdInfoStore();
const { updateData, data, flag, section, filterData, kinds } =
    storeToRefs(store);
const schema = object().shape({
    price: isRequired,
});
const { t } = useI18n();
var range = ref(0);

onMounted(() => {
    store.getKinds();
    store.getSection();
    estateDetailsStore
        .getRealEstateById(route.params.realEstateId)
        .then((e) => {
            data.value = e.data[0];
            updateData.value = {
                age: data.value.age,
                price: data.value.price,
                location_text: "any",
                lat: data.value.lat,
                lang: data.value.lang,
                ads: data.value.new_ads.map((e) => e.name),
                services: data.value.services.map((e) => e.name),
            };
            filterData.value = store.filtersOnSection(
                e.data[0].real_estate_section
            );
            getIdFromObject(
                section.value,
                data.value.real_estate_section,
                "real_estate_section_id"
            );
            getIdFromObject(
                kinds.value,
                data.value.real_estate_kind,
                "real_estate_kind_id"
            );
        });
});
function getIdFromObject(array, name, key) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].name == name) {
            selected.value = array[i].id;
            updateData.value[key] = array[i].id;
        }
    }
}
const selected = ref(null);
</script>
<template>
    <div class="xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
        <h2
            class="flex justify-center text-secondary my-16 font-simibold font-semibold"
        >
            {{ t("basicRealEstateInformation") }}
        </h2>
        <div
            class="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 grid-cols-3 lg:gap-16 md:gap-16 xs:gap-10 sm:gap-12 justify-center items-center"
        >
            <div
                class="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-6 lg:grid-cols-6 justify-center items-center"
            >
                <label class="col-span-2 text-secondary" for="selectSection"
                    >{{ t("chooseTheRealEstateSection") }} :
                </label>
                <FormSelect
                    :class="
                        route.path.split('/')[1] == 'dashboard'
                            ? 'col-span-3'
                            : 'col-span-2'
                    "
                    name="selectSection"
                    :options="section"
                    :getOptionLabel="(x) => x.name"
                    @option:selected="
                        filterData = store.filtersOnSection($event.name)
                    "
                    :value="updateData.real_estate_section_id"
                    :reduce="(x) => x.id"
                    v-model="updateData.real_estate_section_id"
                />
            </div>
            <div
                class="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-6 lg:grid-cols-6 justify-center items-center"
            >
                <label class="col-span-2 text-secondary">
                    {{ t("typeOfProperty") }} :</label
                >
                <FormSelect
                    :class="
                        route.path.split('/')[1] == 'dashboard'
                            ? 'col-span-3'
                            : 'col-span-2'
                    "
                    :value="updateData.real_estate_kind_id"
                    type="text"
                    name="kinds"
                    :options="kinds"
                    :getOptionLabel="(x) => x.name"
                    :reduce="(x) => x.id"
                    v-model="updateData.real_estate_kind_id"
                />
            </div>
            <div
                class="grid sm:grid-cols-1 lg:grid-cols-6 md:grid-cols-6 justify-center items-center"
            >
                <label class="col-span-2 text-secondary" for="price"
                    >{{ t("price") }}
                    <sub>( {{ t("SR") }} )</sub>
                    :
                </label>
                <FormInput
                    :class="
                        route.path.split('/')[1] == 'dashboard'
                            ? 'col-span-3'
                            : 'col-span-2'
                    "
                    :value="data.price"
                    type="text"
                    name="price"
                    v-maska
                    data-maska="################"
                    v-model.number="updateData.price"
                />
            </div>
            <div class="grid grid-cols-6 justify-center items-center">
                <label class="col-span-2 text-secondary" for="range"
                    >{{ t("theAgeOfTheProperty") }} :
                </label>
                <div
                    :class="
                        route.path.split('/')[1] == 'dashboard'
                            ? 'col-span-3'
                            : 'col-span-2'
                    "
                >
                    <input
                        class=""
                        type="range"
                        id="range"
                        name="range"
                        min="0"
                        max="50"
                        :value="updateData.age || data.age"
                        @input="updateData.age = $event.target.value"
                    />
                    <div class="flex justify-between">
                        <p>50</p>
                        <p>{{ updateData.age || data.age }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.select-input[data-v-0c751e7b],
.text-input[data-v-0a3f9933] {
    margin-bottom: 0px;
}

input[type="range"] {
    direction: ltr;
    height: 28px;
    -webkit-appearance: none;
    margin: 10px 0;
    width: 100%;
}

input[type="range"]:focus {
    outline: none;
}

input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    animate: 0.2s;
    background: #444444;
    border-radius: 0px;
}

input[type="range"]::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #fbb52e;
    border: 1px solid #fbb52e;
    height: 20px;
    width: 20px;
    border-radius: 50px;
    background: #fbb52e;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -9px;
}

input[type="range"]:focus::-webkit-slider-runnable-track {
    background: #444444;
}

input[type="range"]::-moz-range-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    animate: 0.2s;
    background: #444444;
    border-radius: 0px;
}

input[type="range"]::-moz-range-thumb {
    box-shadow: 1px 1px 1px #fbb52e;
    border: 1px solid #fbb52e;
    height: 20px;
    width: 20px;
    border-radius: 50px;
    background: #fbb52e;
    cursor: pointer;
}

input[type="range"]::-ms-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
}

input[type="range"]::-ms-fill-lower {
    background-color: var(--primary);
    border-radius: 0px;
}

input[type="range"]::-ms-fill-upper {
    background: #444444;
    border-radius: 0px;
}

input[type="range"]::-ms-thumb {
    margin-top: 1px;
    box-shadow: 1px 1px 1px #fbb52e;
    border: 1px solid #fbb52e;
    height: 20px;
    width: 20px;
    border-radius: 50px;
    background: #fbb52e;
    cursor: pointer;
}

input[type="range"]:focus::-ms-fill-lower {
    background-color: var(--primary);
}

input[type="range"]:focus::-ms-fill-upper {
    background: #444444;
}
</style>
