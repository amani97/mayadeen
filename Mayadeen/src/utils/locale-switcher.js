import { i18n } from "../i18n";
export function useLocaleSwitcher() {
    const changeLocale = (newLocale) => {
        if (newLocale) {
            localStorage.setItem("locale", newLocale);
        } else {
            if (i18n.global.locale.value === "ar")
                localStorage.setItem("locale", "en");
            else localStorage.setItem("locale", "ar");
        }
        window.location.reload();
    };

    const initLocale = () => {
        i18n.global.locale.value = localStorage.getItem("locale") || "ar";
        if (i18n.global.locale.value === "ar") {
            document.documentElement.setAttribute("dir", "rtl");
            document.documentElement.setAttribute("lang", "ar");
        } else {
            document.documentElement.setAttribute("dir", "ltr");
            document.documentElement.setAttribute("lang", "en");
        }
    };
    return { changeLocale, initLocale };
}
