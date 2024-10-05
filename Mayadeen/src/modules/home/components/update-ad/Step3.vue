<script setup>
import { useI18n } from "vue-i18n";
import MapLocation from "@/components/general-components/MapLocation.vue";
import FormCheckbox from "@/components/form-components/FormCheckbox.vue";
import { ref } from "vue";
import FormSelect from "@/components/form-components/FormSelect.vue";
import { useAdInfoStore } from "../../pages/ad-info/store";
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { saudiCity } from "../../../../utils/utils-functions";
const store = useAdInfoStore();
const { data, updateData, flag, cities, streets, loading } = storeToRefs(store);
const { t, locale } = useI18n();
// onMounted(() => {
//     store.getCities();
//     store.getStreets();
// });
const emit = defineEmits(["checkedPolicy"]);
var checked = ref(false);
async function getLatLng(e) {
    loading.value = true;
    updateData.value.lat = e.lat;
    updateData.value.lang = e.lng;
    data.value.lat = e.lat;
    data.value.lang = e.lng;
    await fetch(
        `https://nominatim.openstreetmap.org/search.php?q=${e.lat},${e.lng}&polygon_geojson=1&format=json`,
        { headers: { "accept-language": locale.value } }
    )
        .then((response) => response.json())
        .then((j) => {
            loading.value = false;

            data.value.location_text = j[0].display_name;
            updateData.value.location_text = j[0].display_name;
        });
}
</script>
<template>
    <div class="xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl">
        <h2 class="flex justify-center text-secondary my-16 font-semibold">
            {{ t("propertyDetails") }}
        </h2>
        <h2 class="text-secondary">{{ t("locateThePropertyOnTheMap") }} :</h2>
        <div class="map-vue">
            <MapLocation
                :marker="[data.lat, data.lang]"
                @getLocation="(e) => getLatLng(e)"
            />
        </div>
        <div class="text-secondary whitespace-nowrap mb-8">
            <label class="text-secondary whitespace-nowrap" for=""
                >{{ t("locationText") }} : </label
            >{{ data.location_text ? data.location_text : "" }}
        </div>
        <FormCheckbox
            @change="emit('checkedPolicy', checked)"
            v-model="checked"
            inputClasses=""
            labelClasses=" text-secondary"
            :label="t('confirmMapPolicy')"
        />
    </div>
</template>
<style scoped>
.map-vue {
    margin-inline: auto;
    border-radius: 8px;
    margin-block: 50px;
    height: 600px;
    width: 70%;
    overflow: hidden;
}

@media (max-width: 768px) {
    .map-vue {
        height: 250px;
        width: 100%;
        overflow: hidden;
    }
}
.select-input[data-v-0c751e7b] {
    margin-bottom: 0px;
}
</style>
