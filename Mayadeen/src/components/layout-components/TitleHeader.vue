<script setup>
import { useRoute } from "vue-router";
import Button from "../general-components/Button.vue";
import HeaderLogo from "./HeaderLogo.vue";
import { ref } from "vue";
import { onBeforeMount } from "vue";
const props = defineProps({
    logoCenter: Boolean,
});
var active = ref(false);
onBeforeMount(() => {
    active.value = !route.meta.title ? true : false;
});

const route = useRoute();
</script>

<template>
    <header
        class="flex shadow-lg bg-secondary items-center w-full py-4 px-8"
        :class="logoCenter ? ' justify-center' : ' justify-between'"
    >
        <HeaderLogo />
        <!-- class="col-span-3 flex justify-center" -->
        <div v-if="active" id="header-title"></div>
        <h2
            v-else-if="!logoCenter"
            class="text-xl xl:text-2xl flex justify-center text-accent"
            id="h2-in-header"
        >
            <slot />
        </h2>

        <div id="header-action" class="flex justify-end"></div>
    </header>
</template>
<style>
#header-action {
    inset-inline-start: 0px;
    width: 60px;
    overflow: visible;
    white-space: nowrap;
}
</style>
