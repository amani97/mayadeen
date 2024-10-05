<script setup>
import AddAd from "@/components/general-components/AddAd.vue";
import Button from "@/components/general-components/Button.vue";
import NummerOfStep from "@/components/general-components/StepNumber.vue";
import { useI18n } from "vue-i18n";
import MapLocation from "@/components/general-components/MapLocation.vue";
import FormSelect from "@/components/form-components/FormSelect.vue";
import dailyRentalButton from "../../components/dailyRentalButton.vue";
import { reactive, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useDailyRentalStore } from "../../daily-rental-store";
import LoadingComponent from "@/components/general-components/Loading.vue";
import { storeToRefs } from "pinia";
const store = useDailyRentalStore();
const { requestData, loading } = storeToRefs(store);
const router = useRouter(),
    route = useRoute();
const { t, locale } = useI18n();
async function getLocation(e) {
    loading.value = true;
    requestData.value.lat = e.lat;
    requestData.value.long = e.lng;
    await fetch(
        `https://nominatim.openstreetmap.org/search.php?q=${e.lat},${e.lng}&polygon_geojson=1&format=json`,
        { headers: { "accept-language": locale.value } }
    )
        .then((response) => response.json())
        .then((j) => {
            loading.value = false;
            requestData.value.location_text = j[0].display_name;
        });
}
</script>

<template>
    <LoadingComponent v-if="loading" />

    <div :class="loading ? 'page-loading' : ''">
        <Teleport to="#header-action">
            <Button class="px-8 py-[8px]" @click="$router.go(-1)">{{
                t("return")
            }}</Button>
        </Teleport>
        <div class="containe background-image py-10">
            <div class="px-8">
                <AddAd />
            </div>
            <div class="steps text-center mb-14">
                <div
                    class="xs:text-sm xs:mb-7 sm:text-base sm:mb-10 md:text-lg md:mb-16 lg:text-xl xl:text-2xl"
                >
                    {{ t("Basic estate information") }}
                </div>
                <NummerOfStep :numberOfStep="7"></NummerOfStep>
            </div>
            <div
                class="px-10 name-estate grid grid-cols-1 items-center xs:text-sm xs:mb-7 sm:text-base sm:mb-10 md:text-lg md:mb-16 lg:text-xl xl:text-2xl items-center"
            >
                <div>{{ t("Locate the estate on the map") }} :</div>
            </div>
            <div class="map-vue">
                <MapLocation @getLocation="getLocation($event)" />
            </div>
            <div class="px-10 mb-10">
                <div
                    class="flex xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl items-center"
                >
                    <p class="items-center">
                        {{ t("propertyLocationAsSpecified") }} : &nbsp
                    </p>
                    <p>{{ requestData.location_text }}</p>
                </div>
            </div>
            <dailyRentalButton
                :isValid="true"
                pathName="step3"
                next="next"
            ></dailyRentalButton>
        </div>
    </div>
</template>
<style>
.containe {
}
.map-vue {
    margin-inline: auto;
    border-radius: 8px;
    margin-block: 50px;
    height: 400px;
    width: 70%;
    overflow: hidden;
}
</style>
