<script setup>
import { useI18n } from "vue-i18n";
import Button from "@/components/general-components/Button.vue";
import { Icon } from "@iconify/vue";
import AddADSModal from "../components/AddADSModal.vue";
import { ref, reactive } from "vue";
const { t } = useI18n();
const editAD = ref(false);
const ADS = ref(null);
const AD = reactive({
    header: "header test",
    details: "details test",
    image: "adad",
});
</script>

<template>
    <div class="p-10">
        <div class="absolute end-10">
            <button @click="editAD = true" class="edit-button">
                <Icon
                    class="edit-icon"
                    width="23"
                    icon="material-symbols:edit"
                />
            </button>
        </div>
        <!-- AD for test -->
        <AddADSModal
            :addADModal="editAD"
            :editAD="AD"
            @close-modal="editAD = false"
            @saveData="
                (e) => {
                    ADS = e;
                }
            "
        />
        <article class="mt-10">
            <h1 class="text-secondary mb-5 text-2xl font-bold">
                {{ t("advertisingHeader") }}
            </h1>
            <p class="text-secondary text-xl font-semibold">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error
                optio qui, rem labore repellat repudiandae officia a fugit
                voluptatem nobis quibusdam deleniti beatae aspernatur! Autem
                corporis id voluptate modi ut?
            </p>
        </article>
        <article class="my-10">
            <h1 class="text-secondary mb-5 text-2xl font-bold">
                {{ t("advertisingDetails") }}
            </h1>
            <p class="text-secondary text-xl font-semibold">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error
                optio qui, rem labore repellat repudiandae officia a fugit
                voluptatem nobis quibusdam deleniti beatae aspernatur! Autem
                corporis id voluptate modi ut?
            </p>
        </article>
        <article class="my-10">
            <h1 class="text-secondary mb-5 text-2xl font-bold">
                {{ t("advertisingimage") }}
            </h1>
            <div class="flex justify-center items-center align-middle">
                <img
                    src=""
                    class="AD-image flex justify-center items-center align-middle"
                    alt="AD"
                />
            </div>
        </article>
    </div>
</template>
<style scoped>
.AD-image {
    width: 400px;
    height: 200px;
    border-radius: 6px;
}
.edit-button {
    background-color: var(--primary);
    padding: 12px 20px;
    border-radius: 8px;
}
.edit-icon {
    color: white;
}
</style>
