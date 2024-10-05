<script setup>
import trustBtn from "../../components/trustBtn.vue";
import trustInput from "../../components/trustInput.vue";
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import Button from "@/components/general-components/Button.vue";
import { useRouter } from "vue-router";
import { useAuthenticateStore } from "../authenticateStore";
import { reactive } from "vue";
const router = useRouter();
const store = useAuthenticateStore();
const { t } = useI18n();
const data = reactive({
    status: "researcher",
    ssn: "",
});
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
            <h3 class="header-style">{{ t("identityDocumentation") }}</h3>
        </div>

        <trustInput
            :idForLabel="1"
            class="input"
            text="pleaseEnterTheIdNumber"
            v-model="data.ssn"
        />
        <trustBtn
            class="mt-48"
            text="verification"
            @click="authenticateAccount()"
        />
    </div>
</template>
<style scoped>
.text-input[data-v-0a3f9933] {
    margin-bottom: 0px;
}
.input input {
    background-color: red !important;
}
.background-image {
    height: 90vh;
}
</style>
