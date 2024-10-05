<script setup>
import Map from "@/components/general-components/map.vue";
import { useI18n } from "vue-i18n";
import { Icon } from "@iconify/vue";
import { useRealEstateStore } from "../realEstateStore.js";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
const store = useRealEstateStore();
const { activeFilter, customFilterData, saleOrRent } = storeToRefs(store);
const { t } = useI18n();
async function removeFilter() {
    customFilterData.value = null;
    await store.getRealEstate();
    activeFilter.value = null;
}

onMounted(() => {
    store.clearFilters();
});
</script>
<template>
    <div class="w-full landing-page-container">
        <p class="active-filter">
            {{
                activeFilter == null
                    ? t("all")
                    : activeFilter + " " + t(saleOrRent)
            }}
        </p>
        <Map @show=""></Map>
        <div class="flex flex-col gap-5 button-container">
            <router-link to="/home/notification"
                ><img
                    class="w-10"
                    src="/assets/sidebar/notification.svg"
                    alt=""
            /></router-link>
            <router-link to="/home/messages"
                ><img class="w-10" src="/assets/sidebar/live-chat.svg" alt=""
            /></router-link>
        </div>
        <Transition>
            <button
                class="filter-btn"
                v-show="activeFilter"
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
    </div>
</template>
<style scoped>
.active-filter {
    position: absolute;
    z-index: 1001;
    inset-block-start: 15%;
    inset-inline-start: 43%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    background-color: var(--secondary);
    width: 200px;
    border-radius: 20px;
    font-weight: 500;
    font-size: 18px;
    height: 35px;
    opacity: 0.8;
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
button {
    display: block;
}
.button-container {
    position: absolute;
    z-index: 1000;
    inset-inline-start: 40px;
    inset-block-end: 40px;
}
.landing-page-container {
    position: absolute;
    top: 0px;
    overflow: hidden;
}
.filter-btn {
    gap: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    padding: 10px;
    position: absolute;
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
