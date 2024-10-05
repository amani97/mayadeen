<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
</script>

<template>
    <div class="full background-image flex justify-center gap-44 items-center">
        <router-link :to="{ name: 'landingPage' }">
            <div
                class="public w-[300px] h-[200px] rounded-lg flex text-center items-center justify-center text-accent text-4xl"
            >
                {{ t("General estates section") }}
            </div>
        </router-link>
        <router-link to="/daily-rental">
            <div
                class="day w-[300px] h-[200px] rounded-lg flex text-center items-center justify-center text-accent text-4xl"
            >
                {{ t("Daily rental section") }}
            </div>
        </router-link>
    </div>
</template>
<style>
.public {
    background: linear-gradient(to bottom, #f6b22d, #7e5b17);
}

.day {
    background: linear-gradient(to bottom, #1229bc, #091661);
}

.full {
    height: 90vh;
}
</style>
