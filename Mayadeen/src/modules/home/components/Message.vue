<script setup>
import { onMounted } from "vue";
const props = defineProps({
    message: String,
    sender: Boolean,
    time: String,
});
</script>
<template>
    <div
        class="message-shape-container flex justify-end"
        :class="props.sender ? 'start' : 'end'"
    >
        <div
            class="p-1 px-3 m-2 bg-accent message-shape"
            :class="props.sender ? 'start text-start' : 'end text-end'"
        >
            {{ props.message }}
            <p class="flex justify-end text-sm">{{ time }}</p>
        </div>
    </div>
</template>
<style scoped>
.message-shape-container {
    width: 100%;
}
.message-shape {
    width: auto;
    font-size: 16px;
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    min-width: 140px;
}
.start {
    justify-content: start;
    border-start-start-radius: 0px;
}
.end {
    justify-content: end;
    border-start-end-radius: 0px;
}
</style>
