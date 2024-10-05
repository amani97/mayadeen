<script setup>
import { ref, useAttrs, watch } from "vue";
import FormInput from "../form-components/forminput.vue";
import { watchDebounced } from "@vueuse/core";
import { Icon } from "@iconify/vue";
const attrs = useAttrs();
const searchText = ref("");
const emit = defineEmits(["search"]);
watchDebounced(
    searchText,
    (val) => {
        if (val.length > 0) emit("search", val);
        else emit("search", null);
    },
    { debounce: 500, maxWait: 1000 }
);
</script>

<template>
    <div class="flex items-center gap-4 search-field">
        <FormInput v-model="searchText" v-bind="attrs" />
        <Icon
            v-if="searchText.length > 0"
            @click="searchText = ''"
            class="text-4xl cursor-pointer hover:opacity-80 text-secondary"
            icon="material-symbols:search-off"
        />
    </div>
</template>

<style>
.search-field input {
    margin-top: 0px !important;
}
.search-field .text-input {
    margin-bottom: 0px !important;
}
</style>
