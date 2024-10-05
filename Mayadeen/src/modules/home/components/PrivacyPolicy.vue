<script setup>
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import FormInput from "@/components/form-components/FormInput.vue";
import FormHijriDate from "@/components/form-components/FormHijriDate.vue";
import FormCheckbox from "@/components/form-components/FormCheckbox.vue";
import Ad from "./Ad.vue";
import { ref, onBeforeMount } from "vue";
import { vMaska } from "maska";

const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const emit = defineEmits(["checkedPolicy"]);
const agreement = [
    "agreementWithTheOwner",
    "agreementWithTheRealEstateOffice",
    "agreementWithTheBroker",
];
onBeforeMount(() => {
    if (route.path.split("/")[-2] == "owner") {
        route.meta.title = agreement[0];
    }
});
const inputs = [
    [
        {
            text: "licenseNumber",
        },
        {
            text: "enterTheRealEstateEeedNumber",
        },
    ],
    [
        {
            text: "licenseNumber",
        },
        {
            text: "commercialRegistrationNumber",
        },
    ],

    [
        {
            text: "advertiserLicenseNumber",
        },
    ],
];

var checked = ref(false);
</script>
<template>
    <div
        class="xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl px-16 min-h-[70vh] privacyPolicy"
    >
        <div
            class="input-container"
            :class="route.path.split('/')[1] == 'dashboard' ? 'gap-10' : ''"
        >
            <div
                class="grid xs:gird-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center w-full"
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
                <label class="" :for="input.text">{{ t(input.text) }} :</label>
                <FormInput
                    :name="input.text"
                    class="text-xl"
                    type="text"
                    :placeholder="
                        input.text == 'enterTheDateOfTheInstrument'
                            ? 'dd-mm-yyyy'
                            : ''
                    "
                    v-maska
                    :data-maska="
                        input.text == 'enterTheDateOfTheInstrument'
                            ? '##-##-####'
                            : '###################################'
                    "
                />
            </div>
            <div
                class="grid grid-cols-1 w-full mt-8"
                v-if="route.params.text == 'owner'"
            >
                <FormHijriDate
                    hijriDateClass=" gap-[14%]"
                    :label="t('enterTheDateOfTheInstrument')"
                    @getDate="
                        String($event).includes('null')
                            ? null
                            : console.log($event)
                    "
                    selectClass=" "
                />
            </div>
        </div>

        <!-- <Ad class="" /> -->
        <div class="flex justify-between">
            <FormCheckbox
                @change="emit('checkedPolicy', checked)"
                v-model="checked"
                :completeLabel="t('privacyPolicyComplete')"
                spanUrl="/home/privacy-policy"
                :isSpan="true"
                :span="t('privacyPolicySpan')"
                class="my-10 checkboxPrivacy"
                inputClasses=""
                labelClasses="  text-secondary"
                :label="t('privacyPolicy')"
            />
        </div>
    </div>
</template>
<style scoped>
.checkboxPrivacy {
}
.input-container {
    @apply flex flex-col justify-center items-center;
}
.privacyPolicy {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
}
.text-input[data-v-0a3f9933] {
    margin: 0px;
}
</style>
