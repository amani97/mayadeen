<script setup>
import ControlepanelSidebar from "@/components/general-components/ControlepanelSidebar.vue";

import { ref } from "vue";
const sidebarLink = [
    {
        icon: "ic:sharp-home",
        url: "/controlpanel",
        label: "home",
    },
    {
        icon: "fa6-solid:plus",
        url: "/dashboard/add-ad",
        label: "addRealEstate",
    },
    {
        icon: "mdi:home-time",
        url: "/controlpanel/requests",
        label: "realEstateOrder",
    },
    {
        icon: "bxs:user-detail",
        url: "/controlpanel/userRequests",
        label: "userRequests",
    },
    {
        icon: "ci:wavy-check",
        url: "/controlpanel/identificationRequests",
        label: "identificationRequests",
    },

    {
        icon: "game-icons:wallet",
        url: "/controlpanel/",
        label: "verifiedOffers",
    },
    {
        icon: "basil:document-solid",
        url: "/controlpanel",
        label: "subscriptions",
    },
    {
        icon: "basil:document-solid",
        url: "/controlpanel",
        label: "offersAndDiscounts",
    },
    {
        icon: "bxs:user-detail",
        url: "/controlpanel/privacyPolicy",
        label: "privacyPolicyRoute",
    },
];
</script>
<template>
    <div class="flex">
        <div>
            <Transition name="slide-fade">
                <ControlepanelSidebar
                    @close="sidebarShow = false"
                    v-show="true"
                    :sidebarLink="sidebarLink"
                />
            </Transition>
        </div>
        <div class="w-full page-contanier">
            <router-view />
        </div>
    </div>
</template>
<style></style>
