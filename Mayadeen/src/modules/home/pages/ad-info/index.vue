<script setup>
import Button from "@/components/general-components/Button.vue";
import StepNumber from "@/components/general-components/StepNumber.vue";
import Step1 from "../../components/add-your-ad/Step1.vue";
import Step2 from "../../components/add-your-ad/Step2.vue";
import Step4 from "../../components/add-your-ad/Step4.vue";
import Step3 from "../../components/add-your-ad/Step3.vue";
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";
import LoadingComponent from "@/components/general-components/Loading.vue";
import { ref } from "vue";
import PrivacyPolicy from "../../components/PrivacyPolicy.vue";
import { useRouter, useRoute, onBeforeRouteLeave } from "vue-router";
import { useAdInfoStore } from "./store";
import { storeToRefs } from "pinia";
import { useToast } from "vue-toastification";
import { onBeforeMount, onMounted, computed } from "vue";
import { object } from "yup";
import { Form } from "vee-validate";
import { useValidator } from "../../../../utils/validators";
const { isRequired, isMin, isNumber, isArrayRequired } = useValidator();
const schemaStep1 = object().shape({
    kinds: isRequired,
    price: isRequired,
    selectSection: isRequired,
});
const store = useAdInfoStore();
const { data, flag, loading, filterData } = storeToRefs(store);
const schemaStep2 = null;
const schemaStep3 = object().shape({});
const schemaStep4 = {
    advertise: isMin(10),
    description: isMin(10),
    estate_area_services: isArrayRequired,
    extra: isArrayRequired,
};
var privacyPolicyValidat = {};
const schema = computed(() => {
    if (route.params.id == 1) return schemaStep1;
    if (route.params.id == 2) return schemaStep2;
    if (route.params.id == 3) return schemaStep3;
    if (route.params.id == 5) {
        if (
            route.path.split("/")[route.path.split("/").length - 2] == "owner"
        ) {
            Object.assign(privacyPolicyValidat, {
                licenseNumber: isNumber,
                enterTheRealEstateEeedNumber: isRequired,
                day: isRequired,
                month: isRequired,
                year: isRequired,
            });
        }
        if (
            route.path.split("/")[route.path.split("/").length - 2] == "office"
        ) {
            Object.assign(privacyPolicyValidat, {
                licenseNumber: isNumber,
                commercialRegistrationNumber: isNumber,
            });
        }
        if (
            route.path.split("/")[route.path.split("/").length - 2] ==
            "mediator"
        ) {
            Object.assign(privacyPolicyValidat, {
                advertiserLicenseNumber: isNumber,
            });
        }
        return privacyPolicyValidat;
    }
    if (route.params.id == 4) {
        var toValidate = { ...schemaStep4 };
        if (filterData.value[0].value) {
            Object.assign(toValidate, {
                landArea: isRequired,
            });
        }
        if (filterData.value[1].value) {
            Object.assign(toValidate, {
                realEstateArea: isRequired,
            });
        }
        if (filterData.value[2].value) {
            Object.assign(toValidate, {
                interface: isRequired,
            });
        }
        if (filterData.value[5].value) {
            Object.assign(toValidate, {
                floor: isRequired,
            });
        }
        return object().shape(toValidate);
    } else return null;
});
const toast = useToast();

const router = useRouter();
const route = useRoute();
const { t } = useI18n();
var disabled = ref(true);
const disabledStep3 = computed(() => {
    return disabled.value || !data.value.location_text;
});

