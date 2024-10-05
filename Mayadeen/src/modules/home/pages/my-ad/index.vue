<script setup>
import { useI18n } from "vue-i18n";
import EstateCard from "@/components/general-components/EstateCard.vue";
import Loading from "@/components/general-components/Loading.vue";
import Button from "@/components/general-components/Button.vue";
import { useRouter } from "vue-router";
import { useProfileStore } from "../profile-view/store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

const store = useProfileStore();
onMounted(() => {
    store.getProfile();
});
const { userData, loading } = storeToRefs(store);
const router = useRouter();
const { t } = useI18n();
</script>
<template>
    <Loading v-if="loading" />
    <div
        class="px-16 py-10 background-image"
        :class="loading ? 'page-loading' : ''"
    >
        <Teleport to="#header-action">
            <Button
                class="px-8 py-[8px]"
                @click="router.push('/h/profile-view')"
                >{{ t("return") }}</Button
            >
        </Teleport>

        <div
            class="pb-10 px-24"
            v-for="item in userData.real_estate_data"
            v-if="
                userData.real_estate_data
                    ? userData.real_estate_data.length == 0
                        ? false
                        : userData.real_estate_data
                    : ''
            "
        >
            <EstateCard
                class="card"
                @click="
                    router.push('/my-estate-details/' + item.real_estate_id)
                "
                :image="
                    item.real_estate_images
                        ? item.real_estate_images.length > 0
                            ? item.real_estate_images[0].image
                            : ''
                        : ''
                "
                :price="item.price"
                :space="item.space"
                management="ادارة الاعلان"
                :description="item.description"
                :name="userData.user_name"
                :date="item.created_at"
            />
        </div>
        <div
            v-else
            :class="loading ? 'page-loading' : ''"
            class="flex justify-center items-center text-2xl text-secondary h-full"
        >
            {{ t("noData") }}
        </div>
    </div>
</template>
<style>
.background-image {
    min-height: 90vh;
}

.card {
    cursor: pointer;
}
</style>
