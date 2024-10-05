<script setup>
import { useI18n } from "vue-i18n";
import SpecificOrder from "../components/SpecificOrder.vue";

const { t } = useI18n();
</script>

<template>
    <div class="p-10">
        <h1 class="text-2xl mb-10 text-secondary">
            {{ t("requestsFromUsersLookingForASpecificProperty") }}
        </h1>
        <div class="flex flex-col gap-10">
            <SpecificOrder v-for="i in 4" />
        </div>
    </div>
</template>
<style scoped></style>
