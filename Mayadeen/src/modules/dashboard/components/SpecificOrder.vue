<script setup>
import { useI18n } from "vue-i18n";
import { Icon } from "@iconify/vue";
const { t } = useI18n();
</script>
<template>
    <article class="card shadow-xl text-lg font-semibold text-secondary">
        <div class="first-row">
            <p>قسم العقار</p>
            <p>نوع العقار</p>
            <p>المدينة</p>
        </div>
        <div class="second-row">
            <p class="text-primary font-bold">2500 {{ t("Real") }}</p>

            <p class="flex flex-row-reverse gap-2 items-center">
                منذ يوم
                <Icon
                    class="text-primary"
                    height="25"
                    icon="ant-design:reload-time-outline"
                >
                </Icon>
            </p>
        </div>
    </article>
</template>
<style scoped>
.card {
    display: flex;
    flex-direction: column;
    gap: 4rem;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #c0bfbf44;
}
.card .first-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.card .second-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
