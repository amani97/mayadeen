<script setup>
import { useI18n } from "vue-i18n";
import { computed } from "vue";

const { t } = useI18n();

const props = defineProps({
    text: String,
    idForLabel: Number,
    modelValue: String,
});
const emit = defineEmits(["update:modelValue"]);
</script>

<template>
    <div class="">
        <label class="text-xl" :for="idForLabel">{{ t(text) }} &nbsp :</label>
        <br />
        <div class="flex justify-center">
            <input
                class="rounded-md"
                :id="idForLabel"
                type="text"
                @input="emit('update:modelValue', $event.target.value)"
            />
        </div>
    </div>
</template>
<style scoped>
input {
    width: 43%;
    height: 3.4rem;
    background-color: #eeeff4;
    border-radius: 5px;
    border: 1px solid lightgray;
    padding: 0px 10px;
    outline: none;
    transition: border-color 0.3s ease-in-out, color 0.3s ease-in-out,
        background-color 0.3s ease-in-out;
}
.text-input {
    position: relative;
    width: 100%;
}

label {
    display: block;
    width: 100%;
}

input:focus {
    border-color: var(--primary);
}

.help-message {
    position: absolute;
    bottom: calc(-1.5 * 1em);
    left: 0;
    margin: 0;
    font-size: 14px;
}

.text-input.has-error input {
    background-color: var(--error-bg-color);
    color: var(--error-color);
}

.text-input.has-error input:focus {
    border-color: var(--error-color);
}

.text-input.has-error .help-message {
    color: var(--error-color);
}
</style>
