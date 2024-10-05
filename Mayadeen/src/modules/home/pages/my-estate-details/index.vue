<script setup>
import DetailsHeader from "@/components/layout-components/DetailsHeader.vue";
import { useI18n } from "vue-i18n";
import Breadcrumbs from "../../../../components/general-components/Breadcrumbs.vue";
import EstateDetailsLabel from "../../components/EstateDetailsLabel.vue";
import EstatesDetailsCard from "../../components/EstatesDetailsCard.vue";
import ImageSlider from "@/components/general-components/ImageSlider.vue";
import PanoramaRenderer from "../../components/PanoramaRenderer.vue";
import { useEstateDetails } from "../estate-details/store.js";

import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import Loading from "@/components/general-components/Loading.vue";
const route = useRoute();
const store = useEstateDetails();

const { data, loading } = storeToRefs(store);
onMounted(() => {
    store.getRealEstateById(route.params.id);
});

const { t } = useI18n();
var breadcrumbs = [
    {
        text: "الرئيسية",
    },
    {
        text: "شقق للايجار",
    },
    {
        text: "تفاصيل العقار",
    },
];

var estateInfo = {
    title: "شقة للايجار في حي العمرة الجديدة , مكة المكرمة",
    specifications:
        "شقة للايجار في حي العمرة الجديدة , مكة المكرمة شقة جديدة ٣ غرف وحمامين وصالة و مطبخ كل الخدمات متوفرة  كهرباء و موية  النت السريع موجود بس تتواصل مع شركة الاتصالات STC عشان التفعيل.\n العقد إلكتروني عن طريق منصة إيجار و السعر قابل للتفاوض",
    price: "20000",
    type: "آجار سنوي",
    location:
        "في حي العمرة الجديد خلف الفحص الدوري للسيارات و قريب من حي النواريه",
};

var images = [
    {
        id: 1,
        url: "https://www.bhg.com/thmb/3Vf9GXp3T-adDlU6tKpTbb-AEyE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
    },
    {
        id: 2,
        url: "https://www.bhg.com/thmb/3Vf9GXp3T-adDlU6tKpTbb-AEyE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
    },
    {
        id: 3,
        url: "https://www.bhg.com/thmb/3Vf9GXp3T-adDlU6tKpTbb-AEyE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
    },
    {
        id: 5,
        url: "https://www.bhg.com/thmb/3Vf9GXp3T-adDlU6tKpTbb-AEyE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg",
    },
];
</script>

<template>
    <Loading v-if="loading" />
    <div
        class="background-image w-screen"
        :class="loading ? 'page-loading' : ''"
    >
        <DetailsHeader :is-user-estate="true"> </DetailsHeader>
        <Breadcrumbs class="w-fit px-8 my-8 mx-12" :items="breadcrumbs" />
        <main class="py-10">
            <div class="grid grid-cols-2 gap-12 px-12">
                <EstateDetailsLabel
                    class="col-span-2"
                    :label="t('adNo')"
                    :value="data.real_estate_id"
                />
                <EstateDetailsLabel :label="t('updateDate')" value="منذ يوم" />
                <EstateDetailsLabel
                    :label="t('viewsCount')"
                    :value="data.views"
                />
            </div>
            <EstatesDetailsCard class="mt-12" :estate-info="data" />
            <section class="mt-12">
                <h4
                    class="w-fit mx-6 mb-6 pb-2 text-xl border-b-2 border-primary"
                >
                    {{ t("estateImages") }} :
                </h4>
                <ImageSlider
                    v-if="
                        data.real_estate_images
                            ? data.real_estate_images.length == 0
                                ? false
                                : true
                            : false
                    "
                    class="mt-2 w-screen"
                    :images="data.real_estate_images"
                />
                <div v-else>
                    <p class="text-lg text-secondary text-center">
                        {{ t("noImages") }}
                    </p>
                </div>
            </section>
            <section class="mt-12">
                <h4
                    class="w-fit mx-6 mb-6 pb-2 text-xl border-b-2 border-primary"
                >
                    {{ t("panoramicView") }} :
                </h4>
                <div
                    class="flex justify-center"
                    v-if="data.virtual && data.virtual != 'لا يوجد'"
                >
                    <PanoramaRenderer class="mx-auto" />
                </div>
                <div v-else>
                    <p class="text-lg text-secondary text-center">
                        {{ t("noVirtual") }}
                    </p>
                </div>
            </section>
            <section class="mt-12">
                <h4
                    class="w-fit mx-6 mb-6 pb-2 text-xl border-b-2 border-primary"
                >
                    {{ t("catalog") }} :
                </h4>

                <img
                    v-if="data.katalog && data.katalog != 'لا يوجد'"
                    class="xl:w-[60vw] mx-auto"
                    src="https://www.bhg.com/thmb/3Vf9GXp3T-adDlU6tKpTbb-AEyE=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/white-modern-house-curved-patio-archway-c0a4a3b3-aa51b24d14d0464ea15d36e05aa85ac9.jpg"
                />
                <div v-else>
                    <p class="text-lg text-secondary text-center">
                        {{ t("noCatalog") }}
                    </p>
                </div>
            </section>
        </main>
    </div>
</template>
