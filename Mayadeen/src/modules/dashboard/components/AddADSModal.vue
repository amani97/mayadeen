<script setup>
import Modal from "@/components/general-components/Modal.vue";
import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import Button from "@/components/general-components/Button.vue";
import { Icon } from "@iconify/vue";
const { t } = useI18n();
const addImageFile = ref("");
const addedImg = ref(true);
function imageFile(event) {
    let file = event.target.files[0];
    addImageFile.value = URL.createObjectURL(file);
    ADData.value.image = URL.createObjectURL(file);
    addedImg.value = false;
}
const ADS = reactive([]);
const ADData = ref({
    image: "",
    header: "",
    text: "",
});
function addAD() {
    ADS.push(ADData.value);
    console.log(ADS);
}
const props = defineProps({
    addADModal: Boolean,
    editAD: { type: Object, default: null },
});
const emit = defineEmits(["saveData", "closeModal"]);
</script>

<template>
    <modal
        class="w-[65%] relative"
        :show="addADModal"
        @close="emit('closeModal')"
    >
        <template #modal-header>
            <div class="flex items-center justify-between mb-4">
                <h3>{{ t("addYourAD") }}</h3>

                <button class="close-modal" @click="emit('closeModal')">
                    ×
                </button>
            </div>
        </template>
        <div class="mt-4">
            <h1 class="text-xl text-secondary whitespace-nowrap">
                {{ t("advertisingimage") }} :
            </h1>
            <div class="w-full flex justify-center">
                <div
                    class="bg-accent addImage-contanier relative rounded-xl w-[400px] h-[200px] shadow-lg"
                >
                    <div
                        v-if="addedImg && editAD == null"
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
                        :src="addImageFile == '' ? editAD.image : addImageFile"
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
            <div class="mt-6 grid grid-cols-4">
                <h1 class="text-xl text-secondary whitespace-nowrap">
                    {{ t("advertisingHeader") }} :
                </h1>
                <textarea
                    name=""
                    id=""
                    class="textarea col-span-3"
                    v-model="ADData.header"
                    cols="50"
                    rows="1"
                    :placeholder="
                        editAD == null ? t('advertisingHeader') : editAD.header
                    "
                ></textarea>
            </div>
            <div class="mt-6 grid grid-cols-4">
                <h1 class="text-xl text-secondary whitespace-nowrap">
                    {{ t("advertisingDetails") }} :
                </h1>
                <textarea
                    name=""
                    id=""
                    class="textarea col-span-3"
                    cols="50"
                    rows="3"
                    :placeholder="
                        editAD == null
                            ? t('advertisingDetails')
                            : editAD.details
                    "
                    v-model="ADData.text"
                ></textarea>
            </div>
            <div class="flex justify-center items-center mt-4">
                <Button
                    @click="
                        addAD();
                        emit('saveData', ADS);
                        emit('closeModal');
                    "
                    class="bg-primary text-white"
                    >{{ t("add") }}</Button
                >
            </div>
        </div>
    </modal>
</template>
<style scoped>
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
.edit-icon {
    color: white;
}
.close-modal {
    background-color: var(--error);
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
