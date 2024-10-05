<script setup>
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const props = defineProps({
    options: Array,
    labelForSelectBox: String,
    idForLabel: String,
});
</script>

<template>
    <div>
        <div
            class="m-5 select-box-container flex items-center justify-between mb-14"
        >
            <label class="text-2xl" :for="props.idForLabel"
                >{{ t(props.labelForSelectBox) }} &nbsp: &nbsp</label
            >
            <select class="select-box" name="" :id="props.idForLabel">
                <option v-for="option in props.options" :value="option.value">
                    {{ t(option.label) }}
                </option>
            </select>
        </div>
    </div>
</template>
<style scoped>
.select-box-container {
    width: 400px;
}
.select-box {
    padding-inline-start: 10px;
    width: 15rem;
    height: 3rem;
    border-radius: 5px;
}
select {
    background: white;
    background-image: url('data:image/svg+xml,%3Csvg xmlns="http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg" width="16" height="7" viewBox="0 0 16 7"%3E%3Cpath fill="rgba(0%2C 0%2C 0%2C 0.80)" d="M8 6.5a.47.47 0 0 1-.35-.15l-4.5-4.5c-.2-.2-.2-.51 0-.71c.2-.2.51-.2.71 0l4.15 4.15l4.14-4.14c.2-.2.51-.2.71 0c.2.2.2.51 0 .71l-4.5 4.5c-.1.1-.23.15-.35.15Z"%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    background-size: 15%;
    font-size: larger;

    background-position-x: 5%;
    background-position-y: 50%;
    border: 3px solid rgba(156, 156, 156, 0.329);
    border-radius: 2px;
    padding-right: 2rem;
    color: rgb(0, 0, 0);
}
select:lang(ar) {
    background-position-x: left 5%;
}
select:lang(en) {
    background-position-x: right 5%;
}
select:hover {
    cursor: pointer;
}
</style>
