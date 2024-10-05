<script setup>
import { useI18n } from "vue-i18n";
import orderCard from "../../components/orderCard.vue"
import Button from "@/components/general-components/Button.vue";
import { useRouter } from "vue-router";
import Loading from "@/components/general-components/Loading.vue";
import { useProfileStore } from "../profile-view/store";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";
const store = useProfileStore();
onMounted(() => {
    store.getProfile();
    
});
const { orderData, loading } = storeToRefs(store);


const router = useRouter();
const { t } = useI18n();

</script>
<template>
    <Loading v-if="loading" />
    <div class="background-image px-24 py-10" :class="loading ? 'page-loading' : ''">
        <Teleport to="#header-action">
            <Button class="lg:px-8 lg:py-[8px] md:px-5 md:py-[5px] py-[4px] px-4" @click="router.go(-1)">{{
                t("return")
            }}</Button>
        </Teleport>
    
    <div  class="container ">
        <orderCard class="mb-10" v-for=" order in orderData"  :real_estate_section=order.real_estate_section :real_estate_kind=order.real_estate_kind :price=order.price city="city" date="منذ يوم" :key="order.id"> </orderCard>
    </div>
    </div>
</template>
<style scoped>
.background-image {
    min-height: 90vh;
}
</style>
