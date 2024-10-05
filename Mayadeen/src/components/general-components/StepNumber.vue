<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const props = defineProps({
    numberOfStep: { type: Number, default: 4 },
});
</script>
<template>
    <div class="relative flex items-center justify-center">
        <div class="absolute px-10 bottom-5 z-0 w-full flex justify-center">
            <hr class="hrStyle" />
        </div>
        <div class="flex z-10 relative justify-between xs:pb-2 sm:pb-1 md:pb-1 lg:pb-0 xl:pb-0 w-3/4">
            <div
                v-for="(i, index) in numberOfStep"
                :key="index"
                :class="
                    route.path[route.path.length - 1] == index + 1
                        ? 'changeColor'
                        : 'bg-accent'
                "
                class="xs:px-3 xs:p-1 xs:text-sm     sm:px-4 sm:p-2 sm:text-base  md:px-5 md:p-2 md:text-lg lg:px-6 lg:p-4 lg:text-lg    xl:px-7 xl:p-4 xl:text-xl                               rounded-full font-semibold italic"
            >
                {{ index + 1 }}
            </div>
        </div>
    </div>
</template>
<style scoped>
.changeColor {
    color: white;
    background-color: var(--primary);
}
.hrStyle {
    @apply text-secondary text-2xl mt-24 w-3/4;
    border-width: 2px;
}
</style>
