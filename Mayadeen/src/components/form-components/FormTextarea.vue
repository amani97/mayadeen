<script setup lang="ts">
import { toRef, useAttrs } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
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
    <div
        class="text-input textarea-input"
        :class="{ 'has-error': !!errorMessage }"
    >
        <label v-if="label" :for="name">{{ label }}</label>
        <textarea
            :name="name"
            :id="name"
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
.textarea {
    width: 100%;
    height: 200px;
    border: 1px solid #70707088;
    border-radius: 6px;
    overflow: auto;
    resize: none;
    padding: 10px;
    outline: none;
}
.help-message {
    position: absolute;
    bottom: calc(0 * 1em);
    left: 0;
    margin: 0;
    font-size: 14px;
}

.textarea-input.has-error {
    background-color: rgb(255, 233, 233);
    color: var(--error);
}
.textarea:focus {
    border: 1px solid var(--primary);
}
.textarea-input.has-error:focus {
    border-color: var(--error);
}

.textarea-input .help-message {
    color: var(--error);
}
</style>
