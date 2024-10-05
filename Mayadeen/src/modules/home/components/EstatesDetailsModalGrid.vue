<script setup>
import { useI18n } from "vue-i18n";
const props = defineProps({
    data: Object,
});
const { t } = useI18n();
const gridContain = [
    { label: t("theAgeOfTheProperty"), key: "age", suffix: t("year") },
    { label: t("landArea"), key: "space_of_land", suffix: t("m") },
    { label: t("propertyArea"), key: "space_of_place", suffix: t("m") },
    { label: t("front"), key: "the_front" },
    {
        label: t("streetType"),
        key: "kind_of_street",
        formatter: (val) => t(val),
    },
    { label: t("numberOfFloors"), key: "number_of_floors" },
    { label: t("floor"), key: "floor_number" },
    { label: t("rooms"), key: "num_of_rooms" },
    { label: t("lounges"), key: "num_of_big_rooms" },
    { label: t("WC"), key: "num_of_wc" },
    {
        label: t("estateAreaServices"),
        key: "services",
        formatter: (val) => val.map((el) => el.name).join(" , "),
    },
    {
        label: t("extras"),
        key: "new_ads",
        formatter: (val) => val.map((el) => el.name).join(" , "),
    },
    { label: t("advertiserName"), key: "user_name" },
    { label: t("advertiserNumber"), key: "user_number" },
];
</script>

<template>
    <article class="grid grid-cols-2 gap-x-10 gap-y-10">
        <template v-for="item in gridContain">
            <div
                :key="item.key"
                class="grid grid-cols-2 w-[70%]"
                v-if="
                    (data[item.key] && !Array.isArray(data[item.key])) ||
                    (Array.isArray(data[item.key]) && data[item.key].length > 0)
                "
            >
                <label>{{ item.label }} :</label>
                <p>
                    {{
                        item.formatter
                            ? item.formatter(data[item.key])
                            : data[item.key]
                    }}
                    {{ item.suffix }}
                </p>
            </div>
        </template>
    </article>
</template>
