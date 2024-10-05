<script setup>
import FormSelect from "@/components/form-components/FormSelect.vue";
import { ref, watch } from "vue";
import { Icon } from "@iconify/vue";
import EstateCard from "@/components/general-components/EstateCard.vue";
import { useListSearchStore } from "./store.js";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import Loading from "@/components/general-components/Loading.vue";
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";
import SearchField from "../../../../components/general-components/SearchField.vue";
import PaginationRow from "../../../../components/general-components/PaginationRow.vue";
import { saudiCity } from "../../../../utils/utils-functions";
import { useAdInfoStore } from "../ad-info/store";

const { t } = useI18n();
const router = useRouter();
const listSearchStore = useListSearchStore();
const adInfoStore = useAdInfoStore();
const { streets } = storeToRefs(adInfoStore);
// const locationText = ref(null);
const locationFilters = ref({
    street: null,
    city: null,
});

const { data, loading, params, paginationData, isLocalFilter } =
    storeToRefs(listSearchStore);

onMounted(() => {
    adInfoStore.getStreets();
    listSearchStore.getRealEstate({ all: 1 }).then(() => {
        isLocalFilter.value = false;
    });
});

function removeFilter() {
    listSearchStore.getRealEstate({ all: 1 }).then(() => {
        isLocalFilter.value = false;
        params.value = {};
    });
}
function onPaginate(val) {
    if (locationFilters.value.street || locationFilters.value.city)
        listSearchStore
            .getRealEstate({ ...locationFilters.value, page: val })
            .then(() => {
                isLocalFilter.value = true;
            });
    else
        listSearchStore.getRealEstate({ all: 1, page: val }).then(() => {
            isLocalFilter.value = false;
        });
}
watch(isLocalFilter, (val) => {
    if (!val) {
        locationFilters.value.street = null;
        locationFilters.value.city = null;
    }
});

watch(
    locationFilters,
    (val) => {
        if (locationFilters.value.street || locationFilters.value.city) {
            listSearchStore.getRealEstate(val);
            isLocalFilter.value = true;
            params.value = {};
        } else {
            if (Object.keys(params.value).length == 0)
                listSearchStore
                    .getRealEstate({ all: 1, page: val })
                    .then(() => {
                        isLocalFilter.value = false;
                    });
            else {
                listSearchStore
                    .getRealEstate({ ...params.value, page: val })
                    .then(() => {
                        isLocalFilter.value = false;
                    });
            }
        }
    },
    { deep: true }
);
</script>

<template>
    <Loading v-if="loading" />
    <div class="px-12 background-image" :class="loading ? 'page-loading' : ''">
        <section class="container mx-auto">
            <div class="flex py-10 w-full justify-center">
                <div
                    class="w-full lg:w-1/2 xl:w-1/3 flex flex-col lg:flex-row gap-4"
                >
                    <!-- <FormSelect
                    :options="saudiCity"
                    :getOptionLabel="(x) => x.name"
                    :reduce="(x) => x.name"
                    class="col-span-1"
                    name="city"
                    :placeholder="t('city')"
                    v-model="locationFilters.city"
                /> -->

                    <FormSelect
                        :options="streets"
                        class="col-span-1"
                        name="street"
                        :getOptionLabel="(x) => x.name"
                        :reduce="(x) => x.name"
                        :placeholder="t('district')"
                        v-model="locationFilters.street"
                    />
                    <!-- <SearchField
                    class="searchField"
                    @search="locationText = $event"
                    :placeholder="t('location')"
                /> -->
                </div>
            </div>
            <template v-if="data && data.length > 0">
                <div class="pb-10" v-for="item in data">
                    <EstateCard
                        class="card"
                        @click="router.push('/estate-details/' + item.id)"
                        :image="
                            item.real_estate_images
                                ? item.real_estate_images.length > 0
                                    ? item.real_estate_images[0].image
                                    : ''
                                : ''
                        "
                        :price="item.price"
                        :space="item.space_of_place"
                        :management="item.advertise"
                        :description="item.description"
                        :name="item.user ? item.user.user_name : ''"
                        :date="dayjs(item.created_at).fromNow()"
                    />
                </div>
                <PaginationRow
                    @paginate="onPaginate"
                    class="pb-6"
                    v-bind="paginationData"
                />
            </template>
            <div
                v-else-if="Object.keys(params).length != 0"
                :class="loading ? 'page-loading' : ''"
                class="flex justify-center items-center text-2xl text-secondary h-full"
            >
                {{ t("ThereAreNoRealEstateThatFitYourRequest") }}
            </div>
            <div
                v-else
                :class="loading ? 'page-loading' : ''"
                class="flex justify-center items-center text-2xl text-secondary h-full"
            >
                {{ t("noData") }}
            </div>
            <Transition>
                <button
                    class="filter-btn"
                    v-show="
                        Object.keys(params).length != 0 ||
                        locationFilters.city ||
                        locationFilters.street
                    "
                    @click="removeFilter()"
                >
                    <span class="span text-lg font-semibold">
                        {{ t("removeFilter") }}
                    </span>
                    <Icon
                        icon="zondicons:close-outline"
                        class="text-error"
                        width="40"
                    />
                </button>
            </Transition>
        </section>
    </div>
</template>
<style scoped>
.FormSelect-style.select-input {
    margin-bottom: 0px;
}
.background-image {
    min-height: 90vh;
}
.card {
    cursor: pointer;
}
.v-enter-active,
.v-leave-active {
    opacity: 1;
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
.filter-btn {
    gap: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 10px;
    position: fixed;
    z-index: 1000;
    inset-inline-end: 40px;
    inset-block-end: 40px;
    border-radius: 100px;
    transition: all 0.4s;
}

.filter-btn span {
    white-space: nowrap;
    width: 0px;
    height: auto;
    visibility: hidden;
    opacity: 0;
    transition: all 0.3s;
}
.filter-btn:hover {
    border-radius: 100px;
}
.filter-btn:hover.filter-btn span {
    opacity: 1;
    visibility: visible;
    width: 100px;
    height: auto;
}
</style>
