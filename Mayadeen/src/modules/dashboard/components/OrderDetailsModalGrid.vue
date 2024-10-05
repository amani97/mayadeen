<script setup>
import { useI18n } from "vue-i18n";
const props = defineProps({
    data: Object,
});
const { t } = useI18n();
const gridContain = [
    // { label: t("streetWidth"), text: props.data.space_of_place },
    { label: t("space"), text: props.data.space_of_place + " " + t("m") },
    // { label: t("lengths"), text: "13.8 طول - 13.8 عرض" },
    // { label: t("singleOrFamilies"), text: "5 م" },
    { label: t("rooms"), text: props.data.num_of_rooms },
    { label: t("lounges"), text: props.data.num_of_big_rooms },
    { label: t("WC"), text: props.data.num_of_wc },
    { label: t("floor"), text: props.data.floor_number },
    { label: t("advertiserName"), text: props.data.user_name },
    // { label: t("advertiserNumber"), text: props.data.user.phone }
];
</script>

<template>
    <article class="grid grid-cols-2 gap-x-10 gap-y-10">
        <div v-for="item in gridContain" class="grid grid-cols-2 w-[70%]">
            <label>{{ item.label }} :</label>
            <p>{{ item.text }}</p>
        </div>
    </article>
</template>
