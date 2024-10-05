<script setup>
import { Icon } from "@iconify/vue";
import { useI18n } from "vue-i18n";

const props = defineProps(["items"]);
const { locale } = useI18n();
</script>

<template>
    <nav
        class="flex px-5 bg-white py-3 rounded shadow-md"
        aria-label="Breadcrumb"
    >
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
            <li
                v-for="(link, i) in items"
                :key="link.text"
                class="inline-flex items-center"
            >
                <Icon
                    v-if="i !== 0"
                    :icon="
                        locale === 'ar'
                            ? 'material-symbols:chevron-left'
                            : 'material-symbols:chevron-right'
                    "
                    class="mx-6 w-6 h-6"
                />
                <RouterLink
                    v-if="link.path"
                    to="/"
                    href="#"
                    class="inline-flex items-center font-semibold text-secondary hover:text-primary hover:underline"
                >
                    {{ link.text }}
                </RouterLink>
                <span
                    class="inline-flex items-center font-semibold text-secondary"
                    v-else
                >
                    {{ link.text }}
                </span>
            </li>
        </ol>
    </nav>
</template>
