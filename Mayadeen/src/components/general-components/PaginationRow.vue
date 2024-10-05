<script setup>
import { computed, ref, watch } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps(["from", "to", "total", "per_page", "last_page"]);
const emit = defineEmits(["paginate"]);
const { t } = useI18n();
const page = ref(1);

const isPrevDisabled = computed(() => {
    return page.value === 1;
});
const isNextDisabled = computed(() => {
    return page.value === props.last_page;
});

watch(page, (val) => {
    emit("paginate", val);
});
</script>

<template>
    <div class="flex justify-between items-center">
        <nav aria-label="Page navigation example">
            <ul class="inline-flex -space-x-px text-sm">
                <li>
                    <a
                        :class="{
                            'pointer-events-none bg-secondary opacity-60':
                                isPrevDisabled,
                        }"
                        @click="page--"
                        class="flex cursor-pointer items-center justify-center px-4 h-10 ms-1 text-white bg-primary font-bold border rounded-s-lg hover:opacity-80"
                        >{{ t("previous") }}</a
                    >
                </li>
                <li>
                    <span
                        class="flex items-center justify-center px-4 text-lg h-10 text-white bg-primary font-bold border"
                        >{{ page }}</span
                    >
                </li>

                <li>
                    <a
                        :class="{
                            'pointer-events-none bg-secondary opacity-60':
                                isNextDisabled,
                        }"
                        @click="page++"
                        class="flex cursor-pointer items-center justify-center px-4 h-10 text-white bg-primary font-bold border rounded-e-lg hover:opacity-80"
                        >{{ t("next") }}</a
                    >
                </li>
            </ul>
        </nav>
        <div class="text-secondary opacity-90">
            {{ t("showing") }} {{ t("from") }} {{ from }} {{ t("to") }}
            {{ to }} {{ t("outOf") }} {{ total }} {{ t("records") }}.
        </div>
    </div>
</template>
