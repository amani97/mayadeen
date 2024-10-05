<script setup>
import EstateCard from "@/components/general-components/EstateCard.vue";
import Button from "@/components/general-components/Button.vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useCustomSearchStore } from "../custom-search/store";
import { storeToRefs } from "pinia";
import dayjs from "dayjs";
const store = useCustomSearchStore();
const { responseData } = storeToRefs(store);
const router = useRouter();
const { t } = useI18n();
</script>
<template>
    <div class="p-10 background-image">
        <Teleport to="#header-action">
            <div class="flex gap-4">
                <Button
                    color="primary"
                    @click="router.push('/home/custom-search')"
                    class="text-md h-12 px-7 flex justify-center items-center"
                    >{{ t("searchAgain") }}</Button
                >
                <Button @click="router.go(-1)" class="px-8 py-[8px]">{{
                    t("return")
                }}</Button>
            </div>
        </Teleport>
        <div class="pb-10 px-24" v-for="item in responseData">
            <EstateCard
                class="card"
                @click="router.push('/estate-details/' + item.id)"
                :image="item.images ? item.images : null"
                :price="item.price"
                :space="item.space_of_place"
                :management="item.advertise"
                :description="item.description"
                :name="item.user_id"
                :date="dayjs(item.created_at).fromNow()"
                isFavourite
            />
        </div>
    </div>
</template>
<style scoped>
.background-image {
    min-height: 90vh;
}
.card {
    cursor: pointer;
}
</style>
