<script setup>
import { useI18n } from "vue-i18n";
import Button from "@/components/general-components/Button.vue";
import AddAd from "@/components/general-components/AddAd.vue";
import { Icon } from "@iconify/vue";
import { useRouter, useRoute } from "vue-router";
import { onMounted } from "vue";

const router = useRouter(),
    route = useRoute();
const { t } = useI18n();

var buttons = [
    {
        id: 0,
        icon: "/assets/home/seller.svg",
        text: "owner",
        style: "btn1-style",
        params: "owner",
    },
    {
        id: 1,
        icon: "/assets/home/ladder.svg",
        text: "realEstateOffice",
        style: "btn2-style",
        params: "office",
    },
    {
        id: 2,
        icon: "/assets/home/digital-marketing.svg",
        text: "mediator",
        style: "btn3-style",
        params: "mediator",
    },
];
</script>

<template>
    <div class="background-image px-12 py-2">
        <Teleport
            v-if="route.path.split('/')[1] != 'dashboard'"
            to="#header-action"
        >
            <Button
                class="px-8 py-[8px]"
                @click="router.push('/landingPage')"
                >{{ t("homePage") }}</Button
            >
        </Teleport>

        <div class="flex gap-4 items-center py-10">
            <add-ad></add-ad>
        </div>
        <div class="flex justify-center">
            <h1
                class="xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-secondary mb-8"
            >
                {{ t("chooseTheTypeOfMembership") }}
            </h1>
        </div>
        <div
            class="grid xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:py-28 grid-cols-3 md:gap-36 xs:gap-16"
        >
            <button
                class="button xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold flex flex-col justify-center items-center"
                :class="item.style"
                v-for="item in buttons"
                :key="item.id"
                @click="
                    router.push({
                        path:
                            route.path.split('/')[1] == 'dashboard'
                                ? '/dashboard/ad-info/' + item.params + '/5'
                                : '/home/ad-info/' + item.params + '/5',
                    })
                "
            >
                <img :src="item.icon" :class="item.style" class="mb-5" />
                {{ t(item.text) }}
            </button>
        </div>
    </div>
</template>
<style scoped>
.background-image {
    height: 90vh;
}

.button {
    background-color: var(--secondary);
    /* width: 20%;*/
    height: 200px;
    border-radius: 10px;
    -webkit-box-shadow: 0px 0px 13px -2px rgba(68, 68, 68, 0.34);
    -moz-box-shadow: 0px 0px 13px -2px rgba(68, 68, 68, 0.34);
    box-shadow: 0px 0px 13px -2px rgba(68, 68, 68, 0.34);
    transition: all 0.3s;
}

.button img {
    width: 60px;
}

.btn1-style {
    background-color: var(--secondary);
    color: white;
}

.btn2-style {
    background-color: white;
    color: var(--secondary);
}

.btn3-style {
    background-color: #cdd0db;
    color: var(--secondary);
}

.button:hover {
    opacity: 0.9;
}

@media (max-width: 480px) {
    .button {
        height: 130px;
    }
    .button img {
        width: 40px;
    }
}
</style>
