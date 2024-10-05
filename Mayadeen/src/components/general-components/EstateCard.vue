<script setup>
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import { computed } from "vue";
const { t } = useI18n();
const props = defineProps({
    image: String,
    price: Number,
    space: Number,
    management: String,
    description: String,
    name: String,
    date: String,
    isSaved: Boolean,
    isFavorite: Boolean,
    isManagement: Boolean,
    isImage: { type: Boolean, default: true },
    url: { type: String, default: "#" },
});
</script>

<template>
    <div
        :class="
            isImage
                ? 'grid-cols-3 lg:grid-cols-4'
                : 'grid-cols-2 lg:grid-cols-3'
        "
        class="estate-card-container grid justify-between drop-shadow-lg bg-accent rounded-md overflow-auto max-h-[352px]"
    >
        <div class="p-5 col-span-2 lg:col-span-3 flex flex-col gap-y-20">
            <div class="first-section flex justify-between relative text-lg">
                <div class="text-primary">{{ price }} {{ t("Real") }}</div>
                <div class="absolute right-40">{{ space }} {{ t("m") }}</div>
                <div class="flex justify-between gap-5">
                    <router-link v-if="!isManagement" class="" :to="url">
                        {{ management ? management : t("management") }}
                    </router-link>
                    <Icon
                        v-if="isFavorite"
                        class="text-error"
                        height="30"
                        icon="mdi:heart"
                    ></Icon>
                </div>
            </div>
            <p class="truncate w-11/12">{{ description }}</p>
            <div class="last-section flex justify-between">
                <div class="text-lg">{{ name }}</div>
                <div class="relative" v-if="date">
                    <div class="mr-9 text-sm">
                        {{ date }}
                    </div>
                    <Icon
                        class="text-primary absolute top-0 right-0"
                        height="25"
                        icon="ant-design:reload-time-outline"
                    >
                    </Icon>
                </div>
            </div>
        </div>
        <div
            class="img image-container left flex relative my-3 mx-3 min-h-[200px] max-h-[260px] justify-between"
            v-if="isImage"
        >
            <img class="w-full" :src="image" alt="" />
            <Icon
                v-if="isSaved"
                class="-top-4 absolute -left-3 text-primary"
                icon="fontisto:favorite"
                width="45"
                height="57"
            />
        </div>
    </div>
</template>

<style>
.image-container img {
    background-color: rgba(128, 128, 128, 0.61);
    border: 1px solid rgba(128, 128, 128, 0.61);
}
.estate-card-container {
    background-color: #ffffff;
}

.favorite {
    display: none;
}

.truncate-container {
    text-overflow: ellipsis;
    height: 25px;
    overflow: hidden;
}
</style>
