<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import EstateCard from "@/components/general-components/EstateCard.vue";
import HeaderRoutes from "../components/HeaderRoutes.vue";
const { t } = useI18n();
const active = ref(0);
const route = ["realEstateOrdersAccepted", "realEstateOrdersUnAccepted"];
</script>
<template>
    <div>
        <HeaderRoutes :route="route" @routeSelect="active = $event" />
        <div class="p-10">
            <EstateCard
                v-if="active == 0"
                image="String"
                price="Number"
                space="Number"
                description="String"
                name="String"
                date="String"
                url="requests/1"
            />
            <EstateCard
                v-else
                image="String"
                price="Number"
                space="1222"
                description="String"
                name="String"
                date="String"
                :isManagement="true"
            />
        </div>
    </div>
</template>
<style scoped></style>
