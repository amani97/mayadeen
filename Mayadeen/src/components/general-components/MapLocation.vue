<script setup>
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LIcon } from "@vue-leaflet/vue-leaflet";
import L, { latLngBounds, latLng } from "leaflet";
import { ref, reactive, onMounted } from "vue";
import Modal from "@/components/general-components/Modal.vue";
import { useI18n } from "vue-i18n";
import { Icon } from "@iconify/vue";
import { saudiCity } from "../../utils/utils-functions";
const { t } = useI18n();
const emit = defineEmits("getLocation");
const props = defineProps({ marker: Array });
var map = ref(null);
var zoom = ref(5);
let cityName = ref(null);
var marker = ref({});
var cityMarker = ref([]);
let center = ref(
    props.marker
        ? props.marker.length > 0
            ? props.marker
            : [24.7136, 46.6753]
        : [24.7136, 46.6753]
);
let markerLatLng = reactive(
    props.marker
        ? props.marker.length > 0
            ? props.marker
            : [24.7136, 46.6753]
        : [24.7136, 46.6753]
);
// Icon options
var iconOptions = {
    iconUrl: "/assets/marker.png",
    iconSize: [50, 50],
};
// Creating a custom icon
var customIcon = L.icon(iconOptions);

// Creating Marker Options
var markerOptions = {
    title: "MyLocation",
    clickable: true,
    draggable: true,
    icon: customIcon,
};
var customCityIcon = L.divIcon({
    className: "custom-div-icon",
    html: "<div class='saudi-city'>" + cityName.value + "</div>",
    iconSize: [30, 42],
    iconAnchor: [15, 42],
});
var cityMarkerOption = {
    title: "city",
    clickable: true,
    draggable: true,
    icon: customCityIcon,
};
const maxBounds = latLngBounds([
    [33, 55],
    [16, 34],
]);
const bounds = latLngBounds([
    [33, 55],
    [16, 34],
]);
function cityShow(val) {
    // map.value.setZoom(9);
    map.value.flyTo(val?.latLng, 12);
}
onMounted(() => {
    map.value = L.map("leafletmap", { maxBounds: maxBounds }).setView(
        center.value,
        zoom.value
    );
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        minZoom: 5,
        maxZoom: 16,
        attribution: "© OpenStreetMap",
    }).addTo(map.value);
    for (let i = 0; i < saudiCity.length; i++) {
        cityName.value = saudiCity[i].name;
        cityMarker.value.push({
            marker: new L.Marker(
                saudiCity[i].latLng,

                {
                    title: "city",
                    clickable: true,
                    icon: L.divIcon({
                        className: "custom-div-icon",
                        html:
                            "<div class='saudi-city'>" +
                            cityName.value +
                            "</div>",
                        iconSize: [30, 42],
                        iconAnchor: [15, 42],
                    }),
                }
            ),
        });
        cityMarker.value[i].marker.on("click", (e) => {
            cityShow(saudiCity[i]);
        });
        cityMarker.value[i].marker.addTo(map.value);
    }

    map.value.on("click", function (e) {
        if (e.target._zoom > 14) {
            map.value.removeLayer(marker.value);
            // Creating a Marker

            marker.value = new L.Marker(
                [e.latlng.lat, e.latlng.lng],
                markerOptions
            );
            // Adding marker to the map
            marker.value.addTo(map.value);
            emit("getLocation", e.latlng);
        } else {
            showModal.value = true;
        }
    });
    map.value.on("zoom", (e) => {
        if (e.target._zoom > 7) {
            for (let i = 0; i < cityMarker.value.length; i++) {
                map.value.removeLayer(cityMarker.value[i].marker);
            }
        } else {
            for (let i = 0; i < saudiCity.length; i++) {
                cityName.value = saudiCity[i].name;
                cityMarker.value.push({
                    marker: new L.Marker(saudiCity[i].latLng, {
                        title: "city",
                        clickable: true,
                        icon: L.divIcon({
                            className: "custom-div-icon",
                            html:
                                "<div class='saudi-city'>" +
                                cityName.value +
                                "</div>",
                            iconSize: [30, 42],
                            iconAnchor: [15, 42],
                        }),
                    }),
                });
                cityMarker.value[i].marker.on("click", (e) => {
                    cityShow(saudiCity[i]);
                });
                cityMarker.value[i].marker.addTo(map.value);
            }
        }
    });
    if (props.marker) {
        map.value.flyTo(props.marker, 12);
        marker.value = new L.Marker(props.marker, markerOptions);
        marker.value.addTo(map.value);
    }
});
var showModal = ref(false);
</script>
<template>
    <main>
        <modal
            class="w-[40%] relative"
            :show="showModal"
            @close="showModal = false"
        >
            <template #modal-header>
                <div class="flex items-center justify-center mb-4">
                    <h3>{{ t("note") }}</h3>

                    <button class="close-modal" @click="showModal = false">
                        ×
                    </button>
                </div>
                <div class="flex justify-center gap-10 text-xl items-center">
                    <Icon
                        icon="octicon:alert-16"
                        width="40"
                        class="text-error"
                    ></Icon>

                    {{ t("TheActualLocationMustBeSpecified") }}
                </div>
            </template>
        </modal>
        <div id="leafletmap"></div>
        <!-- <l-map
            ref="map"
            v-model:zoom="zoom"
            v-model:center="center"
            :useGlobalLeaflet="false"
            :options="{ zoomControl: false }"
        >
            <l-tile-layer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
"
                layer-type="base"
                name="Stadia Maps Basemap"
            ></l-tile-layer>
            <l-marker
                draggable
                @dragend="
                    (e) => {
                        $emit('getLocation', e);
                    }
                "
                :lat-lng="markerLatLng"
            >
                <l-icon :icon-size="[40, 40]">
                    <Icon
                        icon="majesticons:map-marker"
                        width="40"
                        class="text-primary"
                    /> </l-icon
            ></l-marker>
        </l-map> -->
    </main>
</template>
<style>
.test {
    width: 100% !important;
    height: 100% !important;
    background-color: red;
}
.slide-fade-enter-active {
    transition: all 0.3s;
}

.leaflet-div-icon {
    background: transparent;
    border: none;
}
#leafletmap {
    height: 60vh;
}
.slide-fade-leave-active {
    transition: all 0.3s;
}

[dir="rtl"] .slide-fade-enter-from,
[dir="rtl"] .slide-fade-leave-to {
    opacity: 0;
}
.leaflet-control {
    display: none !important;
}
[dir="ltr"] .slide-fade-enter-from,
[dir="ltr"] .slide-fade-leave-to {
    opacity: 0;
}

.header {
    background-color: #444444f1;
    backdrop-filter: opacity(1%);
    position: relative;
    z-index: 1000;
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
.ShowOnMap {
    position: absolute;
    z-index: 1000;
    inset-block-end: 25px;
    inset-inline-start: 120px;
}

main {
    height: 100%;
    width: 100%;
}

#leafletmap {
    cursor: url(/assets/markerCursor.png) 15 45, pointer;
}
</style>
