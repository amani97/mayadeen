<script setup>
import FormSelect from "@/components/form-components/FormSelect.vue";
import { ref, reactive } from "vue";
import { useI18n } from "vue-i18n";
import { toHijri } from "hijri-to-gregorian";
const emit = defineEmits(["getDate"]);
const { t } = useI18n();
const props = defineProps({
    label: String,
    selectClass: String,
    hijriDateClass: String,
});
const day = ref(null);
const month = ref(null);
const year = ref(null);
const dayOptions = function () {
    const temp = [];
    for (let i = 1; i < 32; i++) {
        temp.push(i);
    }
    return temp;
};
const monthOptions = function () {
    const temp = [];
    for (let i = 1; i < 13; i++) {
        temp.push(i);
    }
    return temp;
};
const yearOptions = function () {
    const temp = [];
    const date = new Date();
    const now = Number(String(date).split(" ")[3]);
    for (let i = now - 45; i < now; i++) {
        temp.push(toHijri(i).split(" ")[0]);
    }
    return temp;
};
</script>
<template>
    <div class="flex items-center" :class="hijriDateClass">
        <label class="whitespace-nowrap" v-if="label" for=""
            >{{ label }} :</label
        >
        <div
            class="grid col-span-3 grid-cols-3 gap-3 text-sm"
            :class="selectClass"
        >
            <FormSelect
                class="form-select"
                name="day"
                v-model="day"
                :placeholder="t('day')"
                :options="dayOptions()"
                @option:selected="
                    emit('getDate', day + '-' + month + '-' + year)
                "
            />
            <FormSelect
                class="form-select"
                v-model="month"
                name="month"
                :placeholder="t('month')"
                :options="monthOptions()"
                @option:selected="
                    emit('getDate', day + '-' + month + '-' + year)
                "
            />
            <FormSelect
                class="form-select"
                v-model="year"
                name="year"
                :placeholder="t('year')"
                :options="yearOptions()"
                @option:selected="
                    emit('getDate', day + '-' + month + '-' + year)
                "
            />
        </div>
    </div>
</template>
<style>
.form-select {
    min-width: 140px;
}
.v-select ul {
    max-height: 30vh;
}
.select-input[data-v-0c751e7b] {
    margin: 0px !important;
}
.input[data-v-0a3f9933] {
    margin: 0px !important;
}
</style>
