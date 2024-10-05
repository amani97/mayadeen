<script setup>
import "leaflet/dist/leaflet.css";
import { latLngBounds, latLng } from "leaflet";
import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { Icon } from "@iconify/vue";
import ShowOnMap from "./ShowOnMap.vue";
import ShowOnMapDailyRental from "./ShowOnMapDailyRental.vue";
import { useRealEstateStore } from "../../modules/home/pages/realEstateStore.js";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import Loading from "@/components/general-components/Loading.vue";
import { useRouter, useRoute } from "vue-router";
import arcades from "./arcades.json";
import { saudiCity } from "../../utils/utils-functions";
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
var leafletMapRef = ref(null);
const store = useRealEstateStore();
const showData = ref({});

const { realEstates, rantRealEstate, loading } = storeToRefs(store);
onMounted(() => {
    props.isDailyRental == false
        ? store.getRealEstate()
        : store.getRentRealEstate();
});

const mapItem = computed(() => {
    return props.isDailyRental ? rantRealEstate.value : realEstates.value;
});
const showOnMap = ref(false);
const props = defineProps({
    isDailyRental: { type: Boolean, default: false },
});
let zoom = ref(5);
let center = ref([24.7136, 46.6753]);
function cityShow(val) {
    console.log(leafletMapRef.value.leafletObject.flyTo(val?.latLng, 12));
    // zoom.value = 9;
    // setTimeout(() => {
    // center.value = val.latLng;
    // }, 600);
}
const maxBounds = latLngBounds([
    [33, 55],
    [16, 34],
]);
console.log(maxBounds);
const bounds = latLngBounds([
    [33, 55],
    [16, 34],
]);
</script>
<template>
    <Loading v-if="loading && isDailyRental == false" />
    <div id="map" class="map" :class="loading ? 'page-loading' : ''">
        <l-map
            id="leaflet"
            @click.self="showOnMap = false"
            ref="leafletMapRef"
            :minZoom="5"
            v-model:zoom="zoom"
            v-model:center="center"
            :options="{ zoomControl: false }"
            :bounds="bounds"
            :max-bounds="maxBounds"
        >
            <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
"
                layer-type="base"
                name="Stadia Maps Basemap"
            ></l-tile-layer>

            <l-marker
                v-if="zoom > 8"
                class=""
                v-for="item in mapItem"
                :key="
                    isDailyRental
                        ? item.rent_real_estate_id
                        : item.real_estate_id
                "
                :lat-lng="[item.lat, isDailyRental ? item.long : item.lang]"
                @click="
                    showOnMap = true;
                    showData = item;
                "
            >
                <l-icon :icon-size="[40, 40]">
                    <div
                        class="flex justify-center px-2 gap-1 text-primary price items-center"
                    >
                        <span class="SAR">SAR</span>

                        {{
                            route.path == "/daily-rental"
                                ? item.avg_price
                                    ? item.avg_price.toFixed(2)
                                    : ""
                                : item.price
                        }}
                    </div>
                    <Icon
                        icon="majesticons:map-marker"
                        width="
                        40"
                        class="text-primary"
                    />
                </l-icon>
            </l-marker>
            <l-marker
                v-else
                class=""
                v-for="i in saudiCity"
                :lat-lng="i.latLng"
                @click="cityShow(i)"
            >
                <l-icon :icon-size="[40, 40]">
                    <div class="saudi-city">{{ i.name }}</div>
                </l-icon>
            </l-marker>
        </l-map>
        <transition v-if="isDailyRental" name="slide-fade">
            <ShowOnMapDailyRental
                v-show="showOnMap"
                :key="showData.rent_real_estate_id"
                :data="showData"
                class="ShowOnMapDailyRental shadow-xl"
            />
        </transition>
        <transition v-else name="slide-fade">
            <ShowOnMap
                v-show="showOnMap"
                :key="showData.real_estate_id"
                :data="showData"
                class="ShowOnMap shadow-xl"
            />
        </transition>
    </div>
</template>
<style>
.SAR {
    font-size: 10px;
    font-weight: 600;
}
.price {
    border: 2px solid rgba(71, 71, 71, 0.658);
    background-color: white;
    font-weight: 900;
    font-size: 16px;
    border-radius: 5px;
    width: 140px;
    height: 30px;
    position: absolute;
    inset-inline-end: -50px;
    inset-block-start: -30px;
}
.saudi-city {
    width: 50px;
    height: 50px;
    border-radius: 10px;
    background-color: var(--secondary);
    display: flex;
    align-items: center;
    color: #ffc95d;
    font-size: 14px;
    font-weight: 700;
    justify-content: center;
}
.ShowOnMapDailyRental {
    position: fixed;
    z-index: 1000;
    inset-block-end: 10px;
    inset-inline-start: 10px;
}

.header {
    background-color: #444444f1;
    backdrop-filter: opacity(1%);
    position: relative;
    z-index: 1000;
}

.leaflet-div-icon {
    background: transparent;
    border: none;
}

.ShowOnMap {
    position: absolute;
    z-index: 1000;
    inset-block-end: 25px;
    inset-inline-start: 120px;
}

#map {
    height: 100vh;
}
</style>