onBeforeMount(() => {
    var temp = 0;
    data.value.owner_type =
        route.path.split("/")[route.path.split("/").length - 2];
    route.path.split("/")[route.path.split("/").length - 2] == "owner"
        ? (temp = 0)
        : route.path.split("/")[route.path.split("/").length - 2] == "office"
        ? (temp = 1)
        : route.path.split("/")[route.path.split("/").length - 2] == "mediator"
        ? (temp = 2)
        : "";
    if (route.params.id == "5") {
        route.meta.title = data.value.owner_type;
    }
});
function nextBtn() {
    var temp = 0;
    data.value.owner_type =
        route.path.split("/")[route.path.split("/").length - 2];
    route.path.split("/")[route.path.split("/").length - 2] == "owner"
        ? (temp = 0)
        : route.path.split("/")[route.path.split("/").length - 2] == "office"
        ? (temp = 1)
        : route.path.split("/")[route.path.split("/").length - 2] == "mediator"
        ? (temp = 2)
        : "";

    route.params.id == 5
        ? router.push({ name: route.name, params: { id: 1 } })
        : router.push(String(Number(route.path[route.path.length - 1]) + 1));
}
function addAD() {
    store
        .addAD()
        .then(() => {
            route.path.split("/")[1] == "dashboard"
                ? router.push("/controlpanel")
                : router.push("/landingPage");
        })
        .catch(() => {
            route.path.split("/")[1] == "dashboard"
                ? router.push("/controlpanel")
                : router.push("/landingPage");
        });
}
</script>
<template>
    <LoadingComponent v-if="loading" />

    <div
        class="background-image p-16 px-24 overflow-hidden"
        :class="loading ? 'page-loading' : ''"
    >
        <Teleport
            v-if="route.path.split('/')[1] != 'dashboard'"
            to="#header-action"
        >
            <Button
                class="px-8 py-[8px]"
                @click="
                    data = {
                        age: 0,
                        location_text:
                            '539, محافظة الرياض, منطقة الرياض, السعودية',
                        images: [],
                        lat: 24.7136,
                        lang: 46.6753,
                        extras: [],
                        estate_area_services: [],
                    };
                    router.push('/landingPage');
                "
                >{{ t("homePage") }}</Button
            >
        </Teleport>
        <StepNumber v-if="route.params.id != '5'" />
        <Step2
            v-if="route.params.id == '2'"
            @checkedPolicy="(e) => (disabled = !e)"
        />
        <Step3
            v-if="route.params.id == '3'"
            @checkedPolicy="(e) => (disabled = !e)"
        />
        <Form
            v-if="route.params.id != '2' && route.params.id != '3'"
            @submit="route.params.id == '4' ? addAD() : nextBtn()"
            v-model:validation-schema="schema"
        >
            <Step1 v-if="route.params.id == '1'" />

            <Step4
                v-if="route.params.id == '4'"
                @checkedPolicy="(e) => (disabled = !e)"
            />
            <PrivacyPolicy
                @checkedPolicy="(e) => (disabled = !e)"
                v-if="route.params.id == '5'"
            />
            <div
                class="flex mt-20 justify-between xs:gap-8 sm:gap-14 md:gap-24 lg:gap-56 xl:gap-96 xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            >
                <button
                    class="previous-btn"
                    @click="
                        route.params.id == 5
                            ? router.push('/home/add-ad')
                            : route.params.id == 1
                            ? router.push('5')
                            : router.push(String(Number(route.params.id) - 1))
                    "
                >
                    {{ t("previous") }}
                    <Icon
                        class="iconBtnPrev"
                        icon="mdi:arrow-right"
                        color="white"
                        width="20"
                    />
                </button>
                <button
                    type="submit"
                    :disabled="route.params.id == '1' ? false : disabled"
                    class="next-btn"
                >
                    <Icon
                        class="iconBtnNext"
                        icon="mdi:arrow-left"
                        color="white"
                        width="20"
                    />
                    {{ t("next") }}
                </button>
            </div>
        </Form>
        <div
            v-if="route.params.id == 2 || route.params.id == 3"
            class="flex mt-20 justify-center xs:gap-8 sm:gap-14 md:gap-24 lg:gap-56 xl:gap-96 xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            :class="
                route.params.id == '1' ? 'justify-center' : 'justify-between'
            "
        >
            <button
                class="previous-btn"
                @click="
                    route.params.id == 1
                        ? router.push('5')
                        : router.push(String(Number(route.params.id) - 1))
                "
            >
                {{ t("previous") }}
                <Icon
                    class="iconBtnPrev"
                    icon="mdi:arrow-right"
                    color="white"
                    width="20"
                />
            </button>
            <button
                @click="nextBtn()"
                :disabled="
                    route.params.id == '3'
                        ? disabledStep3
                        : route.params.id == '1'
                        ? false
                        : disabled
                "
                class="next-btn"
            >
                <Icon
                    class="iconBtnNext"
                    icon="mdi:arrow-left"
                    color="white"
                    width="20"
                />
                {{ t("next") }}
            </button>
        </div>
    </div>
</template>
<style scoped>
.next-btn:disabled {
    background-color: var(--secondary) !important;
    opacity: 0.9;
}

.iconBtnNext {
    position: absolute;
    inset-inline-end: 20px;
}

.iconBtnPrev {
    position: absolute;
    inset-inline-start: 20px;
}

@media (max-width: 480px) {
    .iconBtnNext {
        position: absolute;
        top: 18px;
        inset-inline-start: 4px;
    }
    .iconBtnPrev {
        position: absolute;
        top: 20px;
        inset-inline-end: 4px;
    }
}

/* :dir(ltr) .next-btn {
    @apply flex items-center  gap-24 text-2xl font-semibold justify-end rounded-xl;
    color: white;
    background-color: var(--primary);
    width: 400px;
    height: 60px;
    padding: 40px;
} */
.next-btn {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    @apply gap-24 text-xl   font-semibold
         rounded-xl;
    color: white;
    background-color: var(--primary);
    width: 250px;
    height: 55px;
}

.previous-btn {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;

    @apply gap-24 text-xl font-semibold rounded-xl;
    width: 250px;
    height: 55px;
    color: white;
    background-color: var(--secondary);
}
</style>
