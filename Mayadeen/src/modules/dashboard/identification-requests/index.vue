<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
import VerificationRequestCard from "../components/VerificationRequestCard.vue";
import HeaderRoutes from "../components/HeaderRoutes.vue";
import VerificationDetails from "../components/VerificationDetails.vue";
const { t } = useI18n();
const openDetails = ref(false);
const active = ref(0);
const route = ["identificationRequests", "officVerificationRequests"];
</script>
<template>
    <div>
        <HeaderRoutes
            :route="route"
            @routeSelect="
                active = $event;
                openDetails = false;
            "
        />
        <div class="p-10" v-if="openDetails == false">
            <VerificationRequestCard
                @click="openDetails = true"
                text1="رقم الهوية"
                text2="اسم المستخدم"
                v-if="active == 0"
            />
            <VerificationRequestCard
                @click="openDetails = true"
                text1="رقم الترخيص"
                text2="رقم الهوية "
                v-else
            />
        </div>
        <VerificationDetails v-if="openDetails && active == 0" />
        <VerificationDetails
            :isOffice="true"
            v-if="openDetails && active == 1"
        />
    </div>
</template>
<style scoped></style>
