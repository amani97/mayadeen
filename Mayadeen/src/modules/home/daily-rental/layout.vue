<script setup>
import HeaderBtn from "@/components/general-components/HeaderBtn.vue";
import sidebar from "@/components/general-components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
const { t } = useI18n();
const route = useRoute();
const router = useRouter();
var sidebarShow = ref(false);
const headerBtns = [
    {
        image: "/assets/home/serch.svg",
        url: "/daily-rental/list-search",
        text: "serchByList",
    },
    {
        image: "/assets/home/serch.svg",
        url: "/daily-rental",
        text: "searchByMap",
    },
];
const headerBtns2 = {
    image: "/assets/home/add.svg",
    url: "/daily-rental/add-estate/step1",
    text: "addEstate",
};
const sidebarLink = [
    {
        image: "/assets/sidebar/heart.svg",
        url: "/home/favourite",
        label: "favourite",
    },

    {
        image: "/assets/sidebar/notification.svg",
        url: "/home/notification",
        label: "notifications",
    },
];
</script>

<template>
    <header class="header flex items-center w-full h-20 px-8 justify-between">
        <div class="flex items-center gap-10">
            <button @click="sidebarShow = !sidebarShow">
                <img class="w-16" src="/assets/home/header-btn.svg" alt="" />
            </button>

            <HeaderBtn
                :image="
                    route.path == '/daily-rental'
                        ? headerBtns[0].image
                        : headerBtns[1].image
                "
                :text="
                    route.path == '/daily-rental'
                        ? headerBtns[0].text
                        : headerBtns[1].text
                "
                :url="
                    route.path == '/daily-rental'
                        ? headerBtns[0].url
                        : headerBtns[1].url
                "
            />
            <HeaderBtn
                :image="headerBtns2.image"
                :text="headerBtns2.text"
                :url="headerBtns2.url"
            />
        </div>
        <div class="flex items-center gap-10">
            <router-link class="text-accent text-xl" to="/landingPage">
                {{ t("General estates section") }}</router-link
            >
        </div>
    </header>
    <Transition name="slide-fade">
        <sidebar
            @close="sidebarShow = false"
            v-show="sidebarShow"
            :sidebarLink="sidebarLink"
        />
    </Transition>
    <router-view />
</template>

<style scoped>
.header {
    background-color: #444444f1;
    backdrop-filter: opacity(1%);
    position: relative;
    z-index: 1000;
}
</style>
