<script setup>
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import Button from "@/components/general-components/Button.vue";
import { useRouter } from "vue-router";
const router = useRouter();
const { t } = useI18n();
const notifications = [
    {
        id: 0,
        image: "subway:cercle-8",
        text: "newAlertMessage",
    },
    {
        id: 0,
        image: "subway:cercle-8",
        text: "newAlertMessage",
    },
    {
        id: 0,
        image: "subway:cercle-8",
        text: "newAlertMessage",
    },
    {
        id: 0,
        image: "subway:cercle-8",
        text: "newAlertMessage",
    },
    {
        id: 0,
        image: "subway:cercle-8",
        text: "newAlertMessage",
    },
    {
        id: 0,
        image: "subway:cercle-8",
        text: "newAlertMessage",
    },
    {
        id: 0,
        image: "subway:cercle-8",
        text: "newAlertMessage",
    },
    {
        id: 0,
        image: "subway:cercle-8",
        text: "newAlertMessage",
    },
    {
        id: 0,
        image: "subway:cercle-8",
        text: "newAlertMessage",
    },
];
</script>
<template>
    <div class="background-image p-5">
        <div class="flex gap-4 items-center m-6 mt-0 pt-6">
            <img
                class="w-8"
                src="/assets/sidebar/notification.svg"
                alt="icon"
            />
            <h3 class="header-style">{{ t("notifications") }}</h3>
        </div>
        <Teleport to="#header-action">
            <Button class="px-8 py-[8px]" @click="router.go(-1)">{{
                t("return")
            }}</Button>
        </Teleport>
        <div class="notifications-style">
            <div
                v-for="notification in notifications"
                class="flex items-center gap-4 m-6"
            >
                <Icon :icon="notification.image" width="20" color="red" />
                <p class="text-xl">{{ t(notification.text) }}</p>
            </div>
        </div>
    </div>
</template>
<style scoped>
.background-image {
    height: 90vh;
}
.notifications-style {
    height: 80%;
    overflow: auto;
}
</style>
