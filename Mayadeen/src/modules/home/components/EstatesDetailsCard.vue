<script setup>
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import Modal from "@/components/general-components/Modal.vue";
import { ref } from "vue";
import EstatesDetailsModalGrid from "./EstatesDetailsModalGrid.vue";

const showModal = ref(false);
const props = defineProps({
    estateInfo: Object,
});
const { t } = useI18n();
</script>

<template>
    <section class="bg-white shadow-2xl px-8 py-4">
        <div class="flex mb-8 justify-between">
            <h4 class="text-xl font-semibold">
                {{
                    estateInfo.real_estate_kind
                        ? estateInfo.real_estate_kind
                        : ""
                }}
                {{
                    estateInfo.real_estate_section
                        ? estateInfo.real_estate_section
                        : ""
                }}
            </h4>
            <div class="flex gap-4 items-baseline">
                <span class="text-xl text-primary font-semibold">
                    {{ estateInfo.price }}
                    {{ t("Real") }}
                </span>
                <!-- <span>
                    {{
                        estateInfo.real_estate_kind
                            ? estateInfo.real_estate_kind
                            : ""
                    }}
                </span> -->
            </div>
        </div>
        <article class="flex flex-col gap-6">
            <div class="flex items-center gap-12">
                <h4 class="w-fit pb-2 text-xl border-b-2 border-primary">
                    {{ t("description") }} :
                </h4>
                <button
                    @click="showModal = true"
                    class="p-1.5 cursor-pointer hover:opacity-80 bg-secondary rounded-full text-white"
                >
                    <Icon height="30" icon="solar:menu-dots-bold" />
                </button>
            </div>
            <div>
                <h4 class="w-fit pb-2 text-xl border-b-2 border-primary">
                    {{ t("specifications") }} :
                </h4>
                <p class="mt-2 whitespace-pre-line text-lg">
                    {{ estateInfo.description }}
                </p>
            </div>
            <div>
                <h4 class="w-fit pb-2 text-xl border-b-2 border-primary">
                    {{ t("location") }} :
                </h4>
                <p class="mt-2 text-lg">
                    {{ estateInfo.location_text }}
                </p>
            </div>
        </article>
        <div>
            <modal
                class="w-[65%] relative"
                :show="showModal"
                @close="showModal = false"
            >
                <template #modal-header>
                    <div class="flex items-center justify-center mt-5 mb-10">
                        <h3>{{ t("estateDetails") }}</h3>

                        <button class="close-modal" @click="showModal = false">
                            ×
                        </button>
                    </div>
                </template>
                <EstatesDetailsModalGrid :data="estateInfo" />
            </modal>
        </div>
    </section>
</template>
