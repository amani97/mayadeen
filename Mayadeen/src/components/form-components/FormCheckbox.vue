<script setup>
import { computed } from "vue";

const props = defineProps({
    inputClasses: String,
    labelClasses: String,
    label: String,
    isSpan: { type: Boolean, default: false },
    span: { type: String, default: "" },
    spanUrl: { type: String, default: "" },
    completeLabel: { type: String, default: "" },
    modelValue: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const model = computed({
    set(val) {
        emit("update:modelValue", val);
    },
    get() {
        return this.modelValue;
    },
});
</script>

<template>
    <div class="flex gap-4 items-center mb-4">
        <label class="checkbox-container">
            <input v-model="model" type="checkbox" />
            <span class="checkmark"></span>
        </label>

        <label :class="labelClasses" for="default-checkbox" class="font-medium"
            >{{ label }}
            <span v-if="isSpan" class="spanClass"
                ><a :href="spanUrl">{{ span }}</a></span
            >
            {{ completeLabel }}
            <slot />
        </label>
    </div>
</template>

<style scoped>
.spanClass {
    color: blue;
    text-decoration: underline;
}
/* Customize the label (the container) */
.checkbox-container {
    display: block;
    position: relative;
    padding-left: 25px;
    cursor: pointer;
    font-size: 22px;
    height: 25px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

/* Hide the browser's default checkbox */
.checkbox-container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
}

/* Create a custom checkbox */
.checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border: 1px solid gray;
}

/* On mouse-over, add a grey background color */
.checkbox-container:hover input ~ .checkmark {
    background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.checkbox-container input:checked ~ .checkmark {
    background-color: #fff;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
    content: "";
    position: absolute;
    display: none;
}

/* Show the checkmark when checked */
.checkbox-container input:checked ~ .checkmark:after {
    display: block;
}

/* Style the checkmark/indicator */
.checkbox-container .checkmark:after {
    left: 7px;
    top: 0px;
    width: 10px;
    height: 17px;
    border: solid var(--primary);
    border-width: 0 2px 2px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
}
</style>
