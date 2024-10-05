<script setup>
import Button from "../general-components/Button.vue";
import { ref } from "vue";
import Sidebar from "@/components/general-components/Sidebar.vue";
import HeaderBtn from "../../modules/home/components/HeaderBtn.vue";
import { useI18n } from "vue-i18n";
import { useMyRealEstateStore } from "../../modules/home/pages/my-estate-details/store";
import { useRoute, useRouter } from "vue-router";
import { sidebarLink } from "../../modules/home/navigation-links";

const route = useRoute();
const router = useRouter();
const myRealEstateStore = useMyRealEstateStore();
function deleteRealEstate() {
    myRealEstateStore.removeRealEstate(route.params.id).then(() => {
        router.push("/home/my-ad");
    });
}
const props = defineProps({
    logoCenter: Boolean,
    isUserEstate: Boolean,
});
var sidebarShow = ref(false);
const { t } = useI18n();
</script>

<template>
    <header
        class="shadow-lg bg-secondary items-center flex justify-between w-full py-4 px-8"
    >
        <div class="flex items-center gap-8">
            <button @click="sidebarShow = !sidebarShow">
                <img class="w-16" src="/assets/home/header-btn.svg" alt="" />
            </button>

            <HeaderBtn
                image="/assets/home/serch.svg"
                url="/landingPage"
                text="backToHome"
            />
        </div>
        <div v-if="isUserEstate" class="flex items-center gap-4">
            <Button
                color="primary"
                class="px-6 py-[8px]"
                @click="deleteRealEstate()"
                >{{ t("delete") }}</Button
            >
            <Button
                color="primary"
                class="px-6 py-[8px]"
                @click="router.push('/home/update/' + route.params.id + '/1')"
                >{{ t("edit") }}</Button
            >
            <Button
                color="primary"
                class="px-6 py-[8px]"
                @click="myRealEstateStore.RefreshRealEstate(route.params.id)"
                >{{ t("update") }}</Button
            >
        </div>
    </header>

    <Transition name="slide-fade">
        <Sidebar
            :sidebarLink="sidebarLink"
            @close="sidebarShow = false"
            v-show="sidebarShow"
        />
    </Transition>
</template>
