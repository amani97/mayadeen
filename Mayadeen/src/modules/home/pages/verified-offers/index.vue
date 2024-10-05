<script setup>
import { useI18n } from "vue-i18n";
import EstateCard from "@/components/general-components/EstateCard.vue";
import Button from "@/components/general-components/Button.vue";
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";
const router = useRouter();
const { t } = useI18n();
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
    <div class="px-14 background-image">
        <div class="flex gap-4 items-center py-16">
            <img class="w-9" src="/assets/sidebar/badge.svg" alt="icon" />
            <h3 class="header-style">{{ t("verifiedOffers") }}</h3>
        </div>
        <Teleport to="#header-action">
            <Button class="px-8 py-[8px]" @click="router.go(-1)">{{
                t("return")
            }}</Button>
        </Teleport>
        <div class="pb-10 px-24" v-for="item in cardItems">
            <EstateCard
                @click="router.push('/estate-details/1')"
                :image="item.image"
                :price="item.price"
                :space="item.space"
                :management="item.management"
                :description="item.description"
                :name="item.name"
                :date="item.date"
                isSaved
            />
        </div>
    </div>
</template>
<style scoped></style>
