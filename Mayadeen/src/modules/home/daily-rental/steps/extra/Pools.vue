<script setup>
import AddAd from "@/components/general-components/AddAd.vue";
import FormRadio from "@/components/form-components/FormRadio.vue";
import FormCheckbox from "@/components/form-components/FormCheckbox.vue";
import FormInput from "@/components/form-components/FormInput.vue";
import Button from "@/components/general-components/Button.vue";
import dailyRentalButton from "../../components/dailyRentalButton.vue";
import { useFacilitiesStore } from "../extra/store.js";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { Icon } from "@iconify/vue";
import { reactive, ref, onMounted } from "vue";
const numberOfPool = ref(1);
const router = useRouter(),
    route = useRoute();
const { t } = useI18n();
var selected = ref(["1"]);
var bedroomDetails = [
    { label: "تفاصيل المجالس" },
    { label: "مجلس رئيسي" },
    { label: "مجلس اضافي" },
    { label: "جلسة خارجية" },
    { label: "ملحق خارجي" },
];
var extraPool = [
    { label: "IndoorSwimmingPool" },
    { label: "thereIsABarrierForThePool" },
    { label: "thereAreWaterGamesInThePool" },
    { label: "thereIsHeatingInThePool" },
    { label: t("emptyPool") },
];

const store = useFacilitiesStore();
onMounted(() => {
    store.clearCurrentRoute();
});
</script>
<template>
    <div class="px-10 pb-10 background-image">
        <Teleport to="#header-action">
            <Button class="px-8 py-[8px]" @click="router.go(-1)">{{
                t("return")
            }}</Button>
        </Teleport>
        <AddAd />
        <h2
            class="flex justify-center sm:text-base xs:mb-10 sm:mb-12 md:text-lg md:mb-16 lg:text-xl xl:text-2xl text-secondary font-bold"
        >
            {{ t("Basic estate information") }}
        </h2>
        <h2
            class="sm:text-base xs:mb-3 sm:mb-10 md:text-lg md:mb-12 lg:text-xl xl:text-2xl text-secondary font-bold"
        >
            {{ t("pools") }}
        </h2>
        <div v-for="(i, index) in numberOfPool" :key="index">
            <h2
                class="sm:text-base xs:mb-3 sm:mb-10 md:text-lg md:mb-12 lg:text-xl xl:text-2xl text-secondary font-semibold"
            >
                {{ t("swimmingPoolIncluded") }}
            </h2>
            <div class="pool-container">
                <div
                    class="flex w-full grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center"
                >
                    <FormRadio
                        class="xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-secondary"
                        v-model="selected[index]"
                        :name="index"
                        value="1"
                        checked="true"
                        :label="t('thePoolIsTiered')"
                    />
                    <div
                        v-if="selected[index] == '1'"
                        class="flex gap-10 items-center"
                    >
                        <FormInput class="formInput" name="s" />
                        <p
                            class="xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-secondary"
                        >
                            {{ t("from") }}
                        </p>
                        <FormInput class="formInput" name="e" />
                    </div>
                </div>
                <div
                    class="flex w-full grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center"
                >
                    <FormRadio
                        class="xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl f text-secondary"
                        v-model="selected[index]"
                        :name="index"
                        value="2"
                        :label="t('thePoolIsNotTiered')"
                    />
                    <div
                        v-if="selected[index] == '2'"
                        class="flex gap-10 items-center"
                    >
                        <p
                            class="xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-semibold text-secondary"
                        >
                            {{ t("deeply") }}
                        </p>

                        <FormInput class="formInput" name="v" />
                    </div>
                </div>
            </div>
            <div class="flex items-center gap-10 mb-10">
                <label
                    class="xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mb-5 text-secondary font-semibold"
                    for=""
                    >{{ t("dimensionsOfThePool") }}</label
                >
                <FormInput class="formInput" name="H" />
                <p class="text-secondary text-xl font-bold">*</p>
                <FormInput class="formInput" name="W" />
            </div>
            <div
                class="flex mb-16 items-center gap-10 xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
            >
                <h2 class="text-secondary font-semibold">
                    {{ t("additionalPoolDetails") }}
                </h2>
                <h2 class="chooseText">{{ t("choose") }}</h2>
            </div>

            <FormCheckbox
                v-for="item in extraPool"
                :key="item.id"
                class="xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-secondary w-82"
                :name="'poolDetail' + index"
                v-model="item.id"
                :label="t(item.label)"
            />
            <hr
                v-if="index != numberOfPool - 1"
                class="text-secondary mx-24 my-8"
            />
        </div>
        <button
            class="add-pool"
            @click="
                numberOfPool++;
                selected.push('1');
            "
        >
            {{ t("addAnotherPool") }}
        </button>
        <div class="flex justify-center gap-96">
            <dailyRentalButton
                :pathName="store.getNextRoute"
                :isValid="true"
                next="next"
            ></dailyRentalButton>
        </div>
    </div>
</template>
<style scoped>
.add-pool {
    @apply shadow-xl mt-10;
    padding: 10px 50px;
    color: var(--primary);
    background-color: white;
    border: 1px solid var(--primary);
    border-radius: 10px;
    font-size: 20px;
    font-weight: 600;
}
@media (max-width: 480px) {
    .add-pool {
        padding: 10px 20px;
        font-size: 15px;
        font-weight: 100px;
    }
}
@media (max-width: 768px) and (min-width: 480px) {
    .add-pool {
        padding: 10px 20px;
        font-size: 20px;
        font-weight: 150px;
    }
}
.add-pool:hover {
    cursor: pointer;
    opacity: 0.8;
}
.chooseText {
    color: #7d8491;
}
/* .pool-container {
    width: 100%;
    height: 200px;
} */
.next-btn:disabled {
    background-color: var(--secondary) !important;
    opacity: 0.9;
}
.formInput {
    width: 80px;
}
.iconBtnNext {
    position: absolute;
    inset-inline-start: 20px;
}
.iconBtnPrev {
    position: absolute;
    inset-inline-end: 20px;
}
.next-btn {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s;
    @apply gap-24 text-xl font-semibold
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
    @apply gap-24 text-xl font-semibold
         rounded-xl;
    width: 250px;
    height: 55px;
    color: white;
    background-color: var(--secondary);
}
</style>
