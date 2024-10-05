<script setup>
import Button from "@/components/general-components/Button.vue";
import { useI18n } from "vue-i18n";
import { Icon } from "@iconify/vue";
import { ref } from "vue";
const privacyPolicy = ref(
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates vel odit et voluptatibus asperiores quas consequuntur iste fugiat molestiae,doloremque natus porro itaque dolores laboriosam eaque commodi! Autem,nostrum ab."
);
const newPrivacyPolicy = ref("");
const { t } = useI18n();
const edit = ref(false);
</script>
<template>
    <div class="p-10">
        <div class="absolute end-10">
            <button @click="edit = !edit" class="edit-button">
                <Icon
                    class="edit-icon"
                    width="23"
                    icon="material-symbols:edit"
                />
            </button>
        </div>
        <h1 class="text-2xl text-secondary font-bold">
            {{ t("privacyPolicyAqar") }}
        </h1>
        <p v-if="!edit" class="mt-16 text-xl text-secondary font-semibold">
            {{ privacyPolicy }}
        </p>
        <textarea
            v-if="edit"
            name=""
            id=""
            class="mt-16 textarea col-span-3"
            v-model="newPrivacyPolicy"
            cols="50"
            rows="6"
            :placeholder="privacyPolicy"
        ></textarea>
        <div class="flex justify-center mt-24" v-if="edit">
            <Button
                @click="
                    newPrivacyPolicy == ''
                        ? ''
                        : (privacyPolicy = newPrivacyPolicy);
                    edit = false;
                "
                class="bg-primary edit-icon"
                >{{ t("edit") }}</Button
            >
        </div>
    </div>
</template>
<style scoped>
.edit-button {
    background-color: var(--primary);
    padding: 12px 20px;
    border-radius: 8px;
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
.edit-icon {
    color: white;
}
</style>
