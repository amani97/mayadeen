<script setup>
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const props = defineProps({
    image: String,
    price: Number,
    space: Number,
    type: String,
    location: String,
    pricePer: String,
    date: String,
});
</script>

<template>
    <article class="card-container shadow-xl">
        <div class="description-side">
            <div class="flex justify-between items-center">
                <p class="text-lg">{{ type }}</p>
                <article class="flex gap-2 items-center text-md">
                    <Icon
                        width="20"
                        class="text-primary"
                        icon="ant-design:reload-time-outline"
                    />
                    <p>{{ date }}</p>
                </article>
            </div>
            <article class="flex gap-2 items-center text-md">
                <Icon width="30" class="" icon="majesticons:map-marker" />
                <p>{{ location }}</p>
            </article>
            <div class="flex gap-10">
                <p class="text-primary text-xl italic">
                    {{ price }} {{ t("Real") }} / {{ pricePer }}
                </p>
                <p>{{ space }} {{ t("m") }}</p>
            </div>
        </div>
        <div class="image-side">
            <img :src="image" alt="" />
        </div>
    </article>
</template>

<style>
.card-container {
    height: 200px;
    border-radius: 10px;
    padding: 10px;
    display: flex;
    justify-content: space-between;

    background-color: white;
}
.card-container .description-side {
    padding-inline: 30px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 80%;
}
.card-container .image-side {
    width: 20%;
}
.card-container .image-side img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}
</style>
