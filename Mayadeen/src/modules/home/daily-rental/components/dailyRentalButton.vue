<script setup>
import Button from "@/components/general-components/Button.vue";
import { useI18n } from "vue-i18n";
import { Icon } from "@iconify/vue";
import { useRouter, useRoute } from "vue-router";
import { useDailyRentalStore } from "../daily-rental-store";
import { ref } from "vue";
defineExpose({ goNext });
const dailyRentalStore = useDailyRentalStore();
const router = useRouter(),
    route = useRoute();

const props = defineProps({
    isValid: { type: [Boolean, false] },
    pathName: String,
    next: String,
    disabled: Boolean,
});

function addAD() {
    dailyRentalStore
        .addRentalEstate()
        .then(() => {
            router.push("/daily-rental");
        })
        .catch(() => {
            router.push("/daily-rental");
        });
}
const { t } = useI18n();
const emit = defineEmits(["nextClicked"]);
const onNextClick = () => {
    emit("nextClicked");
    props.isValid
        ? route.path.split("/")[3] == "step7"
            ? addAD()
            : router.push({ name: props.pathName })
        : "";
};

function goNext() {
    if (nextBtn.value) nextBtn.value.click();
}

const nextBtn = ref(null);
</script>
<template>
    <div
        class="buttons flex mt-20 justify-center xs:gap-8 sm:gap-14 md:gap-24 lg:gap-56 xl:gap-96"
    >
        <button
            ref="nextBtn"
            type="submit"
            :class="
                disabled ? 'bg-secondary opacity-75 cursor-not-allowed ' : ''
            "
            :disabled="disabled"
            @click="onNextClick"
            class="next-btn"
        >
            <Icon
                class="iconBtnNext"
                icon="mdi:arrow-right"
                color="white"
                width="25"
            />
            {{ t(props.next) }}
        </button>
        <button @click="router.go(-1)" class="previous-btn">
            {{ t("previous") }}
            <Icon
                class="iconBtnPrev"
                icon="mdi:arrow-left"
                color="white"
                width="25"
            />
        </button>
    </div>
</template>
<style scoped>
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
    padding-left: 100px;
    padding-right: 100px;
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
    padding-left: 100px;
    padding-right: 100px;
}

[dir="ltr"] .buttons {
    @apply flex flex-row-reverse;
}

[dir="ltr"] .buttons .iconBtnNext {
    @apply left-52;
}
[dir="ltr"] .buttons .iconBtnPrev {
    @apply right-52;
}

@media (max-width: 480px) {
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
        @apply gap-4 text-base font-semibold
         rounded-xl;
        color: white;
        background-color: var(--primary);
        width: 140px;
        height: 39px;
        padding-left: 30px;
        padding-right: 50px;
    }
    .previous-btn {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.5s;
        @apply gap-4 text-base font-semibold
         rounded-xl;
        color: white;
        background-color: var(--secondary);
        width: 140px;
        height: 39px;
        padding-left: 50px;
        padding-right: 30px;
    }
}

@media (max-width: 768px) and (min-width: 480px) {
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
        @apply gap-4 text-base font-semibold
         rounded-xl;
        color: white;
        background-color: var(--primary);
        width: 170px;
        height: 49px;
        padding-left: 30px;
        padding-right: 50px;
    }
    .previous-btn {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: all 0.5s;
        @apply gap-4 text-base font-semibold
         rounded-xl;
        color: white;
        background-color: var(--secondary);
        width: 170px;
        height: 49px;
        padding-left: 50px;
        padding-right: 30px;
    }
}
</style>
