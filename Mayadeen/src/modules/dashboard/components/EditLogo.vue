<script setup>
import Button from "@/components/general-components/Button.vue";
import { useI18n } from "vue-i18n";
import { Icon } from "@iconify/vue";
import { reactive, ref, onMounted } from "vue";
const { t } = useI18n();
const emit = defineEmits(["return", "edited"]);
const props = defineProps({
    websiteDetails: String,
    addedLogo: { type: String, default: "" },
});
onMounted(() => {
    logo.value = props.addedLogo;
});
const logo = ref("");
function imageFile(event) {
    let file = event.target.files[0];
    logo.value = URL.createObjectURL(file);
}
const details = ref("");
</script>

<template>
    <div class="p-10">
        <button @click="emit('return')">
            <Icon icon="solar:arrow-left-outline" class="return" width="40" />
        </button>
        <div class="mb-10">
            <h1 class="text-xl text-secondary font-semibold">
                {{ t("logoAqar") }}
            </h1>
            <div class="w-full flex justify-center">
                <div
                    class="bg-accent addImage-contanier relative rounded-xl w-[400px] h-[200px] shadow-lg"
                >
                    <div
                        v-if="
                            addedLogo == ''
                                ? logo != ''
                                    ? false
                                    : true
                                : false
                        "
                        class="flex items-center justify-center w-full h-full"
                    >
                        <Icon
                            class="mx-auto"
                            width="70px"
                            icon="ic:outline-add-box"
                        />
                    </div>
                    <img
                        v-else
                        :src="logo"
                        class="addADImage w-full h-full rounded-xl"
                        alt=""
                    />
                    <input
                        type="file"
                        class="addImage w-full h-full"
                        @change="imageFile($event)"
                        accept="image/png, image/gif, image/jpeg , image/svg ,image/*"
                    />
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-10 mb-10">
            <h1 class="text-xl text-secondary font-semibold">
                {{ t("aqarView") }}
            </h1>
            <textarea
                name=""
                id=""
                class="textarea col-span-3"
                v-model="details"
                cols="50"
                rows="6"
                :placeholder="websiteDetails"
            ></textarea>
        </div>
        <div class="flex justify-center">
            <Button
                @click="emit('edited', { logo: logo, details: details })"
                class="bg-primary text-white"
                >{{ t("edit") }}</Button
            >
        </div>
    </div>
</template>
<style scoped>
.return {
    position: absolute;
    inset-block-start: 20px;
    inset-inline-end: 20px;
}
.addImage-contanier:hover .addADImage {
    filter: brightness(49%);
}
.textarea {
    width: 100%;
    border: 1px solid #70707088;
    border-radius: 6px;
    overflow: auto;
    resize: none;
    padding: 10px;
    outline: 0px;
    transition: all 0.3s;
}
.textarea:focus {
    border: 1px solid var(--primary);
}
.addADImage {
    transition: all 0.3s;
}
.addADImage:hover {
    filter: brightness(49%);
}
.addImage {
    cursor: pointer;
    width: max-content;
    position: absolute;
    inset-inline-start: 0px;
    inset-block-start: 0px;
    height: 100%;
    opacity: 0;
}
</style>
