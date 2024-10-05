<script setup>
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import FormInput from "@/components/form-components/FormInput.vue";
import FormCheckbox from "@/components/form-components/FormCheckbox.vue";
import { useAdInfoStore } from "../ad-info/store";

import { storeToRefs } from "pinia";
const store = useAdInfoStore();
const { data, loading } = storeToRefs(store);
import { ref } from "vue";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();

const emit = defineEmits(["checkedPolicy"]);
const agreement = [
    "agreementWithTheOwner",
    "agreementWithTheRealEstateOffice",
    "agreementWithTheBroker",
];

const inputs = [
    [
        {
            text: "licenseNumber",
            key: "licence_num",
        },
        {
            text: "enterTheRealEstateEeedNumber",
            key: "archive_num",
        },
        {
            text: "enterTheDateOfTheInstrument",
            key: "licence_date",
        },
    ],
    [
        {
            text: "licenseNumber",
            key: "licence_num",
        },
        {
            text: "commercialRegistrationNumber",
            key: "archive_num",
        },
    ],

    [
        {
            text: "advertiserLicenseNumber",
            key: "licence_num",
        },
    ],
];
var checked = ref(false);
</script>
<template>
    <div class="px-16">
        <div class="input-container">
            <div
                class="grid grid-cols-4 items-center w-full"
                v-for="(input, index) in inputs[
                    route.params.text == 'owner'
                        ? 0
                        : route.params.text == 'office'
                        ? 1
                        : route.params.text == 'mediator'
                        ? 2
                        : 0
                ]"
            >
                <label class="text-xl" :for="String(index)"
                    >{{ t(input.text) }} :</label
                >
                <FormInput
                    :name="String(index)"
                    class="text-xl"
                    type="text"
                    v-model="data[input.key]"
                />
            </div>
        </div>

        <!-- <Ad class="" /> -->
        <FormCheckbox
            @change="emit('checkedPolicy', checked)"
            v-model="checked"
            :completeLabel="t('privacyPolicyComplete')"
            spanUrl="/home/privacy-policy"
            :isSpan="true"
            :span="t('privacyPolicySpan')"
            class="my-10"
            inputClasses=""
            labelClasses="text-xl  text-secondary"
            :label="t('privacyPolicy')"
        />
    </div>
</template>
<style scoped>
.input-container {
    @apply flex flex-col justify-center items-center mb-10;
    height: 300px;
}
</style>
