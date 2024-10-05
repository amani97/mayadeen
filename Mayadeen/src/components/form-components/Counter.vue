<script setup>
import { ref } from "vue";
import { Icon } from "@iconify/vue";

const number = ref(0);

const emit = defineEmits(["updateNumber"]);

const increment = () => {
    number.value++;
    emit("updateNumber", number.value);
};

const decrement = () => {
    if (number.value > 0) {
        number.value--;
        emit("updateNumber", number.value);
    }
};
</script>
<template>
    <div class="flex gap-5 items-center">
        <button @click="increment">
            <Icon icon="ic:baseline-plus" width="20" />
        </button>
        <!-- @change="emit('counterValue', number)" -->
        <p class="number-box">
            {{ number == 0 ? "" : number }}
        </p>

        <button @click="decrement">
            <Icon icon="ic:baseline-minus" width="20" />
        </button>
    </div>
</template>
<style>
.number-box {
    width: 100px;
    height: 50px;
    background-color: white;
    border: 1px solid #707070;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20px;
    font-weight: 600;
}
@media (max-width: 640px) {
    .number-box {
        width: 60px;
        height: 40px;
    }
}
@media (min-width: 641px) and (max-width: 1024px) {
    .number-box {
        width: 80px;
        height: 50px;
    }
}
</style>
