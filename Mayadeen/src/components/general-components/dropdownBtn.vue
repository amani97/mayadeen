<script setup>
import { useI18n } from "vue-i18n";
import { Icon } from "@iconify/vue";
import { useRealEstateStore } from "../../modules/home/pages/realEstateStore.js";
import { useListSearchStore } from "../../modules/home/pages/list-search/store";
import { storeToRefs } from "pinia";
import { useRoute, useRouter } from "vue-router";
import { ref } from "vue";
const route = useRoute();
const router = useRouter();
const store = useRealEstateStore();
const listStore = useListSearchStore();
const { t } = useI18n();
const { activeFilter, saleOrRent } = storeToRefs(store);
const { params, isLocalFilter } = storeToRefs(listStore);
const active = ref(null);
const props = defineProps({
    options: Array,
    text: String,
});
function filter(id) {
    if (route.path == "/list-search") {
        if (props.text == "forSale") {
            params.value.section_id = id;
            params.value.kind_id = 1;
            isLocalFilter.value = false;
            listStore.getRealEstate(params.value);
        } else {
            params.value.section_id = id;
            params.value.kind_id = 2;
            listStore.getRealEstate(params.value);
        }
    } else store.getRealEstateWithFilter();
}
</script>
<template>
    <div class="dropdown">
        <button
            class="dropbtn text-accent flex gap-1 justify-center items-center text-accent text-xl pb-2"
        >
            {{ t(text) }}
            <Icon icon="mdi:chevron-down" color="white" height="30"></Icon>
        </button>

        <div id="myDropdown" class="dropdown-content">
            <p
                v-for="(option, index) in props.options"
                :key="index"
                :id="option.id"
                class="option"
                @click="
                    active = index;
                    activeFilter = option.name;
                    text == 'forSale'
                        ? (saleOrRent = 'forSale')
                        : (saleOrRent = 'forRent');
                    filter(option.id);
                "
            >
                {{ t(option.name) }}
            </p>
        </div>
    </div>
</template>
<style>
.dropbtn {
    cursor: pointer;
}
.dropdown:hover #myDropdown {
    visibility: visible;
}
.dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-content {
    visibility: hidden;
    overflow: auto;
    height: 75vh;
    position: absolute;
    background-color: #f1f1f1;
    min-width: 200px;
    box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
    z-index: 1;
}
.option:hover {
    background-color: #fbb52e;
    color: white;
}
.dropdown-content p {
    cursor: pointer;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
}
</style>
