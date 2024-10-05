<script setup>

const props = defineProps({
    header: String,
    text: String,
    image: String
})
</script>
<template>
    <div class="card shadow-md">
        <img :src="image" alt="">
        <div class="flex flex-col gap-4">
            <h1>{{ header }}</h1>
            <p>{{ text }}</p>
        </div>
    </div>
</template>
<style scoped>
.card {
    width: 100%;
    display: flex;
    border: 1px solid #44444462;
    gap: 16px;
    border-radius: 3px;
    height: 150px;
    padding: 2px;
}

.card img {
    width: 30%;
    height: 100%;
    border-radius: 3px;
}

.card div {
    width: 70%;
    height: 100%;
}
</style>