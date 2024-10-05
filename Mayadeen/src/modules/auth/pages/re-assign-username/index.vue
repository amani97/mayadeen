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
                icon="mingcute:user-4-fill"
                :label="t('newUsername')"
                :placeholder="t('newUsername')"
            />
            <AuthInput
                icon="mingcute:user-4-fill"
                :label="t('newUsernameConfirm')"
                :placeholder="t('newUsernameConfirm')"
                v-model="pass"
            />

            <RouterLink
                class="mx-auto w-full xl:w-1/2"
                :to="{ name: 'estates-sections' }"
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
