<template>
    <div class="swiper-container image-slider">
        <swiper
            :slidesPerView="1"
            :breakpoints="{
                640: {
                    slidesPerView: 2,
                },
                1280: {
                    slidesPerView: 3,
                },
            }"
            :spaceBetween="30"
            :pagination="{
                clickable: true,
            }"
            :modules="modules"
        >
            <swiper-slide v-for="image in images" :key="image.id"
                ><img
                    class="w-full object-cover h-72 loadingImage"
                    :src="image.image"
                    alt="Loding Image"
            /></swiper-slide>
        </swiper>
    </div>
</template>
<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        images: Array,
    },
    setup() {
        return {
            modules: [Pagination],
        };
    },
};
</script>

<style>
.loadingImage {
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--secondary);
    font-size: 18px;
    font-weight: 600;
}

.swiper {
    margin-left: auto;
    margin-right: auto;
    overflow: hidden;
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
</style>
