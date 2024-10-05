<script setup>
import LoaderButton from "@/components/general-components/LoaderButton.vue";
import { useI18n } from "vue-i18n";
import EstateDetailsLabel from "../../home/components/EstateDetailsLabel.vue";
import OrderDetailsCard from "../components/OrderDetailsCard.vue";
import ImageSlider from "@/components/general-components/ImageSlider.vue";
import Modal from "@/components/general-components/Modal.vue";
import PanoramaRenderer from "../../home/components/PanoramaRenderer.vue";
import Button from "@/components/general-components/Button.vue";
import { Icon } from "@iconify/vue";
import { ref, reactive } from "vue";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import Loading from "@/components/general-components/Loading.vue";
const route = useRoute();
const rateAndComment = ref(false);

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
// var estateInfo = {
//     title: data.description,
//     specifications:
//         "شقة للايجار في حي العمرة الجديدة , مكة المكرمة شقة جديدة ٣ غرف وحمامين وصالة و مطبخ كل الخدمات متوفرة  كهرباء و موية  النت السريع موجود بس تتواصل مع شركة الاتصالات STC عشان التفعيل.\n العقد إلكتروني عن طريق منصة إيجار و السعر قابل للتفاوض",
//     price: data.price,
//     type: "آجار سنوي",
//     location: "",
// };

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
    <div class="w-full p-10">
        <div class="flex justify-between items-center mb-10">
            <h1 class="text-3xl text-secondary font-bold">
                {{ t("estateDetails") }}
            </h1>
            <p class="text-xl text-secondary font-bold">
                شقة للايجار في حي العمرة الجديدة , مكة المكرمة
            </p>
        </div>

        <main class="py-10">
            <div class="flex flex-col gap-2">
                <div class="">
                    <EstateDetailsLabel
                        :label="t('adNo')"
                        :value="'1'"
                        :isOrder="true"
                        class="grid md:grid-cols-4 lg:grid-cols-5 text-center"
                    />
                </div>
                <div>
                    <EstateDetailsLabel
                        :label="t('updateDate')"
                        :value="'sssssss'"
                        :isOrder="true"
                        class="grid md:grid-cols-4 lg:grid-cols-5 text-center"
                    />
                </div>
                <div>
                    <EstateDetailsLabel
                        :label="t('viewsCount')"
                        :value="'sssssss'"
                        :isOrder="true"
                        class="grid md:grid-cols-4 lg:grid-cols-5 text-center"
                    />
                </div>
            </div>
            <OrderDetailsCard class="mt-4" :estate-info="{}" />
            <section class="mt-12">
                <h4
                    class="w-fit mx-6 mb-6 pb-2 text-xl border-b-2 border-primary"
                >
                    {{ t("estateImages") }} :
                </h4>
                <ImageSlider
                    v-if="false"
                    class="mt-2 w-screen"
                    :images="null"
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
                <div class="flex justify-center" v-if="false">
                    <PanoramaRenderer class="mx-auto" />
                </div>
                <div v-else>
                    <p class="text-lg text-secondary text-center">
                        {{ t("noVirtual") }}
                    </p>
                </div>
            </section>
            <section class="my-12">
                <h4
                    class="w-fit mx-6 mb-6 pb-2 text-xl border-b-2 border-primary"
                >
                    {{ t("catalog") }} :
                </h4>

                <img v-if="false" class="xl:w-[60vw] mx-auto" :src="null" />
                <div v-else>
                    <p class="text-lg text-secondary text-center">
                        {{ t("noCatalog") }}
                    </p>
                </div>
            </section>
        </main>
    </div>
</template>
<style>
.rate-btn {
    padding: 12px 50px;
    border-radius: 5px;
    background-color: var(--primary);
    color: white;
    font-size: 18px;
    font-weight: 600;
}
.not-rate {
    color: var(--primary);
    cursor: pointer;
}
.rate {
    color: var(--primary);
    cursor: pointer;
}
.rate-container {
    margin: 0rem 5rem;
    background-color: rgb(252, 252, 252);
    padding: 10px;
    border-radius: 5px;
}

.textarea {
    outline: none;
    padding: 10px;
    display: flex;
    justify-content: center;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    height: 150px;
    border: 1px solid #70707088;
    border-radius: 6px;
    overflow: auto;
    resize: none;
}
textarea:focus {
    border-color: var(--primary);
}
</style>
