<script setup>
import Button from "@/components/general-components/Button.vue";
import AuthInput from "../../components/AuthInput.vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
const { t } = useI18n();
const router = useRouter();
</script>

<template>
    <div class="grid grid-cols-1 lg:grid-cols-2">
        <Teleport to="#header-action">
            <Button
                color="accent"
                class="px-8 py-[8px]"
                @click="router.go(-1)"
                >{{ t("cancel") }}</Button
            >
        </Teleport>
        <form class="xl:py-20 xl:px-36 flex flex-col gap-24">
            <AuthInput
                icon="material-symbols:password"
                :label="t('newPassword')"
                :placeholder="t('newPassword')"
                type="password"
            />
            <AuthInput
                icon="material-symbols:password"
                :label="t('newPasswordConfirm')"
                :placeholder="t('newPasswordConfirm')"
                type="password"
            />

            <RouterLink
                class="mx-auto w-full xl:w-1/2"
                :to="{ name: 're-assign-username' }"
                ><Button type="submit" color="primary" class="w-full">{{
                    t("login")
                }}</Button></RouterLink
            >
        </form>
        <div class="hidden xl:block">
            <img class="mx-auto mt-10" src="/assets/auth/auth-image.svg" />
        </div>
    </div>
</template>
