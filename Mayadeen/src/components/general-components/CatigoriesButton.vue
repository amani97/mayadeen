<script setup>
const props = defineProps({
    isClicked: Boolean,
});
</script>
<template>
    <div
        :class="isClicked ? ' bg-primary text-accent' : 'bg-accent'"
        class="catigoriesButton"
    >
        <p class="">
            <slot />
        </p>
    </div>
</template>
<style>
.catigoriesButton {
    @apply rounded-xl flex justify-center items-center text-center cursor-pointer;
    transition: all 0.3s;
    font-size: 20px;
    width: 200px;
    height: 100px;
    padding: 10px;
}



@media(max-width:480px){
    .catigoriesButton {
    @apply rounded-xl flex justify-center items-center text-center cursor-pointer;
    transition: all 0.3s;
    font-size: 14px;
    width: 170px;
    height: 80px;
    padding: 10px;
}
}
@media(max-width:768px) and (min-width:480px){
    .catigoriesButton {
    @apply rounded-xl flex justify-center items-center text-center cursor-pointer;
    transition: all 0.3s;
    font-size: 16px;
    width: 180px;
    height: 80px;
    padding: 10px;
}
}
</style>
