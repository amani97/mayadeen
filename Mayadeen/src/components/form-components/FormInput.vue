<script setup lang="ts">
import { toRef, useAttrs } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
    type: {
        type: String,
        default: "text",
    },
    value: {
        type: String,
        default: "",
    },
    name: {
        type: String,
        required: true,
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
    initialValue: props.value,
});
</script>

<template>
    <div class="text-input" :class="{ 'has-error': !!errorMessage }">
        <label v-if="label" :for="name">{{ label }}</label>
        <input
            :name="name"
            :id="name"
            :type="type"
            :value="inputValue"
            :placeholder="placeholder"
            @input="
                emit('update:modelValue', $event.target.value);
                handleChange($event.target.value);
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
.text-input {
    position: relative;
    margin-bottom: calc(1em * 1.5);
    width: 100%;
}

label {
    display: block;
    margin-bottom: 4px;
    width: 100%;
}

input {
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid lightgray;
    padding: 8px 10px;
    outline: none;
    background-color: #fff;
    width: 100%;
    transition: border-color 0.3s ease-in-out, color 0.3s ease-in-out,
        background-color 0.3s ease-in-out;
    margin-top: 30px;
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

.text-input.has-error input {
    background-color: rgb(255, 233, 233);
    color: var(--error);
}

.text-input.has-error input:focus {
    border-color: var(--error);
}

.text-input.has-error .help-message {
    color: var(--error);
}
</style>
