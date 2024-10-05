<script setup lang="ts">
import { toRef, useAttrs } from "vue";
import { useField } from "vee-validate";
import VSelect from "vue-select";
import "vue-select/dist/vue-select.css";
const props = defineProps({
    value: {
        type: String,
        default: "",
    },
    name: {
        type: String,
    },
    label: {
        type: String,
    },
    placeholder: {
        type: String,
        default: "",
    },
    modelValue: {},
});

const emit = defineEmits(["update:modelValue"]);

const name = toRef(props, "name");
const attrs = useAttrs();
const {
    value: inputValue,
    errorMessage,
    handleBlur,
    handleChange,
    meta,
} = useField(name, undefined, {
    initialValue: props.modelValue,
});

const getDir = () => {
    return document.documentElement.dir;
};
</script>

<template>
    <div
        class="select-input"
        :class="{ 'has-error': !!errorMessage, success: meta.valid }"
    >
        <label :for="name">{{ label }}</label>
        <VSelect
            :dir="getDir()"
            :name="name"
            :id="name"
            :value="inputValue"
            :placeholder="placeholder"
            :model-value="modelValue"
            @update:model-value="
                emit('update:modelValue', $event);
                handleChange($event);
            "
            @blur="handleBlur"
            v-bind="attrs"
        />
        <small class="help-message" v-show="errorMessage || meta.valid">
            {{ errorMessage }}
        </small>
    </div>
</template>

<style scoped>
[dir="rtl"] .select-input :deep(.vs__clear) {
    margin-left: 8px;
}
.select-input {
    position: relative;
    margin-bottom: calc(1em * 1.5);
    background-color: white;
    width: 100%;
}

label {
    display: block;
    margin-bottom: 4px;
    width: 100%;
}

.select-input :deep(.vs__selected-options) {
    font-size: 16px;
    border-radius: 5px;
    padding: 8px 10px;
    outline: none;
    background-color: #fff;
    width: 100%;
    transition: border-color 0.1s ease-in-out, color 0.1s ease-in-out,
        background-color 0.1s ease-in-out;
}

.select-input :deep(.vs__dropdown-toggle) {
    padding: 0px !important;
    cursor: pointer;
}

input:focus {
    border-color: var(--primary);
}

.help-message {
    position: absolute;
    bottom: calc(-1.8 * 1em);
    left: 0;
    margin: 0;
    font-size: 14px;
}

.select-input.has-error :deep(.vs__dropdown-toggle),
.select-input.has-error :deep(.vs__selected-options) {
    background-color: rgb(255, 233, 233);
    color: var(--error);
}

.select-input.has-error input:focus {
    border-color: var(--error);
}

.select-input.has-error .help-message {
    color: var(--error);
}
</style>
