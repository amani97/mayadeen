<script setup>
import { ref } from "vue";
import { useI18n } from "vue-i18n";
const { t } = useI18n();
const active = ref(0);
const props = defineProps({
    route: Array,
});
const emit = defineEmits(["routeSelect"]);
</script>
<template>
    <div
        class="grid grid-cols-2 gap-2 justify-items-center background-color notActiveRoute text-2xl p-6"
    >
        <p
            v-for="(i, index) in route"
            @click="
                active = index;
                emit('routeSelect', index);
            "
            :class="active == index ? 'activeRoute' : ''"
        >
            {{ t(i) }}
        </p>
    </div>
</template>
<style scoped>
.background-color {
    background: rgb(217, 222, 246);
    background: linear-gradient(
        180deg,
        rgba(217, 222, 246, 1) 0%,
        rgba(84, 89, 99, 1) 85%
    );
}
.notActiveRoute {
    color: white;
}
.notActiveRoute p {
    transition: all 0.3s;
    cursor: pointer;
}
.activeRoute {
    color: #1229bc;
}
</style>
