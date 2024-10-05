<script setup>
import Button from "@/components/general-components/Button.vue";
import AuthInput from "../../components/AuthInput.vue";
import { useI18n } from "vue-i18n";
import FormCheckbox from "@/components/form-components/FormCheckbox.vue";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import { object } from "yup";
import { useValidator } from "../../../../utils/validators";
import { useAuthStore } from "../../store";
import { vMaska } from "maska";
import { Form } from "vee-validate";
import LoaderButton from "../../../../components/general-components/LoaderButton.vue";
import { storeToRefs } from "pinia";

const { t } = useI18n();
const isPolicyAgreed = ref(false);
const router = useRouter();
const store = useAuthStore();

const { loading } = storeToRefs(store);

const { isRequired, isPassword, isSimilar, isEmail } = useValidator();

const schema = object().shape({
    phone: isRequired,
    password: isPassword,
    username: isRequired,
    email: isEmail,
    confirmPassword: isSimilar("password"),
});
const form = reactive({
    user_name: "",
    email: "",
    phone: "",
    password: "",
});

function onSubmit(values) {
    store.register(form).then(() => {
        router.push({ name: "landingPage" });
    });
}
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
                icon="mingcute:user-4-fill"
                :label="t('username')"
                :placeholder="t('username')"
                name="username"
                v-model="form.user_name"
            />
            <AuthInput
                icon="ic:outline-email"
                :label="t('email')"
                :placeholder="t('email')"
                name="email"
                v-model="form.email"
            />
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
                name="password"
                v-model="form.password"
            />
            <AuthInput
                icon="material-symbols:password"
                :label="t('confirmPassword')"
                :placeholder="t('confirmPassword')"
                name="confirmPassword"
                type="password"
            />

            <FormCheckbox
                v-model="isPolicyAgreed"
                :label="t('agreeTermsMessage')"
            >
                <RouterLink
                    class="text-primary hover:brightness-90 underline"
                    to="#"
                >
                    {{ t("websiteUsage") }}
                </RouterLink></FormCheckbox
            >
            <div class="flex justify-center w-full">
                <LoaderButton
                    :disabled="!isPolicyAgreed"
                    type="submit"
                    color="primary"
                    class="font-bold"
                    :loading="loading"
                    >{{ t("createNewAccount") }}</LoaderButton
                >
            </div>
        </Form>

        <div class="hidden xl:block fixed end-28">
            <img
                class="mx-auto mt-10 h-1/2"
                src="/assets/auth/auth-image.svg"
            />
        </div>
    </div>
</template>
