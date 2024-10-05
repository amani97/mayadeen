<script setup>
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import Button from "../../../components/general-components/Button.vue";
import Modal from "@/components/general-components/Modal.vue";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useEstateDetails } from "../pages/estate-details/store.js";
import FormInput from "@/components/form-components/FormInput.vue";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
const toast = useToast();
const store = useEstateDetails();
const { reportData, wishlist } = storeToRefs(store);
const fav = ref(wishlist);
const route = useRoute();
const { t } = useI18n();
const shareModal = ref(false);
const reportModal = ref(false);
const shareURL = ref(null);

onMounted(() => {
    shareURL.value = window.location.href.replace("#", "%23");
});

function addToFavourite() {
    store.addToFavourite(route.params.id).then((e) => {
        e == "like" ? (fav.value = true) : (fav.value = false);
    });
}
const copyContent = async () => {
    try {
        await navigator.clipboard.writeText(window.location.href);
        toast.success(t("Copy_completed_successfully"));
    } catch (err) {
        toast.success(t("Copy_failed"));
    }
};
function addReport() {
    reportData.value.real_estate_id = route.params.id;
    store.addReport();
    reportModal.value = false;
}
</script>

<template>
    <div class="flex w-fit gap-4 items-center">
        <Button
            color="accent"
            class="px-6 bg-white text-secondary shadow-lg flex items-center gap-4 border-none my-auto py-[8px]"
            @click="shareModal = true"
            >{{ t("share") }}

            <Icon icon="material-symbols:share" class="text-info" />
        </Button>
        <Button
            color="accent"
            class="px-6 bg-white text-secondary shadow-lg flex items-center gap-4 border-none my-auto py-[8px]"
            @click="reportModal = true"
            >{{ t("report") }}

            <Icon icon="material-symbols:flag" class="text-error" />
        </Button>
        <Button
            @click="addToFavourite()"
            color="accent"
            class="px-6 bg-white text-secondary shadow-lg flex items-center gap-4 border-none my-auto py-[8px]"
            >{{ t("favorite") }}

            <Icon
                :icon="fav ? 'mdi:heart' : 'mdi:heart-outline'"
                class="text-error"
            />
        </Button>
        <modal
            class="w-[65%] relative"
            :show="shareModal"
            @close="shareModal = false"
        >
            <template #modal-header>
                <div class="flex items-center justify-center mt-5 mb-10">
                    <h3>{{ t("estateShare") }}</h3>

                    <button class="close-modal" @click="shareModal = false">
                        ×
                    </button>
                </div>
            </template>
            <div class="flex flex-col items-center">
                <div>مشاركة الاعلان عن طريق</div>
                <div class="flex w-full mt-20 justify-evenly">
                    <div
                        @click="copyContent()"
                        class="p-4 rounded shadow cursor-pointer bg-white hover:brightness-90"
                    >
                        <Icon
                            icon="ph:link-bold"
                            class="text-secondary text-3xl"
                        />
                    </div>

                    <a
                        target="_blank"
                        :href="`https://wa.me/?text=${shareURL}`"
                        class="p-4 rounded shadow cursor-pointer bg-white hover:brightness-90"
                    >
                        <Icon
                            icon="ri:whatsapp-fill"
                            class="text-success text-3xl"
                        />
                    </a>
                </div>
            </div>
        </modal>
        <modal
            class="w-[65%] relative"
            :show="reportModal"
            @close="reportModal = false"
        >
            <template #modal-header>
                <div class="flex items-center justify-center mt-5 mb-10">
                    <h3>{{ t("estateReport") }}</h3>

                    <button class="close-modal" @click="reportModal = false">
                        ×
                    </button>
                </div>
            </template>
            <div class="rep-modal shadow-lg">
                <label for="rep" class="text-secondary text-xl">
                    {{ t("reportAViolation") }} :
                </label>
                <FormInput name="rep" v-model="reportData.comment" />
                <button @click="addReport()" class="rep-btn">
                    {{ t("notifyTheSupervisor") }}
                </button>
            </div>
        </modal>
    </div>
</template>
<style>
.rep-modal {
    background-color: rgb(253, 253, 253);
    margin: 3rem 5rem;
    height: 300px;
    padding: 10px;
    border-radius: 10px;
    position: relative;
}
.rep-btn {
    padding: 12px 35px;
    background-color: #fbb52e;
    color: white;
    font-weight: 600;
    border-radius: 5px;
    position: absolute;
    inset-block-end: 20px;
    inset-inline-start: 20px;
}
</style>
