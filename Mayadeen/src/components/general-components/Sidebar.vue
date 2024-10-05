<script setup>
import { useI18n } from "vue-i18n";
import LinkInSidebar from "./LinkInSidebar.vue";
import { Icon } from "@iconify/vue";
import { useRouter, useRoute } from "vue-router";
import { useProfileStore } from "@/modules/home/pages/profile-view/store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
const store = useProfileStore();
const { userData } = storeToRefs(store);
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
onMounted(() => {
    store.getProfile();
});
const props = defineProps({
    sidebarLink: Array,
});
const emit = defineEmits(["close"]);
function removeToken() {
    sessionStorage.removeItem("token");
}
</script>
<template>
    <div @click.self="emit('close')" class="sidebar-container">
        <div class="sidebar background-image p-6" id="sideAnimation">
            <router-link
                class="absolute end-5"
                to="/auth/login"
                @click="removeToken()"
            >
                <Icon
                    icon="solar:logout-2-bold"
                    width="40"
                    class="text-secondary"
            /></router-link>
            <router-link
                :to="
                    route.path.split('/')[1] == 'daily-rental'
                        ? '/daily-rental/daily-profile'
                        : '/h/profile-view'
                "
                ><img
                    @click="emit('close')"
                    class="m-2 w-32"
                    src="/assets/sidebar/profile-user.svg"
                    alt=""
                />
            </router-link>

            <p class="text-2xl mb-10">{{ userData.user_name }}</p>

            <div class="w-80" v-for="(link, index) in props.sidebarLink">
                <LinkInSidebar
                    :key="index"
                    :image="link.image"
                    :label="link.label"
                    :url="link.url"
                />
                <hr
                    class="my-1"
                    v-if="
                        index != props.sidebarLink.length - 1 ||
                        (index != props.sidebarLink.length && index == 1)
                    "
                />
            </div>
            <a href="#" class="contact-us">{{ t("contactUs") }}</a>
        </div>
    </div>
</template>
<style scoped>
.contact-us {
    @apply text-xl mt-10;
    position: absolute;
    bottom: 30px;
}
hr {
    height: 1px;
    border: none;
    background-color: #44444452;
}
.sidebar-container {
    background-color: rgba(0, 0, 0, 0.418);
    width: 100vw;
    height: 100vh;
    z-index: 1001;
    position: fixed;
    top: 0px;
}
.sidebar {
    position: absolute;
    z-index: 1002;
    inset-inline-start: 0px;
    inset-block-start: 0px;
    width: 350px;
    height: 100vh;
    background-color: #eeeff4;
    display: flex;
    align-items: center;
    flex-direction: column;
    transition: all 1s;
    -webkit-transition: all 1s;
    background-size: 100%;
}
</style>
