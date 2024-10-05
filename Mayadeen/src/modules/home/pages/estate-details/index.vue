<script setup>
import DetailsHeader from "@/components/layout-components/DetailsHeader.vue";
import LoaderButton from "../../../../components/general-components/LoaderButton.vue";
import { useI18n } from "vue-i18n";
import Breadcrumbs from "../../../../components/general-components/Breadcrumbs.vue";
import EstateDetailsLabel from "../../components/EstateDetailsLabel.vue";
import EstatesDetailsCard from "../../components/EstatesDetailsCard.vue";
import ImageSlider from "@/components/general-components/ImageSlider.vue";
import Modal from "@/components/general-components/Modal.vue";
import PanoramaRenderer from "../../components/PanoramaRenderer.vue";
import Button from "../../../../components/general-components/Button.vue";
import { Icon } from "@iconify/vue";
import EstateDetailsActions from "../../components/EstateDetailsActions.vue";
import { ref, reactive } from "vue";
import { useEstateDetails } from "./store.js";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import Loading from "@/components/general-components/Loading.vue";
const store = useEstateDetails();
const route = useRoute();
const { data, loading, rating, wishlist } = storeToRefs(store);
const rateAndComment = ref(false);
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

const comment = ref("");
const rate = ref(0);
const onRateEstateConfirmed = () => {
    store
        .rateEstate({
            comment: comment.value,
            rate: rate.value,
            real_estate_id: route.params.id,
        })
        .then(() => {
            rateAndComment.value = false;
            rate.value = 0;
            comment.value = "";
        });
};
</script>

<template>
    <Loading v-if="loading" />
    <div
        class="background-image w-screen"
        :class="loading ? 'page-loading' : ''"
    >
        <DetailsHeader :is-user-estate="false"> </DetailsHeader>
        <div
            class="flex flex-col lg:flex-row justify-between px-8 items-center"
        >
            <Breadcrumbs class="w-fit my-8" :items="breadcrumbs" />
            <Button
                @click="rateAndComment = true"
                color="accent"
                class="px-6 bg-white text-secondary shadow-lg flex items-center gap-4 border-none my-auto py-[8px]"
                >{{ t("rateAndComment") }}

                <Icon
                    :icon="rating ? 'ph:star-fill' : 'ph:star-bold'"
                    class="text-primary"
                />
                {{ rating ? rating : "" }}
            </Button>
            <modal
                class="w-[65%] relative"
                :show="rateAndComment"
                @close="rateAndComment = false"
            >
                <template #modal-header>
                    <div class="flex items-center justify-center mb-4">
                        <h3>{{ t("realEstateRating") }}</h3>

                        <button
                            class="close-modal"
                            @click="
                                rateAndComment = false;
                                rate = 0;
                                comment = '';
                            "
                        >
                            ×
                        </button>
                    </div>
                </template>
                <div class="rate-container shadow-lg">
                    <div class="flex justify-between mt-4 items-center">
                        <p class="text-xl text-secondary">
                            {{ t("realEstateRating") }} :
                        </p>
                        <div class="flex flex-row-reverse">
                            <Icon
                                v-for="(i, index) in 5"
                                :key="index"
                                :icon="
                                    i > rate ? 'ph:star-bold' : 'ph:star-fill'
                                "
                                width="30"
                                @click="rate = index + 1"
                                :class="i.rate ? 'rate' : 'not-rate'"
                            />
                        </div>
                    </div>
                    <div class="mt-4">
                        <label
                            class="text-secondary text-xl"
                            for="opinionOfTheSeller"
                            >{{ t("yourOpinionOfTheRealEstate") }}</label
                        >
                        <textarea
                            maxlength="500"
                            class="textarea mt-6"
                            name="interface"
                            v-model="comment"
                        ></textarea>
                        <p class="text-sm mt-4 text-end">
                            {{ t("itCannotExceed500Characters") }}
                        </p>
                    </div>
                    <div class="flex justify-center">
                        <LoaderButton
                            type="submit"
                            color="primary"
                            class="font-bold"
                            :loading="loading"
                            @click="onRateEstateConfirmed"
                        >
                            {{ t("continue") }}</LoaderButton
                        >
                    </div>
                </div>
            </modal>
        </div>
        <main class="py-10">
            <div class="grid grid-cols-2 gap-12 px-8">
                <div class="col-span-2 flex justify-between">
                    <EstateDetailsLabel
                        :label="t('adNo')"
                        :value="data.real_estate_id"
                    />
                    <EstateDetailsActions />
                </div>
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
                    class="mt-2"
                    :images="
                        data.real_estate_images ? data.real_estate_images : null
                    "
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
            <section class="my-12">
                <h4
                    class="w-fit mx-6 mb-6 pb-2 text-xl border-b-2 border-primary"
                >
                    {{ t("catalog") }} :
                </h4>

                <img
                    v-if="data.katalog && data.katalog != 'لا يوجد'"
                    class="xl:w-[60vw] mx-auto"
                    :src="data.katalog"
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
