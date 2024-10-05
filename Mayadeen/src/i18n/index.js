import { createI18n } from "vue-i18n";

const messages = Object.fromEntries(
    Object.entries(import.meta.glob("./locales/*.json", { eager: true })).map(
        ([key, value]) => [key.slice(10, -5), value.default]
    )
);
export const i18n = createI18n({
    locale: "ar",
    fallbackLocale: "ar",
    messages,
    legacy: false,
});
export const i18nUtil = i18n.global;
