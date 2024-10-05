<script setup>
import FormInput from "@/components/form-components/FormInput.vue";
import FormCheckbox from "@/components/form-components/FormCheckbox.vue";
import { useI18n } from "vue-i18n";
import { computed, ref } from "vue";
import { vMaska } from "maska";

const { t } = useI18n();

const props = defineProps({
    day: String,
    discount: Number,
    price: Number,
});
const checkbox = ref(false);
const priceModel = ref(props.price);
const discountModel = ref(props.discount);
const discount_value = ref(t("discount value"));
const emit = defineEmits(["changeValue"]);
</script>

<template>
    <div
        class="container flex justify-around items-center mx-auto grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 xs:gap-0 sm:gap-10 md:gap-20 xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
    >
        <div class="flex justify-between gap-2 items-center">
            <p class="whitespace-nowrap w-32">{{ t(day) }} :</p>
            <FormInput
                :name="day"
                @input="
                    emit('changeValue', { value: priceModel, key: 'price' })
                "
                v-maska
                data-maska="################"
                v-model.number="priceModel"
                :value="priceModel"
            ></FormInput>
        </div>
        <div class="flex justify-between gap-10">
            <form-checkbox
                class=""
                @click="
                    discountModel = '';
                    emit('changeValue', {
                        value: discountModel,
                        key: 'discount',
                    });
                "
                :name="day + '2'"
                v-model="checkbox"
            ></form-checkbox>
            <p class="whitespace-nowrap">{{ t("There are discounts") }}</p>
            <FormInput
                v-maska
                data-maska="################"
                v-model.number="discountModel"
                :value="discountModel"
                @input="
                    emit('changeValue', {
                        value: discountModel,
                        key: 'discount',
                    })
                "
                :name="day + '1'"
                :class="!checkbox ? 'disabled' : ''"
                :placeholder="discount_value"
                :disabled="!checkbox"
            ></FormInput>
        </div>
    </div>
</template>

<style>
.disabled {
    cursor: not-allowed !important;
}
.container {
}
.container input[data-v-0a3f9933] {
    margin-top: 0px;
}
.container .text-input[data-v-0a3f9933] {
    margin: 0px;
}
</style>
