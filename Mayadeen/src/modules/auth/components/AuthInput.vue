<script setup>
import { Icon } from "@iconify/vue";
import { ref, useAttrs, toRef } from "vue";
import { useField } from "vee-validate";

const isFocused = ref(false);
const props = defineProps({
    label: String,
    icon: String,
    isPassword: Boolean,
    modelValue: String,
    name: String,
    ltr: Boolean,
});
const emit = defineEmits(["update:modelValue"]);
const attrs = useAttrs();
const localType = ref(attrs.type);
const switchType = () => {
    if (localType.value === "text") localType.value = "password";
    else localType.value = "text";
};
const innerInput = ref(null);
const focusRef = () => {
    if (innerInput.value !== document.activeElement) innerInput.value.focus();
};
const name = toRef(props, "name");
const {
    value: inputValue,
    errorMessage,
    handleBlur,
    handleChange,
    meta,
} = useField(name, undefined, {
    initialValue: props.value,
});
</script>

<template>
    <div>
        <div
            @click="focusRef"
            :class="{
                'focused-auth-input': isFocused,
                'has-error': !!errorMessage && !isFocused,
            }"
            class="auth-input transition-colors duration-200 ease-linear pb-2 border-b-2"
        >
            <label class="lg:text-lg"> {{ label }} </label>
            <div class="flex mt-3 gap-2 align-top">
                <Icon height="25" :icon="icon" />
                <input
                    dir="ltr"
                    ref="innerInput"
                    @focusout="isFocused = false"
                    @focusin="isFocused = true"
                    @blur="handleBlur"
                    class="outline-none w-full lg:text-md text-right"
                    v-bind="attrs"
                    :type="localType"
                    :value="inputValue"
                    @input="
                        emit('update:modelValue', $event.target.value);
                        handleChange($event.target.value);
                    "
                />
                <Icon
                    class="cursor-pointer hover:opacity-80"
                    v-if="attrs.type === 'password'"
                    height="25"
                    :icon="localType === 'password' ? 'mdi:eye' : 'mdi:eye-off'"
                    @click="switchType"
                />
            </div>
        </div>
        <small class="error-message" v-show="!meta.valid">
            {{ errorMessage }}
        </small>
    </div>
</template>

<style scoped>
.focused-auth-input {
    @apply text-primary;
}
.has-error {
    @apply text-error;
}
.error-message {
    font-size: 14px;
    color: var(--error);
}
</style>
