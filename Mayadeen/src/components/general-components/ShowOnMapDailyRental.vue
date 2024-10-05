<script setup>
import { Icon } from "@iconify/vue";
const props = defineProps({
    data: Object,
});
</script>

<template>
    <div class="ShowOnMap-contanier">
        <div class="start-popup">
            <div class="flex justify-between items-center">
                <p class="text-xl text-secondary">
                    {{ data.rent_kind }}, {{ data.rent_section }},
                    {{ data.location_text }}
                </p>
                <p class="text-md">إدارة الاعلان</p>
            </div>
            <p class="text-primary font-semibold text-xl italic">
                <span class="">{{
                    data.avg_price ? data.avg_price.toFixed(2) : ""
                }}</span>
                ريال متوسط السعر
            </p>

            <div class="flex justify-between items-center">
                <p class="text-primary font-semibold text-xl italic">حسم %20</p>
                <p class="flex items-center gap-1">
                    عدد المشاهدات
                    <span class="font-bold">{{ data.views }}</span>
                </p>
            </div>
        </div>
        <div class="end-popup"><img :src="data.image" alt="" /></div>
    </div>
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
