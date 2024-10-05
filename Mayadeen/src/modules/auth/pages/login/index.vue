<script setup>
import { reactive } from "vue";
import Button from "@/components/general-components/Button.vue";
import AuthInput from "../../components/AuthInput.vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { Form } from "vee-validate";
import { object } from "yup";
import { useValidator } from "@/utils/validators";
import LoaderButton from "@/components/general-components/LoaderButton.vue";
import { useAuthStore } from "../../store";
import { storeToRefs } from "pinia";
import { vMaska } from "maska";
const { t } = useI18n();
const router = useRouter();
const store = useAuthStore();
const { loading } = storeToRefs(store);
function onSubmit(values) {
    store.login(form).then(() => {
        router.push({ name: "landingPage" });
    });
}

const { isRequired, isPassword } = useValidator();
const schema = object().shape({
    phone: isRequired,
    password: isPassword,
});

const form = reactive({
    phone: "",
    password: "",
});
</script>

<template>
    <div class="grid grid-cols-1 xl:grid-cols-2">
        <Teleport to="#header-action">
            <Button
                color="accent"
                class="px-8 py-[8px]"
                @click="router.go(-1)"
                >{{ t("cancel") }}</Button
            >
        </Teleport>
        <Form @submit="onSubmit" class="auth-form" :validation-schema="schema">
            <AuthInput
                icon="ion:call"
                :label="t('phoneNumber')"
                :placeholder="t('phoneNumber')"
                name="phone"
                v-model="form.phone"
                v-maska
                data-maska="##########"
            />
            <AuthInput
                icon="material-symbols:password"
                :label="t('password')"
                :placeholder="t('password')"
                type="password"
                v-model="form.password"
                name="password"
            />
            <RouterLink
                class="text-secondary opacity-80 xl:text-xl hover:opacity-100"
                :to="{ name: 'phone-number-verification' }"
            >
                {{ t("forgetPassword") }}
            </RouterLink>
            <LoaderButton
                type="submit"
                color="primary"
                class="w-full xl:w-1/2 mx-auto"
                :isArrow="true"
                :loading="loading"
                >{{ t("login") }}</LoaderButton
            >

            <div class="xl:text-xl">
                {{ t("dontHaveAccount") }}
                <RouterLink
                    class="text-primary hover:brightness-90"
                    :to="{ name: 'register' }"
                    >{{ t("createAccount") }}</RouterLink
                >
            </div>
        </Form>

        <div class="hidden xl:block">
            <img class="mx-auto mt-10" src="/assets/auth/auth-image.svg" />
        </div>
    </div>
</template>
