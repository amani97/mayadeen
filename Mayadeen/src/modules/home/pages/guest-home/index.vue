<script setup>
import Button from "@/components/general-components/Button.vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const first = [
    {
        id: 1,
        text: "Lorem ipsum dolor sit amet, consecteturlor sit amet, consectetur adipiscing  sed do eiusmod tempor incididunt ut t amet, consectetur adipiscing  sed do eiusmod tempor incididunt ut t amet, consectetur adipiscing  sed do eiusmod tempor incididunt ut labore et dolore magna aliiqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor reprehenderit  voluptate velit esse cillum dolore eu fugiat nulla pariaturExcepteur",
    },
];
const second = [
    {
        id: 1,
        text: "Lorem ipsum dolor sit amet, consec sit amet, consecteturloconsecteturlor sit amet, consectetur adipiscing  sed do eisum dolor sit amet, consecteturlor sit amet, consectetur adipiscing  sed do eiusmod tempor incididunt ut t amet, consectetur adipiscing  sed do eiusmod tempor incididunt ut t amet, consectetur adipiscing  sed do eiusmod tempor incididunt ut labore et dolore magna aliiqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor reprehenderit  voluptate velit esse cillum dolore eu fugiat nulla pariaturExcepteur",
    },
];
</script>

<template>
    <div class="containerr w-full">
        <Teleport to="#header-action">
            <div class="flex gap-3 items-center">
                <RouterLink :to="{ name: 'login' }">
                    <Button
                        class="text-md h-12 px-7 flex justify-center items-center"
                        color="primary"
                        >{{ t("login") }}</Button
                    >
                </RouterLink>
                <!-- TODO :  guest button  (401) -->

                <!-- <RouterLink :to="{ name: 'landingPage' }"
                    ><Button
                        class="h-12 px-7 flex justify-center items-center"
                        color="accent"
                        >{{ t("loiginAsGuest") }}</Button
                    ></RouterLink
                > -->
                <RouterLink :to="{ name: 'register' }"
                    ><Button
                        class="h-12 px-7 flex justify-center items-center"
                        color="accent"
                        >{{ t("register") }}</Button
                    ></RouterLink
                >
            </div>
        </Teleport>

        <div class="section pb-7" v-for="l in first" :key="l.id">
            <div
                class="first w-full flex justify-center text-end gap-6 text-xl items-center pe-6"
            >
                <div class="relative min-w-[500px]">
                    <img
                        class="img min-h-[200px]"
                        src="/assets/home/home-logo.svg"
                        alt=""
                    />
                    <h4 class="text-primary text-4xl absolute top-24 right-40">
                        LOGO
                    </h4>
                </div>
                <div class="text-1xl">{{ l.text }}</div>
            </div>
        </div>

        <div class="second" v-for="l in second" :key="l.id">
            <div class="text-3xl text-end pe-11 pt-10">
                <p>{{ t("title") }}</p>
            </div>
            <div
                class="py-4 w-full flex justify-center text-end gap-6 text-xl items-center p-6"
            >
                <div class="logo min-w-[350px] min-h-[200px] bg-primary"></div>
                <div class="text-1xl">{{ l.text }}</div>
            </div>
        </div>
    </div>
</template>

<style>
.first {
    background-color: #eeeff4;
}

.second {
    background-color: #eeeff4;
    background-image: url("/assets/home/background.svg");
    background-size: 25%;
}

.logo {
    background: linear-gradient(to bottom, #eaebf0, #77787a);
    display: flex;
    justify-content: center;
    align-items: center;
}
[dir="ltr"] .img {
    transform: rotateY(180deg);
}
</style>
