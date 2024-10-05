<script setup>
import { Icon } from "@iconify/vue";
import { defineProps } from "vue";
const props = defineProps({
    real_estate_section : String,
    real_estate_kind : String ,
    price : Float32Array,
    city : String,
    date : Date
})
</script>



<template>
    <div class="rounded grid grid-cols-1 bg-white shadow-md p-7">
        <div class="grid grid-flow-row lg:gap-8 lg:text-xl md:text-lg md:gap-5 sm:text-base sm:gap-3  text-sm gap-1">
            <h1>{{ real_estate_section }}</h1>
            <h1>{{ real_estate_kind }}</h1>
            <h1>{{ city }}</h1>
            <div class="flex justify-between">
                <h1 class="text-primary"> {{ price }} ريال</h1>
                <div class="flex justify-start lg:gap-3 md:gap-2 gap:1">
                    <Icon class="text-primary lg:h-10 sm:h-8 h-6 "  icon="ant-design:reload-time-outline">
                    </Icon>
                    <h1>{{ date }}</h1>
                </div>
            </div>
        </div>
    </div>
</template>
