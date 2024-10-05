<script setup lang="ts">
import { ref, computed } from "vue";
const s = ref("");
function k() {}
const props = defineProps({
    value: String,
    modelValue: String,
    name: String,
    label: String,
    checked: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
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
    <div class="control-group">
        <label class="control control-radio">
            <input
                v-model="model"
                type="radio"
                :name="name"
                :value="value"
                :checked="checked"
                :disabled="disabled"
            />
            <div class="control_indicator"></div>
            {{ label }}
        </label>
    </div>
</template>

<style>
.control {
    font-family: arial;
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
    padding-left: 28px;
    margin-bottom: 5px;
    padding-top: 3px;
    cursor: pointer;
}
.control input {
    width: 20px;
    height: 20px;
    position: absolute;
    z-index: -1;
    opacity: 0;
}
.control_indicator {
    height: 20px;
    width: 20px;
    background: #ffffff;
    border: 1px solid #cecccc;
    border-radius: undefinedpx;
}
.control:hover input ~ .control_indicator,
.control input:focus ~ .control_indicator {
    background: #cccccc;
}

.control input:checked ~ .control_indicator {
    background: #fab32b;
}
.control:hover input:not([disabled]):checked ~ .control_indicator,
.control input:checked:focus ~ .control_indicator {
    background: #f8b22c;
}
.control input:disabled ~ .control_indicator {
    background: #e6e6e6;
    opacity: 0.6;
    pointer-events: none;
}
.control_indicator:after {
    box-sizing: unset;
    content: "";
    position: absolute;
    display: none;
}
.control input:checked ~ .control_indicator:after {
    display: block;
}
.control-radio .control_indicator {
    border-radius: 50%;
}

.control-radio .control_indicator:after {
    left: 0px;
    top: 0px;
    height: 0px;
    width: 0px;
    border-radius: 50%;
    background: #d69312;
    transition: background 250ms;
}
.control-radio input:disabled ~ .control_indicator:after {
    background: #7b7b7b;
}
</style>
