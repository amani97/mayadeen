<script setup>
import Button from "@/components/general-components/Button.vue";
import { useI18n } from "vue-i18n";
import { Icon } from "@iconify/vue";
import FormSelect from "@/components/form-components/FormSelect.vue";
import { reactive, ref, onMounted, computed } from "vue";
import ADCard from "../components/ADCard.vue";
import EditSelectModal from "../components/EditSelectModal.vue";
import AddADSModal from "../components/AddADSModal.vue";
import EditLogo from "../components/EditLogo.vue";
import { useRouter } from "vue-router";
import { useControlPanelHome } from "./store";
import { storeToRefs } from "pinia";
import Loading from "@/components/general-components/Loading.vue";
const store = useControlPanelHome();
const { streets, cities, loading } = storeToRefs(store);
const citiesSelect = computed({
    get() {
        return cities;
    },
});
const streetsSelect = computed({
    get() {
        return streets;
    },
});
const router = useRouter();
const { t } = useI18n();
const select = reactive([
    { text: "listOfCities", options: citiesSelect.value },
    { text: "neighborhoodList", options: streetsSelect.value },
    { text: "listOfPlugins", options: [] },
]);
onMounted(() => {
    store.GetCities();
    store.GetStreets();
});
const editLogo = ref(false);
const addModal = ref(false);
const addADModal = ref(false);
const addedLogo = ref("");
const addData = ref({
    header: "",
    data: [],
});
const websiteDetails = ref(
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore ea harum laborum quibusdam quasi temporibus, culpa exercitationem natus deleniti illo similique maxime nesciunt ipsam eius. Possimus doloribus quisquam sed perspiciatis."
);
const ADS = reactive([]);
</script>
<template>
    <Loading v-if="loading" class="controlpanel-loading" />
    <div
        v-if="editLogo == false"
        class="p-10 w-full pb-0"
        :class="loading ? 'page-loading' : ''"
    >
        <div class="absolute end-10">
            <button @click="editLogo = true" class="edit-button">
                <Icon
                    class="edit-icon"
                    width="23"
                    icon="material-symbols:edit"
                />
            </button>
        </div>

        <div class="flex mb-10">
            <h1 class="text-xl whitespace-nowrap text-secondary font-semibold">
                {{ t("logoAqar") }}
            </h1>
            <div v-if="addedLogo == ''" class="flex w-full justify-center">
                <h1 class="text-xl text-primary font-semibold">LOGO</h1>
            </div>
            <div v-else class="flex w-full justify-center">
                <img class="logoImage" :src="addedLogo" c alt="Logo" />
            </div>
        </div>
        <div class="flex flex-col gap-10 mb-10">
            <h1 class="text-xl text-secondary font-semibold">
                {{ t("aqarView") }}
            </h1>
            <p class="text-xl text-secondary font-semibold max-w-4xl leading-9">
                {{ websiteDetails }}
            </p>
        </div>
        <div class="flex justify-between">
            <h1 class="text-xl text-secondary font-semibold">
                {{ t("adAdded") }}
            </h1>
            <button class="edit-button" @click="addADModal = true">
                <Icon class="edit-icon" width="23" icon="fa6-solid:plus" />
            </button>
        </div>
        <div class="card-container">
            <template v-for="i in ADS">
                <ADCard
                    @click="router.push('AD/1')"
                    class="card"
                    :text="i.text"
                    :image="i.image"
                    :header="i.header"
                />
            </template>
        </div>
        <div
            class="grid grid-cols-3 items-center my-10"
            v-for="(item, index) in select"
            :key="index"
        >
            <h1 class="text-xl text-secondary font-semibold">
                {{ t(item.text) }} :
            </h1>
            <FormSelect
                name="selectSection"
                :options="item.options"
                :getOptionLabel="(x) => x.name"
            />

            <div class="flex justify-end">
                <button
                    @click="
                        addData.data = item.options;
                        addData.header = item.text;
                        addModal = true;
                    "
                    class="edit-button"
                >
                    <Icon class="edit-icon" width="23" icon="fa6-solid:plus" />
                </button>
            </div>
        </div>
        <EditSelectModal
            :addData="addData"
            :addModal="addModal"
            @close-modal="addModal = false"
        />
        <AddADSModal
            :addADModal="addADModal"
            @close-modal="addADModal = false"
            @saveData="
                (e) => {
                    ADS = e;
                }
            "
        />
    </div>
    <div v-else>
        <EditLogo
            @return="editLogo = false"
            :websiteDetails="websiteDetails"
            :addedLogo="addedLogo"
            @addLogo="addedLogo = $event"
            @edited="
                websiteDetails =
                    $event.details == '' ? websiteDetails : $event.details;
                addedLogo = $event.logo == '' ? addedLogo : $event.logo;
                editLogo = false;
            "
        />
    </div>
</template>

<style scoped>
.logoImage {
    width: 300px;
    height: 150px;
    border-radius: 6px;
}

.card-container {
    max-height: 400px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 80%;
    margin: 0px auto;
}
.card {
    cursor: pointer;
}
.edit-button {
    background-color: var(--primary);
    padding: 12px 20px;
    border-radius: 8px;
}

.edit-icon {
    color: white;
}

.select-input[data-v-0c751e7b] {
    margin-bottom: 0px !important;
}
</style>
<style>
input[data-v-0a3f9933] {
    margin-top: 0px !important;
}

.text-input[data-v-0a3f9933] {
    margin-bottom: 0px;
}
</style>
