<script setup>
import { computed } from "vue";

const props = defineProps({
    id: { type: Number, default: 0 },
    name: { type: String, default: "default" },
    min: { type: Number, default: 0 },
    max: { type: Number, default: 100 },
    maxValue: { type: String, default: "" },
    modelValue: { type: Number, default: 0 },
});

const emit = defineEmits(["update:modelValue"]);
const model = computed({
    set(val) {
        emit("update:modelValue", val);
    },
    get() {
        return props.modelValue;
    },
});
</script>
<template>
    <div class="col-span-1">
        <input
            class=""
            type="range"
            :id="id"
            :name="name"
            :min="min"
            :max="max"
            v-model="model"
        />
        <div class="flex justify-between">
            <p>{{ maxValue }}</p>
            <p>{{ model }}</p>
        </div>
    </div>
</template>
<style scoped>
input[type="range"] {
    direction: ltr;
    height: 28px;
    -webkit-appearance: none;
    margin: 10px 0;
    width: 100%;
}
input[type="range"]:focus {
    outline: none;
}
input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    animate: 0.2s;
    background: #444444;
    border-radius: 0px;
}
input[type="range"]::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #fbb52e;
    border: 1px solid #fbb52e;
    height: 20px;
    width: 20px;
    border-radius: 50px;
    background: #fbb52e;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -9px;
}
input[type="range"]:focus::-webkit-slider-runnable-track {
    background: #444444;
}
input[type="range"]::-moz-range-track {
    width: 100%;
    height: 2px;
    cursor: pointer;
    animate: 0.2s;
    background: #444444;
    border-radius: 0px;
}
input[type="range"]::-moz-range-thumb {
    box-shadow: 1px 1px 1px #fbb52e;
    border: 1px solid #fbb52e;
    height: 20px;
    width: 20px;
    border-radius: 50px;
    background: #fbb52e;
    cursor: pointer;
}
input[type="range"]::-ms-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    color: transparent;
}
input[type="range"]::-ms-fill-lower {
    background-color: var(--primary);
    border-radius: 0px;
}
input[type="range"]::-ms-fill-upper {
    background: #444444;
    border-radius: 0px;
}
input[type="range"]::-ms-thumb {
    margin-top: 1px;
    box-shadow: 1px 1px 1px #fbb52e;
    border: 1px solid #fbb52e;
    height: 20px;
    width: 20px;
    border-radius: 50px;
    background: #fbb52e;
    cursor: pointer;
}
input[type="range"]:focus::-ms-fill-lower {
    background-color: var(--primary);
}
input[type="range"]:focus::-ms-fill-upper {
    background: #444444;
}
</style>
