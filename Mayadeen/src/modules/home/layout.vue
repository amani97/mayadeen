<script setup>
import HeaderBtn from "@/components/general-components/HeaderBtn.vue";
import dropdownBtn from "@/components/general-components/dropdownBtn.vue";
import sidebar from "@/components/general-components/Sidebar.vue";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { useI18n } from "vue-i18n";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
import { useAdInfoStore } from "./pages/ad-info/store";
const adInfoStore = useAdInfoStore();
const { section } = storeToRefs(adInfoStore);
const { t } = useI18n();
const route = useRoute(),
    router = useRouter();
const toast = useToast();
import { sidebarLink } from "./navigation-links";
onMounted(() => {
    adInfoStore.getSection();
});
var arrayOfOptions = [
    { id: 0, url: "#", label: "فلل" },
    { id: 1, url: "#", label: "شقق" },
    { id: 2, url: "#", label: "شقق دوبليكس" },
    { id: 3, url: "#", label: "ادوار" },
    { id: 4, url: "#", label: "فيلا و شقق" },
    { id: 5, url: "#", label: "عماير" },
    { id: 6, url: "#", label: "اراضي مكاتب" },
    { id: 7, url: "#", label: "محلات" },
    { id: 8, url: "#", label: "غرف" },
    { id: 9, url: "#", label: "مستودعات" },
    { id: 10, url: "#", label: "ورش" },
    { id: 10, url: "#", label: "section" },
];
var sidebarShow = ref(false);
const headerBtns = [
    {
        image: "/assets/home/add.svg",
        url: "/home/add-order",
        text: "addOrder",
    },
    {
        image: "/assets/home/add.svg",
        url: localStorage.getItem("trusted") == "true" ? "/home/add-ad" : "",
        text: "addAD",
    },
];
const searchBtns = [
    {
        image: "/assets/home/serch.svg",
        url: "/list-search",
        text: "serchByList",
    },
    {
        image: "/assets/home/serch.svg",
        url: "/landingPage",
        text: "searchByMap",
    },
];

//
//    localStorage.getItem("trusted") == false ?  : null;
function trustedCheck(btn) {
    localStorage.getItem("trusted") == "false"
        ? toast.error(t("yourAccountMustBeVerified"))
        : null;
}
</script>

<template>
    <header class="header flex items-center w-full h-20 px-8 justify-between">
        <button @click="sidebarShow = !sidebarShow">
            <img class="w-16" src="/assets/home/header-btn.svg" alt="" />
        </button>
        <HeaderBtn
            :image="
                route.path == '/landingPage'
                    ? searchBtns[0].image
                    : searchBtns[1].image
            "
            :text="
                route.path == '/landingPage'
                    ? searchBtns[0].text
                    : searchBtns[1].text
            "
            :url="
                route.path == '/landingPage'
                    ? searchBtns[0].url
                    : searchBtns[1].url
            "
        />
        <HeaderBtn
            v-for="(btn, index) in headerBtns"
            :key="index"
            @click="index == 1 ? trustedCheck(btn) : null"
            :image="btn.image"
            :text="btn.text"
            :url="btn.url"
        />
        <HeaderBtn text="dailyRent" url="/daily-rental" :isIcon="false" />
        <dropdownBtn text="forSale" :options="section" />
        <dropdownBtn text="forRent" :options="section" />

        <button
            class="bg-primary px-6 py-2 rounded-md"
            @click="router.push('/home/custom-search')"
        >
            <Icon height="30" color="white" icon="ic:baseline-search" />
        </button>
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
