<script setup>
import { Swiper, SwiperSlide } from "swiper/vue";
import { useI18n } from "vue-i18n";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from "swiper";
import { Icon } from "@iconify/vue";
const { t } = useI18n();
const emit = defineEmits(["deleteImage", "previousSlide", "nextSlide"]);
const props = defineProps({
    isMainImage: { type: Boolean, default: false },
    images: Array,
    canDelete: { type: Boolean, default: true },
});
const modules = [Pagination, Navigation];
</script>

<template>
    <div class="w-full h-full mx-auto my-10 mb-32 image-slider">
        <swiper
            class=""
            :slidesPerView="1"
            :spaceBetween="20"
            :breakpoints="{
                640: {
                    slidesPerView: 2,
                },
                1280: {
                    slidesPerView: 3,
                },
            }"
            :pagination="{
                clickable: true,
            }"
            :modules="modules"
        >
            <swiper-slide
                class="shadow-lg rounded-xl"
                v-for="(image, index) in images"
                :key="index"
            >
                <div
                    class="w-full h-full"
                    :class="isMainImage && index == 0 ? 'mainImage' : ''"
                >
                    <div class="relative">
                        <div class="mainImagePrimary">
                            <div v-if="isMainImage && index == 0" class="">
                                {{ t("Main display image") }}
                            </div>
                        </div>

                        <div
                            class="mainImageText relative"
                            v-if="isMainImage && index == 0"
                        >
                            {{ t("Main display image") }}
                        </div>
                        <img
                            class="imagesStyle"
                            :src="image.url"
                            alt="loading"
                        />
                    </div>
                    <div class="toll-item bottom">
                        <button @click="emit('previousSlide', index)">
                            <Icon
                                icon="streamline:interface-arrows-right-arrow-right-keyboard"
                                color="black"
                                width="25"
                            />
                        </button>
                        <button
                            v-if="canDelete"
                            class="garbage-btn"
                            @click="emit('deleteImage', index)"
                        >
                            <Icon icon="mdi:garbage" color="red" width="25" />
                        </button>
                        <button @click="emit('nextSlide', index)">
                            <Icon
                                icon="streamline:interface-arrows-left-arrow-keyboard-left"
                                color="black"
                                width="25"
                            />
                        </button>
                    </div>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<style>
.mainImage:hover .mainImageText {
    opacity: 1;
    backdrop-filter: brightness(20%);
}

.mainImagePrimary {
    overflow: hidden;
    position: absolute;
    font-size: 12px;
    width: 150px;
    padding: 10px;
    display: flex;
    justify-content: center;
    width: 100% !important;
    height: 100% !important;
}
[dir="rtl"] .mainImagePrimary div {
    transform: rotate(-45deg);
    position: absolute;
    white-space: nowrap;
    inset-inline-end: -50px;
    inset-block-start: 30px;
    font-size: 12px;
    width: 200px;
    display: flex;
    justify-content: center;
    background-color: var(--error);
    color: white;
}
[dir="ltr"] .mainImagePrimary div {
    transform: rotate(45deg);
    position: absolute;
    white-space: nowrap;
    inset-inline-end: -50px;
    inset-block-start: 30px;
    font-size: 12px;
    width: 200px;
    display: flex;
    justify-content: center;
    background-color: var(--error);
    color: white;
}
.mainImageText {
    transition: all 0.2s;
    opacity: 0;
    display: flex;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    justify-content: center;
    align-items: center;
    position: absolute;
    color: white;
    z-index: 20;
    width: 100% !important;
    height: 100% !important;
}
.imagesStyle {
    @apply shadow-xl mx-auto w-full rounded-t-xl;
    object-fit: cover;
    width: auto;
    height: 300px !important;
}

.garbage-btn {
    @apply relative top-5 px-5 rounded-full py-5;
    background-color: white;
    box-shadow: 0px 1px 11px -4px rgba(0, 0, 0, 0.28);
    -webkit-box-shadow: 0px 1px 11px -4px rgba(0, 0, 0, 0.28);
    -moz-box-shadow: 0px 1px 11px -4px rgba(0, 0, 0, 0.28);
}

.swiper .swiper-slide {
}

.toll-item {
    @apply shadow-lg rounded-md;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: white;
    width: 100%;
    height: 4rem;
    padding-inline: 20px;
}

.swiper {
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
    overflow: visible;
}

.image-slider .swiper-pagination-bullet {
    background-color: white;
    border: solid 1px gray;
    width: 15px;
    height: 15px;
}

.image-slider .swiper-pagination-bullet-active {
    background-color: #fbb52e;
}

.image-slider .swiper-pagination {
    position: relative;
    margin-top: 2rem;
}

.swiper-button-next,
.swiper-button-prev {
    color: var(--swiper-navigation-color, #fbb52e);
}

/* @media (max-width: 480px) {
    .swiper .swiper-slide {
        width: 300px !important;
        height: 200px !important;
    }
}

@media (max-width: 768px) and (min-width: 480px) {
    .swiper .swiper-slide {
        width: 350px !important;
        height: 220px !important;
    }
}

@media (max-width: 976px) and (min-width: 768px) {
    .swiper .swiper-slide {
        width: 390px !important;
        height: 270px !important;
    }
}

@media (max-width: 1440px) and (min-width: 976px) {
    .swiper .swiper-slide {
        width: 430px !important;
        height: 290px !important;
    }
} */
</style>
