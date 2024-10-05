<script setup>
import { useI18n } from "vue-i18n";
import EstateCard from "@/components/general-components/EstateCard.vue";
import Button from "@/components/general-components/Button.vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { useFavouriteStore } from "./store";
import { storeToRefs } from "pinia";
import LoadingComponent from "@/components/general-components/Loading.vue";
const store = useFavouriteStore();
const { data, loading } = storeToRefs(store);
const router = useRouter();
const { t } = useI18n();
onMounted(() => {
    store.getFavourite();
});
const cardItems = [
    {
        image: "https://www.thespruce.com/thmb/ywHTET6XfU7pVy1KAMPfHS1QZZk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/living-room-decor-ideas-5442837-hero-8b6e540e13f9457a84fe9f9e26ea2e5c.jpg",
        price: 25000,
        space: 110,
        management: "ادارة الاعلان",
        description:
            "شقة للبيع في حي الميناء بالمدينة المنورة شقة للبيع في حي الميناء بالمدينة المنورة  شقة للبيع في حي الميناء بالمدينة المنورة  شقة للبيع في حي الميناء بالمدينة المنورة  شقة للبيع في حي الميناء بالمدينة المنورة  شقة للبيع في حي الميناء بالمدينة المنورة  شقة للبيع في حي الميناء بالمدينة المنورة  شقة للبيع في حي الميناء بالمدينة المنورة  شقة للبيع في حي الميناء بالمدينة المنورة ",
        name: "Aqar",
        date: "1/1/2023",
    },
    {
        image: "https://www.thespruce.com/thmb/ywHTET6XfU7pVy1KAMPfHS1QZZk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/living-room-decor-ideas-5442837-hero-8b6e540e13f9457a84fe9f9e26ea2e5c.jpg",
        price: 25000,
        space: 110,
        management: "ادارة الاعلان",
        description: "شقة للبيع في حي الميناء بالمدينة المنورة ...",
        name: "Aqar",
        date: "1/1/2023",
    },
    {
        image: "https://www.thespruce.com/thmb/ywHTET6XfU7pVy1KAMPfHS1QZZk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/living-room-decor-ideas-5442837-hero-8b6e540e13f9457a84fe9f9e26ea2e5c.jpg",
        price: 25000,
        space: 110,
        management: "ادارة الاعلان",
        description: "شقة للبيع في حي الميناء بالمدينة المنورة ...",
        name: "Aqar",
        date: "1/1/2023",
    },
    {
        image: "https://www.thespruce.com/thmb/ywHTET6XfU7pVy1KAMPfHS1QZZk=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/living-room-decor-ideas-5442837-hero-8b6e540e13f9457a84fe9f9e26ea2e5c.jpg",
        price: 25000,
        space: 110,
        management: "ادارة الاعلان",
        description: "شقة للبيع في حي الميناء بالمدينة المنورة ...",
        name: "Aqar",
        date: "1/1/2023",
    },
];
</script>
<template>
    <LoadingComponent v-if="loading" />
    <div class="px-14 background-image" :class="loading ? 'page-loading' : ''">
        <div class="flex gap-4 items-center py-16">
            <Icon icon="mdi:favourite" class="text-error" width="40" />
            <h3 class="header-style">{{ t("favourite") }}</h3>
        </div>
        <Teleport to="#header-action">
            <Button
                class="px-8 py-[8px]"
                @click="router.push('/landingPage')"
                >{{ t("HomePage") }}</Button
            >
        </Teleport>
        <div class="pb-10 px-24" v-for="item in data">
            <EstateCard
                class="card"
                @click="router.push('/estate-details/' + item.real_estate_id)"
                :image="
                    item.real_estate_images &&
                    item.real_estate_images.length > 0
                        ? item.real_estate_images[0].image
                        : ''
                "
                :price="item.price"
                :space="item.space_of_place"
                :management="item.management"
                :description="item.description"
                :name="item.name"
                :date="item.date"
                isFavorite
            />
        </div>
    </div>
</template>
<style scoped>
.background-image {
    min-height: 90vh;
}
.card {
    cursor: pointer;
}
</style>
