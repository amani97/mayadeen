<script setup>
import { useI18n } from "vue-i18n";
import LinkInSidebarControlPanel from "./LinkInSidebarControlPanel.vue";
import { Icon } from "@iconify/vue";
import { useRouter, useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const props = defineProps({
    sidebarLink: Array,
});
onMounted(() => {
    localStorage.setItem("activeRoute", 0);
});
const emit = defineEmits(["close"]);
function removeToken() {
    localStorage.removeItem("token");
}
</script>
<template>
    <div @click.self="emit('close')" class="sidebar-container">
        <div class="sidebar p-6" id="sideAnimation">
            <img v-if="false" class="m-2 w-32" src="" alt="Logo" />
            <p v-else class="text-xl font-bold my-12 text-primary">logo</p>

            <div
                class="w-full sidebar-links"
                v-for="(link, index) in sidebarLink"
            >
                <LinkInSidebarControlPanel
                    class=""
                    :key="index"
                    :icon="link.icon"
                    :label="link.label"
                    :url="link.url"
                />
            </div>
        </div>
    </div>
</template>
<style>
.sidebar-links .router-link-exact-active {
    border-bottom: 2px solid var(--primary);
    border-radius: 0px;
}

.contact-us {
    @apply text-xl mt-10;
    color: white;
    position: absolute;
    bottom: 30px;
}

hr {
    height: 1px;
    border: none;
    background-color: #44444452;
}

.sidebar-container {
    width: 300px;
    height: 100vh;
}

.sidebar {
    position: fixed;
    padding-inline: 10px;
    width: 300px;
    height: 100vh;
    background: rgb(112, 112, 112);
    background: linear-gradient(
        180deg,
        rgb(110, 110, 110) 0%,
        rgba(68, 68, 68, 1) 39%,
        rgba(14, 14, 14, 1) 100%
    );
    display: flex;
    align-items: center;
    flex-direction: column;
    transition: all 1s;
    -webkit-transition: all 1s;
    background-size: 100%;
}
</style>
