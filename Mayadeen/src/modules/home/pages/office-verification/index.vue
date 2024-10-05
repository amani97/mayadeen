<script setup>
import trustBtn from "../../components/trustBtn.vue";
import trustInput from "../../components/trustInput.vue";
import { Icon } from "@iconify/vue";
import Button from "@/components/general-components/Button.vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import { useAuthenticateStore } from "../authenticateStore";
import { reactive } from "vue";
const store = useAuthenticateStore();
const data = reactive({
    status: "office",
    ssn: "",
    licence_number: "",
});
const router = useRouter();
const { t } = useI18n();
const inputs = [
    {
        text: "pleaseEnterTheIdNumber",
        key: "ssn",
    },
    {
        text: "pleaseEnterTheLicenseNumber",
        key: "licence_number",
    },
];
function authenticateAccount() {
    store.authenticateAccount(data);
}
</script>
<template>
    <div class="px-16 pt-10 background-image">
        <Teleport to="#header-action">
            <Button class="px-8 py-[8px]" @click="router.go(-1)">{{
                t("return")
            }}</Button>
        </Teleport>
        <div class="flex items-center mt-10 mb-16 gap-5">
            <Icon
                icon="ph:seal-check-bold"
                class="text-primary"
                width="40"
            ></Icon>
            <h3 class="header-style">{{ t("officeDocumentation") }}</h3>
        </div>
        <trustInput
            class="mb-16"
            v-for="(item, index) in inputs"
            :text="item.text"
            :idForLabel="index"
            v-model="data[item.key]"
        />
        <trustBtn
            class="mt-28"
            text="verification"
            @click="authenticateAccount()"
        />
    </div>
</template>
<style scoped>
.background-image {
    height: 90vh;
}
</style>
