<script setup>
import { useI18n } from "vue-i18n";
import EstateCard from "@/components/general-components/EstateCard.vue";
import Button from "@/components/general-components/Button.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, reactive, computed } from "vue";
import { useOrdersStore } from "../add-order/store";
import { storeToRefs } from "pinia";

import { toRaw } from "vue";
import Loading from "@/components/general-components/Loading.vue";
import { ref } from "vue";
const route = useRoute(),
    router = useRouter();
const store = useOrdersStore();

const { t } = useI18n();
//const {loading,section,cities,kinds,SimilarOrders} = storeToRefs(store);
onMounted(() => {
    //console.log(SimilarOrders);
});
</script>
<template>
    <div class="base">
        <Teleport to="#header-action">
            <Button class="px-8 py-[8px]" @click="router.go(-1)">{{
                t("return")
            }}</Button>
        </Teleport>
        <div class="flex justify-center items-center">
            <div class="background-color-gray rounded-md w-96 h-20"></div>
        </div>

        <div class="container m-auto">
            <h1 class="pb-10 text-xl">
                {{ t("Properties similar to your request") }} :
            </h1>
            <div
                class="pb-10"
                v-for="item in store.SimilarOrders.date"
                :key="item.id"
            >
                <EstateCard
                    :image="item.image"
                    :price="item.price"
                    :space="item.space_of_place"
                    :management="item.management"
                    :description="item.description"
                    :name="item.the_front"
                    :date="item.date"
                    isManagement
                />
            </div>
        </div>
    </div>
</template>
