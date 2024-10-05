<script setup>
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);
const { t } = useI18n();
const props = defineProps({
    data: Object,
});
</script>

<template>
    <RouterLink
        :to="'/estate-details/' + data.real_estate_id"
        class="ShowOnMap-contanier"
    >
        <div class="start-popup">
            <div class="flex-col flex">
                <p class="text-xl text-secondary">
                    {{ data.advertise }}
                </p>
            </div>
            <p class="text-primary font-semibold text-xl">
                <span class="italic">{{ data.price }}</span> {{ t("Real") }}
            </p>
            <p>
                {{ data.real_estate_section }} , {{ data.real_estate_kind }} ,
                {{ data.location_text }}
                <span v-if="data.kind_of_street">
                    , {{ data.kind_of_street }}</span
                >
            </p>
            <p class="flex items-center gap-1">
                <Icon icon="icon-park:earth" width="20" />
                {{ data.virtual ? data.virtual : t("noVirtual") }}
            </p>
            <p>{{ data.katalog ? data.katalog : t("noCatalog") }}</p>
            <div class="flex justify-between items-center">
                <p>{{ data.user_name }}</p>
                <p v-if="data.created_at" class="flex items-center gap-1">
                    <Icon
                        icon="ant-design:reload-time-outline"
                        class="text-primary"
                        width="20"
                    />

                    {{
                        dayjs(
                            data.created_at.trim().split("/").join("-"),
                            "DD-MM-YYYY"
                        ).fromNow()
                    }}
                </p>
            </div>
        </div>
        <div class="end-popup">
            <img
                :src="
                    data.real_estate_images
                        ? data.real_estate_images.length == 0
                            ? ''
                            : data.real_estate_images[0].image
                        : ''
                "
                alt=""
            />
        </div>
    </RouterLink>
</template>
<style scoped>
.start-popup {
    width: 60%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}
.end-popup {
    width: 40%;
}
.end-popup img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px;
    background-color: rgba(128, 128, 128, 0.61);
    border: 1px solid rgba(128, 128, 128, 0.61);
}
.ShowOnMap-contanier {
    gap: 10px;
    width: 50%;
    height: 250px;
    background-color: white;
    border-radius: 10px;
    padding: 5px 10px;
    display: flex;
    overflow: hidden;
}
</style>
