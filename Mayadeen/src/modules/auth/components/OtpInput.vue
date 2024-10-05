<script setup>
import { ref, useAttrs } from "vue";
import VOtpInput from "vue3-otp-input";
const otpInput = ref(null);

const props = defineProps(["value"]);
const emit = defineEmits(["update:modelValue"]);
const attrs = useAttrs();
</script>

<template>
    <div class="flex w-fit">
        <v-otp-input
            ref="otpInput"
            :value="value"
            @on-change="emit('update:modelValue', $event)"
            v-bind="attrs"
            separator=" "
            input-classes="otp-input"
            :should-auto-focus="true"
            input-type="letter-numeric"
            :placeholder="['___', '___', '___', '___', '___', '___']"
        />
    </div>
</template>

<style>
.otp-input {
    @apply shadow-md;
    width: 60px;
    height: 60px;
    padding: 5px;
    margin-inline-end: 10px;
    font-size: 20px;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.3);
    text-align: center;
}
/* Background colour of an input field with value */
.otp-input.is-complete {
    background-color: #e4e4e4;
}
.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>
