<script setup>
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
const { t } = useI18n();

</script>

<template>
      <div class="flex gap-4 items-center py-10">
            <Icon icon="mdi:add-location" class="text-primary" width="34" />
            <h3 class=" xs:text-sm header-style sm:text-base md:text-lg lg:text-xl xl:text-2xl">
                {{ t("addYourAD") }}
            </h3>
        </div>
</template>

<style>
</style>