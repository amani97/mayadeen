<script setup>
const props = defineProps(["label", "value"]);
</script>

<template>
    <div>
        <span class="font-semibold text-lg"> {{ label }} : </span>
        <span class="px-6 rounded-lg text-lg py-4 mx-4 bg-white shadow">
            {{ value }}</span
        >
    </div>
</template>
