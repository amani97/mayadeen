<script setup>
import Button from "@/components/general-components/Button.vue";
import { useI18n } from "vue-i18n";
import FormInput from "@/components/form-components/FormInput.vue";
import { Icon } from "@iconify/vue";
import FormSelect from "@/components/form-components/FormSelect.vue";
import Modal from "@/components/general-components/Modal.vue";
import { ref } from "vue";
import { boolean } from "yup";
const { t } = useI18n();

const props = defineProps({
    addData: Object,
    addModal: Boolean,
});
const emit = defineEmits(["closeModal"]);
const editIndex = ref(null);
const newItem = ref("");
</script>

<template>
    <modal
        class="w-[65%] relative"
        :show="addModal"
        @close="emit('closeModal', false)"
    >
        <template #modal-header>
            <div class="flex items-center justify-between mb-4">
                <h3>{{ t(addData.header) }}</h3>

                <button class="close-modal" @click="emit('closeModal', false)">
                    ×
                </button>
            </div>
        </template>
        <div
            class="flex justify-between mt-10"
            v-for="(item, index) in addData.data"
            :key="index"
        >
            <p
                v-if="editIndex == null || editIndex != index"
                class="text-xl text-secondary"
            >
                {{ item.name }}
            </p>
            <div class="w-96" v-else>
                <FormInput
                    v-model="addData.data[editIndex].name"
                    :placeholder="
                        addData.data[index] ? addData.data[index].name : ''
                    "
                />
            </div>
            <div class="flex gap-12" v-if="editIndex == null">
                <button @click="addData.data.splice(index, 1)">
                    <Icon
                        class="text-error"
                        width="23"
                        icon="icomoon-free:bin"
                    />
                </button>
                <button @click="editIndex = index">
                    <Icon class="" width="23" icon="material-symbols:edit" />
                </button>
            </div>
            <button
                v-if="editIndex != null && editIndex == index"
                @click="editIndex = null"
            >
                <Icon icon="bxs:save" width="32" class="text-primary" />
            </button>
        </div>
        <div class="grid grid-cols-4 mt-4 items-center">
            <label for="" class="text-xl text-secondary">{{
                t("addNewItem")
            }}</label>
            <FormInput class="col-span-2" v-model="newItem" />
            <div class="flex justify-center">
                <button
                    class=""
                    @click="
                        newItem == ''
                            ? ''
                            : addData.data.push({ name: newItem });
                        newItem = '';
                    "
                >
                    <Icon class="" width="23" icon="fa6-solid:plus" />
                </button>
            </div>
        </div>
        <div class="flex justify-center items-center mt-4">
            <Button
                @click="emit('closeModal', false)"
                class="bg-primary text-white"
                >{{ t("Done") }}</Button
            >
        </div>
    </modal>
</template>
<style scoped>
.close-modal {
    background-color: var(--error);
}
</style>
