<script setup>
import Button from "@/components/general-components/Button.vue";
import { useI18n } from "vue-i18n";
import FormCheckbox from "@/components/form-components/FormCheckbox.vue";
import OtpInput from "../../components/OtpInput.vue";
import { ref } from "vue";
const { t } = useI18n();
const otp = ref("");
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-3">
        <Teleport to="#header-action">
            <Button color="accent" class="px-8 py-[8px]">{{
                t("cancel")
            }}</Button>
        </Teleport>
        <form
            class="xl:py-20 xl:px-36 lg:col-span-2 flex flex-col gap-12 container"
        >
            <div>
                <h4 class="text-xl mb-2">
                    يرجى ادخال الرمز المرسل للهاتف 055555555555
                </h4>
                <span>الرمز صالح لمدة 60 ثانية</span>
            </div>
            <OtpInput :num-inputs="6" v-model="otp" />
            <FormCheckbox :label="t('agreeVerifyAccount')" />
            <div class="flex w-10/12 justify-center">
                <RouterLink
                    class="xl:w-1/4 w-full"
                    :to="{ name: 're-assign-password' }"
                >
                    <Button class="w-full" type="submit" color="primary">{{
                        t("verify")
                    }}</Button>
                </RouterLink>
            </div>
        </form>

        <div class="hidden xl:block">
            <img class="mx-auto mt-10" src="/assets/auth/auth-image2.svg" />
        </div>
    </div>
</template>
