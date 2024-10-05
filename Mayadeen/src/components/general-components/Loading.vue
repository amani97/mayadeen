<script setup>
import { Icon } from "@iconify/vue";
</script>
<template>
    <div class="loading">
        <Icon
            icon="line-md:loading-twotone-loop"
            class="text-primary"
            width="80"
        ></Icon>
    </div>
</template>
<style>
.loading {
    position: fixed;
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(2px) opacity(20%);
    width: 100%;
    height: 100%;
}
</style>
